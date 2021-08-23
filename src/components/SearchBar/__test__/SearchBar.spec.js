import React from "react";
import { render } from "@testing-library/react";

import SearchBar from "../SearchBar";

const setup = (props = {}) => {
  const renderResult = render(<SearchBar {...props} />);

  return {
    input: renderResult.getByPlaceholderText("Pesquise..."),
    button: renderResult.getByText("Botão"),
    deafultInputDelay: 200,
    ...renderResult,
  };
};

describe("SearchBar", () => {
  it("should be render with default props", () => {
    const { container, input, button } = setup();

    expect(container).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
