import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Reducer } from "./Reducer";
import thunk from "redux-thunk";

export function rootReducer() {
  return combineReducers({
    mainStore: Reducer,
  });
}

export const store = createStore(
  rootReducer(),
  composeWithDevTools(applyMiddleware(thunk))
);
