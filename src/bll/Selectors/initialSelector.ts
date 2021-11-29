import { AppReducerType } from "../store";




export const bgAppSelector = (state: AppReducerType) =>{
    return state.initial.bgApp
}

export const platformSelector = (state: AppReducerType) =>{
    return state.initial.platform
}