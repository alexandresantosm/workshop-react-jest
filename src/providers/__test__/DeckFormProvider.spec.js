import React, { useContext } from "react";
import { render, wait, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import DeckFormProvider, { DeckFormContext } from "../DeckFormProvider";
import { storeBuilder } from "../../__mocks__/StoreBuilder";
import { pikachuMock } from "../../__mocks__/CardBuilder";
import { deckBuilder } from "../../__mocks__/DeckBuilder";
import { arrayToObject, getArrayIds } from "../../__mocks__/utils";
import errorHandler from "../../utils/error-handler";

jest.mock("../../utils/error-handler");

const DeckFormTestComponent = ({ card }) => {
  const {
    deckName,
    deckCards,
    updateDeckName,
    addCard,
    removeCard,
    saveDeck,
    submitted,
  } = useContext(DeckFormContext);

  return (
    <>
      <div>{deckName}</div>
      <div>Was submitted: {submitted}</div>
      <input
        placeholder="Placeholder"
        onChange={(evt) => updateDeckName(evt.target.value)}
      />
      <button onClick={() => addCard(card)}>Add</button>
      <button onClick={() => removeCard(card)}>Remove</button>
      <button onClick={saveDeck}>Save</button>

      {deckCards.map((card) => (
        <div key={card.id}>
          {card.count} {card.name}
        </div>
      ))}
    </>
  );
};

const setup = (initialState, deckId) => {
  const store = storeBuilder(initialState);
  const card = pikachuMock;

  const renderResult = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/deck/${deckId}`]} initialIndex={0}>
        <Route
          path={"/deck/:id"}
          exact
          component={() => (
            <DeckFormProvider>
              <DeckFormTestComponent card={card} />
            </DeckFormProvider>
          )}
        />
      </MemoryRouter>
    </Provider>
  );

  return {
    ...renderResult,
    card,
    buttonAdd: renderResult.getByText("Add"),
    buttonRemove: renderResult.getByText("Remove"),
    buttonSave: renderResult.getByText("Save"),
    input: renderResult.getByPlaceholderText("Placeholder"),
  };
};

const clickTimes = (button, times) => {
  [...new Array(times)].forEach(() => {
    button.click();
  });
};

describe("DeckFormProvider", () => {
  it("should be render with default props", () => {
    const { container } = setup();

    expect(container).toBeInTheDocument();
  });

  it("should be add card correctly", () => {
    const { buttonAdd, getByText, card } = setup();
    const twoTimes = 2;

    clickTimes(buttonAdd, twoTimes);

    const firstElement = getByText(`${twoTimes} ${card.name}`);

    clickTimes(buttonAdd, 10);

    const secondElement = getByText(`4 ${card.name}`);

    expect(firstElement).toBeInTheDocument();
    expect(secondElement).toBeInTheDocument();
  });

  it("should be remove card correctly", async () => {
    const initialCount = 4;

    const deck = deckBuilder({
      cards: [{ ...pikachuMock, count: initialCount }],
    });

    const initialState = {
      deck: {
        decks: arrayToObject([deck]),
        ids: getArrayIds([deck]),
      },
    };

    const { buttonRemove, getByText, queryByText, card } = setup(
      initialState,
      deck.id
    );

    await wait(undefined, { timeout: 0 });

    const once = 1;

    clickTimes(buttonRemove, once);

    const firstElement = getByText(`${initialCount - once} ${card.name}`);

    expect(firstElement).toBeInTheDocument();

    clickTimes(buttonRemove, 10);

    const secondElement = queryByText(`${card.name}`);

    expect(secondElement).not.toBeInTheDocument();
  });

  it("should be set name deck", () => {
    const { input, getByText } = setup();
    const deckName = "Deck test";

    fireEvent.change(input, { target: { value: deckName } });

    const deck = getByText(deckName);

    expect(deck).toBeInTheDocument();
  });

  it("should be not save deck", () => {
    const { buttonSave, input } = setup();

    fireEvent.click(buttonSave);

    expect(errorHandler).toHaveBeenCalledWith(
      "Você precisa dar um nome ao baralho."
    );

    const deckName = "Deck test";

    fireEvent.change(input, { target: { value: deckName } });
    fireEvent.click(buttonSave);

    expect(errorHandler).toHaveBeenCalledWith(
      "Seu baralho precisa ter no mínimo 24 e no máximo 60 cartas."
    );
  });
});
