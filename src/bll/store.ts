import { combineReducers, createStore } from "redux";
import { initialReducer } from "./Reducers/initialReducer";





const reducers = combineReducers({
    initial: initialReducer
})

type ReducersType = typeof reducers
export type AppReducerType = ReturnType<ReducersType>

export const store = createStore(reducers)


