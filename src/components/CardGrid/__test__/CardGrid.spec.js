import React from "react";
import { render } from "@testing-library/react";

import {
  DeckFormProviderMock,
  mockedContext,
} from "../../../__mocks__/DeckFormProviderMock";
import CardGrid from "../CardGrid";

const setup = ({ cards = [], loading = false }) => {
  const renderResult = render(
    <DeckFormProviderMock>
      <CardGrid cards={cards} loading={loading} />
    </DeckFormProviderMock>
  );

  return {
    ...renderResult,
    ...mockedContext,
  };
};

describe("CardGrid", () => {
  it("should be render with default props", () => {
    const { container, getByAltText, getByText } = setup({});

    const emptyImage = getByAltText("Empty Result");
    const message = getByText("Oops... Não encontramos nada.");

    expect(container).toBeInTheDocument();
    expect(emptyImage).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
});
