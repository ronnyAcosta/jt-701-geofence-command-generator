import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux";

import { geofencesReducer } from "../reducers/geofencesReducer";
import init from "../helpers/init";

import { thunk } from "redux-thunk";
import { authReducer } from "../reducers/authReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const preloadedState = {
  auth: {
    uid: "",
    displayName: ""
  },
  geofences: init()
}

const reducers = combineReducers({
  auth: authReducer,
  geofences: geofencesReducer
});

export const store = createStore(
  reducers,
  preloadedState,
  composeEnhancers(applyMiddleware(thunk))

)