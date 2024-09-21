import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from "redux";

import { thunk } from "redux-thunk";

import { geofencesReducer } from "../reducers/geofencesReducer";
import { authReducer } from "../reducers/authReducer";
//import init from "../helpers/init";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

/* const preloadedState = {
  auth: {
    uid: "",
    displayName: ""
  },
  geofences: init()
} */

const reducers = combineReducers({
  auth: authReducer,
  geofences: geofencesReducer
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))

)