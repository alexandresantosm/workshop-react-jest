import React from "react";
import { render, fireEvent } from "@testing-library/react";

import {
  DeckFormProviderMock,
  mockedContext,
} from "../../../__mocks__/DeckFormProviderMock";
import CardGrid from "../CardGrid";
import { bulbasaurMock, pikachuMock } from "../../../__mocks__/CardBuilder";

const setup = ({ cards = [], loading = false }) => {
  const renderResult = render(
    <DeckFormProviderMock>
      <CardGrid cards={cards} loading={loading} />
    </DeckFormProviderMock>
  );

  return {
    ...renderResult,
    ...mockedContext,
  };
};

describe("CardGrid", () => {
  it("should be render with default props", () => {
    const { container, getByAltText, getByText } = setup({});

    const emptyImage = getByAltText("Empty Result");
    const message = getByText("Oops... Não encontramos nada.");

    expect(container).toBeInTheDocument();
    expect(emptyImage).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it("should be render cards", () => {
    const cards = [bulbasaurMock, pikachuMock];
    const { getByAltText } = setup({ cards });

    cards.forEach((card) => {
      const cardImage = getByAltText(`${card.id}-${card.name}`);

      expect(cardImage).toBeInTheDocument();
    });
  });

  it("should be add card", () => {
    const cards = [bulbasaurMock];
    const { getByAltText, addCard } = setup({ cards });
    const cardImage = getByAltText(`${bulbasaurMock.id}-${bulbasaurMock.name}`);

    fireEvent.click(cardImage);

    expect(addCard).toHaveBeenCalledWith(bulbasaurMock);
  });
});
