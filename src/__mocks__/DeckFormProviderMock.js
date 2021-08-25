import React from "react";
import { DeckFormContext } from "../providers/DeckFormProvider";

export const mockedContext = {
  deckName: "",
  deckCards: [],
  updateDeckName: jest.fn(),
  addCard: jest.fn(),
  removeCard: jest.fn(),
  saveCard: jest.fn(),
  submitted: false,
};

export const DeckFormProviderMock = ({ children, context = mockedContext }) => {
  return (
    <DeckFormContext.Provider value={context}>
      {children}
    </DeckFormContext.Provider>
  );
};
