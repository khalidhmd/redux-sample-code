import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxLogger from "redux-logger";
import axios from "axios";
import ThunkMiddleware from "redux-thunk";

// const logger = reduxLogger.createLogger();

// //Initial state
// const initState = {
//   iceCream: 10,
//   cake: 20,
// };

// // Action types
// const BUY_CAKE = "BUY_CAKE";
// const BUY_ICECREAM = "BUY_ICECREAM";

// //Action creators
// const buyCake = () => {
//   return { type: BUY_CAKE };
// };
// const buyIcecream = () => {
//   return { type: BUY_ICECREAM };
// };

// // Reducers
// const cakeReducer = (state = 20, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return state - 1;

//     default:
//       return state;
//   }
// };

// const icecreamReducer = (state = 10, action) => {
//   switch (action.type) {
//     case BUY_ICECREAM:
//       return state - 1;

//     default:
//       return state;
//   }
// };

// // Root reducer
// const rootReducer = combineReducers({
//   cake: cakeReducer,
//   iceCream: icecreamReducer,
// });

// // Create store
// const store = createStore(rootReducer, applyMiddleware(logger));

// // Subscribe to changes
// store.subscribe(() => {});

// console.log(store.getState());

// // Dispatch actions
// store.dispatch(buyCake());
// store.dispatch(buyIcecream());

// initial state
const initState = {
  loading: false,
  users: [],
  error: "",
};

// action types
const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

// action creators
const fetchUsersRequest = () => {
  return { type: FETCH_USER_REQUEST };
};

const fetchUsersSuccess = (users) => {
  return { type: FETCH_USER_SUCCESS, payload: users };
};

const fetchUsersFailure = (error) => {
  return { type: FETCH_USER_FAILURE, payload: error };
};

// async action creator
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplceholder.typicode.com/users")
      .then((res) => {
        //res.data is the users list
        const users = res.data;
        dispatch(fetchUsersSuccess(users));
      })
      .catch((err) => {
        //err.message is the error description
        dispatch(fetchUsersFailure(err.message));
      });
  };
};

// reducer
const reducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };

    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(ThunkMiddleware.default));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());
