import React from "react";
import { render } from "@testing-library/react";

import PokeballLoading from "../PokeballLoading";

const setup = (props = {}) => {
  const renderResult = render(<PokeballLoading {...props} />);

  return {
    image: renderResult.getByAltText(/Pokeball Loading/i),
    ...renderResult,
  };
};

describe("PokeballLoading", () => {
  it("should be render with default props", () => {
    const { container, image } = setup();

    expect(container).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
