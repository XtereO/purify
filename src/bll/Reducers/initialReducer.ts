

const SET_PLATFORM:'initialReducer/SET_PLATFORM'='initialReducer/SET_PLATFORM'
const SET_BG_APP:'initialReducer/SET_BG_APP'='initialReducer/SET_BG_APP'
const SET_ACTIVE_PANEL:'initialReducer/SET_ACTIVE_PANEL'='initialReducer/SET_ACTIVE_PANEL'
const SET_ACTIVE_MODAL:'initialReducer/SET_ACTIVE_MODAL'='initialReducer/SET_ACTIVE_MODAL'

type PlatformType = 'mobile' | 'pc' 
type BgAppType = 'bg__app__light' | 'bg__app__dark'

const initialState = {
    platform: 'mobile' as PlatformType,
    bgApp: 'bg__app__light' as BgAppType,
    activeModal: null as string | null,
    activePanel: 'HOME' as string | null,
}
type InitialState = typeof initialState

type Action = (SetBgApp | SetPlatform | SetActiveModal | SetActivePanel)

export const initialReducer = (state=initialState,action:Action):InitialState=>{
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

type SetActivePanel = {
    type: typeof SET_ACTIVE_PANEL
    activePanel: string
}
export const setActivePanelState = (activePanel:string):SetActivePanel=>{
    return{
        type: SET_ACTIVE_PANEL,
        activePanel
    }
}

type SetActiveModal = {
    type: typeof SET_ACTIVE_MODAL
    activeModal: string
}
export const setActiveModalState = (activeModal:string):SetActiveModal => {
    return{
        type: SET_ACTIVE_MODAL,
        activeModal
    }
}

type SetPlatform = {
    type: typeof SET_PLATFORM
    platform: PlatformType
}
export const  setPlatform = (platform:PlatformType):SetPlatform =>{
    return{
        type: SET_PLATFORM,
        platform
    }
}

type SetBgApp = {
    type: typeof SET_BG_APP
    bgApp: BgAppType
}
export const setBgApp = (bgApp:BgAppType):SetBgApp =>{
    return{
        type: SET_BG_APP,
        bgApp
    }
}
 