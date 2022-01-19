import { combineReducers, createStore, applyMiddleware } from "redux";
import  ThunkMiddleware from "redux-thunk";
import { initialReducer } from "./Reducers/initialReducer";
import { homeReducer } from "./Reducers/homeReducer";
import { pollutionCitiesReducer } from "./Reducers/pollutionCitiesReducer";




const reducers = combineReducers({
    initial: initialReducer,
    home: homeReducer,
    pollutionCities: pollutionCitiesReducer
})

type Reducers = typeof reducers
export type AppState = ReturnType<Reducers>

export const store = createStore(reducers, applyMiddleware(ThunkMiddleware))
//@ts-ignore
window.store = store

