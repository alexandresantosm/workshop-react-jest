import React from "react";
import { render } from "@testing-library/react";

import PokeballLoading from "../PokeballLoading";

const setup = (props = {}) => {
  const renderResult = render(<PokeballLoading {...props} />);

  return {
    ...renderResult,
  };
};

describe("PokeballLoading", () => {
  it("should be render with default props", () => {
    const { container } = setup();

    expect(container).toBeInTheDocument();
  });
});
