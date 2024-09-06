import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux";

import { geofencesReducer } from "../reducers/geofencesReducer";
import init from "../helpers/init";

import { thunk } from "redux-thunk";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const preloadedState = {
  geofences: init()
}

const reducers = combineReducers({
  geofences: geofencesReducer
});

export const store = createStore(
  reducers,
  preloadedState,
  composeEnhancers(applyMiddleware(thunk))

)