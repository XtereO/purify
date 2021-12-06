import { Appearance, platform } from "@vkontakte/vkui"


const SET_PLATFORM:'initialReducer/SET_PLATFORM'='initialReducer/SET_PLATFORM'
const SET_BG_APP:'initialReducer/SET_BG_APP'='initialReducer/SET_BG_APP'
const SET_ACTIVE_PANEL:'initialReducer/SET_ACTIVE_PANEL'='initialReducer/SET_ACTIVE_PANEL'
const SET_ACTIVE_MODAL:'initialReducer/SET_ACTIVE_MODAL'='initialReducer/SET_ACTIVE_MODAL'

type PlatformType = 'mobile' | 'pc' 
type BgAppType = 'bg__app__light' | 'bg__app__dark'

const initialState = {
    platform: 'mobile',
    bgApp: 'bg__app__light',
    activeModal: '',
    activePanel: 'HOME'
}
type InitialStateType = typeof initialState

type ActionType = (SetBgAppType | SetPlatformType | SetActiveModalType | SetActivePanelType)

export const initialReducer = (state=initialState,action:ActionType):InitialStateType=>{
    switch(action.type){
        case SET_PLATFORM:
            return{
                ...state,
                platform: action.platform
            }
        case SET_BG_APP:
            return{
                ...state,
                bgApp: action.bgApp
            }
        case SET_ACTIVE_MODAL:
            return{
                ...state,
                activeModal: action.activeModal
            }
        case SET_ACTIVE_PANEL:
            return{
                ...state,
                activePanel: action.activePanel
            }
        default:
            return state
    }
}

type SetActivePanelType = {
    type: typeof SET_ACTIVE_PANEL,
    activePanel: string
}
export const setActivePanelState = (activePanel:string):SetActivePanelType=>{
    return{
        type: SET_ACTIVE_PANEL,
        activePanel
    }
}

type SetActiveModalType = {
    type: typeof SET_ACTIVE_MODAL,
    activeModal: string
}
export const setActiveModalState = (activeModal:string):SetActiveModalType => {
    return{
        type: SET_ACTIVE_MODAL,
        activeModal
    }
}

type SetPlatformType = {
    type: typeof SET_PLATFORM,
    platform: PlatformType
}
export const  setPlatform = (platform:PlatformType):SetPlatformType =>{
    return{
        type: SET_PLATFORM,
        platform
    }
}

type SetBgAppType = {
    type: typeof SET_BG_APP,
    bgApp: BgAppType
}
export const setBgApp = (bgApp:BgAppType):SetBgAppType =>{
    return{
        type: SET_BG_APP,
        bgApp
    }
}
 