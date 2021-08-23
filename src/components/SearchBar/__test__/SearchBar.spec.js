import React from "react";
import { render, fireEvent } from "@testing-library/react";

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

jest.useFakeTimers();

describe("SearchBar", () => {
  it("should be render with default props", () => {
    const { container, input, button } = setup();

    expect(container).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should be input emit onChange event", () => {
    const onChange = jest.fn();
    const { input, deafultInputDelay } = setup({ onChange });

    fireEvent.change(input, { target: { value: "Test" } });

    jest.runTimersToTime(deafultInputDelay);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith({ target: input });
  });
});
