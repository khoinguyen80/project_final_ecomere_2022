import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer,
} from "./container/reducers/productReducer";
import { userReducer } from "container/reducers/userReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
