import React from "react";
import { render } from "@testing-library/react";

import PokemonCard from "../PokemonCard";

const setup = (props = {}) => {
  const renderResult = render(<PokemonCard {...props} />);

  return {
    ...renderResult,
  };
};

describe("PokemonCard", () => {
  it("should be render with default props", () => {
    const { container } = setup();

    expect(container).toBeInTheDocument();
  });
});
