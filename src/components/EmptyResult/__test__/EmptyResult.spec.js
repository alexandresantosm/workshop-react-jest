import React from "react"; // Quando se usa componentes deve-se importar o react
import { render } from "@testing-library/react";

import EmptyResult from "../EmptyResult"; // Componente react

describe("EmptyResult", () => {
  // Faz um agrupamento de testes
  it("should be render with default props", () => {
    // Teste propriamente dito
    const { container, getByAltText, getByText } = render(<EmptyResult />);
    const defaultMessage = "Oops... Não encontramos nada.";
    const defaultWidth = 200;
    /*
      Captura de elementos
      image: atributo alt
      input: atributo placehold
      button: conteudo (texto) do botao
      alguns casos: atributo title
    */
    const image = getByAltText("Empty Result");
    const message = getByText(defaultMessage);

    expect(container).toBeInTheDocument(); // Valida se o componente foi renderizado na tela
    expect(message).toBeInTheDocument(); // Valida se a mensagem padrao foi renderizada
    expect(image).toBeInTheDocument(); // Valida se a imagem foi renderizada
    expect(image.width).toBe(defaultWidth); // Valida se a imagem foi renderizada com o tamanho padrao
  });

  it("should be image have correct width", () => {
    const width = 150;
    const { getByAltText } = render(<EmptyResult width={width} />);
    const image = getByAltText("Empty Result");

    expect(image.width).toBe(width); // Valida se a imagem foi renderizada com o tamanho passado propriedade width
  });

  it("should be render with message", () => {
    const message = "Test";
    const { getByText } = render(<EmptyResult message={message} />);
    const messageRendered = getByText(message);

    expect(messageRendered).toBeInTheDocument();
  });
});
