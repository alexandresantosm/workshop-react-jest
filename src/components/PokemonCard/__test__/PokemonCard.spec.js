import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { cardBuilder } from "../../../__mocks__/CardBuilder";
import PokemonCard from "../PokemonCard";

const setup = ({ card, onClick }) => {
  const defaultCard = card || cardBuilder();
  const renderResult = render(
    <PokemonCard {...defaultCard} onClick={onClick} />
  );

  return {
    ...renderResult,
    defaultCard,
    image: renderResult.getByAltText(`${defaultCard.id}-${defaultCard.name}`),
  };
};

describe("PokemonCard", () => {
  it("should be render with default props", () => {
    const { container, image } = setup({});

    expect(container).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it("should be emit onClick event", () => {
    const onClick = jest.fn(); // mocka uma funcao
    const { image } = setup({ onClick });

    // image.click(); // Para eventos simples
    fireEvent.click(image); // fireEvent: para cenarios complexos como por exemplo mudanca de valor de input

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
