import { AppState } from "../store";




export const bgAppSelector = (state: AppState) =>{
    return state.initial.bgApp
}

export const platformSelector = (state: AppState) =>{
    return state.initial.platform
}

export const activePanelSelector = (state: AppState) =>{
    return state.initial.activePanel
}

export const activeModalSelector = (state: AppState) =>{
    return state.initial.activeModal
}