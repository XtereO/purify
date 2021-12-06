import { AppReducerType } from "../store";




export const bgAppSelector = (state: AppReducerType) =>{
    return state.initial.bgApp
}

export const platformSelector = (state: AppReducerType) =>{
    return state.initial.platform
}

export const activePanelSelector = (state: AppReducerType) =>{
    return state.initial.activePanel
}

export const activeModalSelector = (state: AppReducerType) =>{
    return state.initial.activeModal
}