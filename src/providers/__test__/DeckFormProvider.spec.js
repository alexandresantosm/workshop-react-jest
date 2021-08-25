import React, { useContext } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import DeckFormProvider, { DeckFormContext } from "../DeckFormProvider";
import { storeBuilder } from "../../__mocks__/StoreBuilder";
import { pikachuMock } from "../../__mocks__/CardBuilder";

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
          {card.id} {card.name}
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

describe("DeckFormProvider", () => {
  it("should be render with default props", () => {
    const { container } = setup();

    expect(container).toBeInTheDocument();
  });
});
