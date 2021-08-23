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
    const defaultSize = 200;

    expect(container).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image.width).toBe(defaultSize);
    expect(image.height).toBe(defaultSize);
  });

  it("should be message change", () => {
    /*
      queryByText: usa para testar por exemplo quando um texto nao esta na tela e em outro momento o texto esta na tela
      rerender: rerenderiza um componente
    */
    const { queryByText, rerender } = setup();
    const message = "Test";

    expect(queryByText(message)).not.toBeInTheDocument();

    rerender(<PokeballLoading message={message} />);

    expect(queryByText(message)).toBeInTheDocument();
  });
});
