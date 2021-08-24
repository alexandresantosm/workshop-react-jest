import {
  bulbasaurMock,
  charmanderMock,
  pikachuMock,
  squirtleMock,
} from "./CardBuilder";
import { arrayToObject, getArrayIds } from "./utils";

export const cardStateBuilder = (props = {}) => {
  const defaultPokemons = [
    bulbasaurMock,
    charmanderMock,
    pikachuMock,
    squirtleMock,
  ];

  return {
    cards: arrayToObject(defaultPokemons),
    ids: getArrayIds(defaultPokemons),
    loading: false,
    page: 1,
    query: null,
    ...props,
  };
};
