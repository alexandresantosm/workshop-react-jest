import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { axiosMock } from "../../__mocks__/AxiosMock";
import cardStore from "../card.store";
import { cardStateBuilder } from "../../__mocks__/CardStateBuilder";
import { cardBuilder } from "../../__mocks__/CardBuilder";
import { arrayToObject, getArrayIds } from "../../__mocks__/utils";

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

  it("should be dispatch getCards", async () => {
    const card = cardBuilder();

    axiosMock.get.mockResolvedValue({
      data: {
        cards: [card],
      },
    });

    await store.dispatch(cardStore.actions.getCards({ query: "" }));

    const currentState = store.getState();

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(
      "/cards?page=1&name=&pageSize=27"
    );

    expect(currentState.card).toEqual({
      ...initialCardsState,
      cards: arrayToObject([card]),
      ids: getArrayIds([card]),
      query: "",
    });
  });

  it("should be dispatch nextCards", async () => {
    const card = cardBuilder({ name: "Test" });
    const query = "test";

    store.dispatch(cardStore.actions.setQuery({ query }));

    axiosMock.get.mockResolvedValue({
      data: {
        cards: [card],
      },
    });

    await store.dispatch(cardStore.actions.nextCards());

    const currentState = store.getState();

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(
      `/cards?page=2&name=${query}&pageSize=27`
    );

    expect(currentState.card).toEqual({
      ...initialCardsState,
      query,
      page: 2,
      cards: { ...initialCardsState.cards, [card.id]: card },
      ids: [...initialCardsState.ids, card.id],
    });
  });
});
