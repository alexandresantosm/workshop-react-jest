import React from "react";
import { MemoryRouter, Route } from "react-router-dom";
import { render, wait, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";

import { axiosMock } from "../../__mocks__/AxiosMock";
import DeckAddView from "../DeckAddView";
import { storeBuilder } from "../../__mocks__/StoreBuilder";
import { pikachuMock, squirtleMock } from "../../__mocks__/CardBuilder";

jest.useFakeTimers();

const setup = (props = {}) => {
  jest.clearAllMocks();

  const store = storeBuilder();

  const renderResult = render(
    <Provider store={store}>
      <MemoryRouter>
        <Route path={"/"} component={DeckAddView} />
      </MemoryRouter>
    </Provider>
  );

  return {
    ...renderResult,
    store,
    emptyMessage: "Oops... Não encontramos nada.",
    input: renderResult.getByPlaceholderText("Pesquise..."),
    buttonAdd: renderResult.getByText("Salvar Baralho"),
  };
};

const mockCardsResponse = (cards = []) => {
  axiosMock.get.mockResolvedValue({
    data: {
      cards,
    },
  });
};

describe("DeckAddView", () => {
  it("should be render with default props", async () => {
    mockCardsResponse();

    const { container, queryByText, emptyMessage, input, buttonAdd } = setup();

    await wait(undefined, { timeout: 0 });

    expect(container).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(buttonAdd).toBeInTheDocument();
    expect(queryByText(emptyMessage)).toBeInTheDocument();
  });

  it("should be render cards", async () => {
    const cards = [pikachuMock, squirtleMock];

    mockCardsResponse(cards);

    const { getByAltText } = setup();

    await wait(undefined, { timeout: 0 });

    cards.forEach((card) => {
      const cardImage = getByAltText(`${card.id}-${card.name}`);

      expect(cardImage).toBeInTheDocument();
    });
  });

  it("should be render loading", async () => {
    const { getByAltText } = setup();
    const loadingImage = getByAltText("Pokeball Loading");

    expect(loadingImage).toBeInTheDocument();
  });

  it("should be search card", () => {
    mockCardsResponse();
    const query = "test";
    const { input } = setup();

    fireEvent.change(input, { target: { value: query } });

    jest.runAllTimers();

    expect(axiosMock.get).toHaveBeenCalledTimes(2);
    expect(axiosMock.get).toHaveBeenCalledWith(
      `/cards?page=1&name=${query}&pageSize=27`
    );
  });
});
