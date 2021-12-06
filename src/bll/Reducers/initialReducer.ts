import { Appearance, platform } from "@vkontakte/vkui"


const SET_PLATFORM:'initialReducer/SET_PLATFORM'='initialReducer/SET_PLATFORM'
const SET_BG_APP:'initialReducer/SET_BG_APP'='initialReducer/SET_BG_APP'

type PlatformType = 'mobile' | 'pc' 
type BgAppType = 'bg__app__light' | 'bg__app__dark'

const initialState = {
    platform: 'mobile',
    bgApp: 'bg__app__light'
}
type InitialStateType = typeof initialState

type ActionType = SetBgAppType | SetPlatformType

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
        default:
            return state
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
 