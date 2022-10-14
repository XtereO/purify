import { combineReducers, createStore, applyMiddleware } from "redux";
import ThunkMiddleware from "redux-thunk";
import { initialReducer } from "./Reducers/initialReducer";
import { homeReducer } from "./Reducers/homeReducer";
import { pollutionCitiesReducer } from "./Reducers/pollutionCitiesReducer";

const rootReducer = combineReducers({
  initial: initialReducer,
  home: homeReducer,
  pollutionCities: pollutionCitiesReducer,
});

type RootReducer = typeof rootReducer;
export type AppState = ReturnType<RootReducer>;

export const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));
//@ts-ignore
window.store = store;
