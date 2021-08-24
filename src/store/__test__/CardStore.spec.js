import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { cardStateBuilder } from "../../__mocks__/CardStateBuilder";

import cardStore from "../card.store";

describe("CardStore", () => {
  let store;
  let initialCardsState;

  beforeEach(() => {
    jest.clearAllMocks();

    initialCardsState = cardStateBuilder();

    store = createStore(
      combineReducers({ card: cardStore.reducer }),
      { card: initialCardsState },
      applyMiddleware(thunk)
    );
  });

  it("should be have correct initial state", () => {
    expect(store.getState()).toEqual({ card: initialCardsState });
  });
});
