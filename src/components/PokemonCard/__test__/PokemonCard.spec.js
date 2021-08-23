import React from "react";
import { render } from "@testing-library/react";

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
    const onClick = jest.fn();
    const { image } = setup({ onClick });

    image.click();

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
