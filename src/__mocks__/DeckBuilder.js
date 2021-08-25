import {
  bulbasaurMock,
  charmanderMock,
  pikachuMock,
  squirtleMock,
} from "./CardBuilder";

export const deckBuilder = (props = {}) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: "Test",
    cards: [bulbasaurMock, charmanderMock, pikachuMock, squirtleMock],
    ...props,
  };
};
