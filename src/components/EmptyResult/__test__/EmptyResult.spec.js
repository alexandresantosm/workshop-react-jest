import React from "react"; // Quando se usa componentes deve-se importar o react
import { render } from "@testing-library/react";

import EmptyResult from "../EmptyResult"; // Componente react

describe("EmptyResult", () => {
  // Faz um agrupamento de testes
  test("should be render with default props", () => {
    // Teste propriamente dito
    const { container, getByAltText } = render(<EmptyResult />);

    expect(getByAltText("Empty Result")).toBeInTheDocument(); // Valida se foi renderizado um elemento com o texto alternativo
    expect(container).toBeInTheDocument(); // Valida se o componente foi renderizado na tela
  });
});
