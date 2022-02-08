import { setActiveModalState, setActivePanelState } from "../bll/Reducers/initialReducer"
import { store } from "../bll/store"

const dispatch = store.dispatch
export const toOffline=()=>{
    dispatch(setActiveModalState(''))
    dispatch(setActivePanelState('OFFLINE'))
}

export const toOnline=()=>{
    dispatch(setActivePanelState('HOME'))
    dispatch(setActiveModalState(''))
}
