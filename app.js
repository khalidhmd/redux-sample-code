import { createStore, combineReducers } from "redux";

//Initial state
const initState = {
  iceCream: 10,
  cake: 20,
};

// Action types
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

//Action creators
const buyCake = () => {
  return { type: BUY_CAKE };
};
const buyIcecream = () => {
  return { type: BUY_ICECREAM };
};

// Reducers
const cakeReducer = (state = 20, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return state - 1;

    default:
      return state;
  }
};

const icecreamReducer = (state = 10, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return state - 1;

    default:
      return state;
  }
};

// Root reducer
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: icecreamReducer,
});

// Create store
const store = createStore(rootReducer);

// Subscribe to changes
store.subscribe(() => console.log(store.getState()));

console.log(store.getState());

// Dispatch actions
store.dispatch(buyCake());
store.dispatch(buyIcecream());
