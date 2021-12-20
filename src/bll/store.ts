import { combineReducers, createStore, applyMiddleware } from "redux";
import { initialReducer } from "./Reducers/initialReducer";
import { homeReducer } from "./Reducers/homeReducer";
import  ThunkMiddleware from "redux-thunk";




const reducers = combineReducers({
    initial: initialReducer,
    home: homeReducer
})

type Reducers = typeof reducers
export type AppState = ReturnType<Reducers>

export const store = createStore(reducers, applyMiddleware(ThunkMiddleware))


