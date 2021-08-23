import React from "react"; // Quando se usa componentes deve-se importar o react
import { render } from "@testing-library/react";

import EmptyResult from "../EmptyResult"; // Componente react

describe("EmptyResult", () => {
  // Faz um agrupamento de testes
  test("should be render with default props", () => {
    // Teste propriamente dito
    const { container, getByAltText } = render(<EmptyResult />);
    /*
      Captura de elementos
      image: atributo alt
      input: atributo placehold
      button: conteudo (texto) do botao
      alguns casos: atributo title
    */
    const image = getByAltText("Empty Result");

    expect(container).toBeInTheDocument(); // Valida se o componente foi renderizado na tela
    expect(image).toBeInTheDocument(); // Valida se a imagem foi renderizada
    expect(image.width).toBe(200); // Valida se a imagem foi renderizada com o tamanho padrao
  });
});
