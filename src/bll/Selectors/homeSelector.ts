import { AppState } from "../store";


export const getCityFromSearch = (state:AppState) =>{
    return state.home.city.fromSearch
}

export const getNativeCity = (state:AppState) =>{
    return state.home.city.native
}

export const getAllowedPlace = (state:AppState) =>{
    return state.home.isAllowedPlace
}

export const getCheckIntro = (state:AppState) =>{
    return state.home.isCheckIntro
}

export const getSubscribedCities = (state:AppState) =>{
    return state.home.subscribedCities
}

export const getCityId = (state:AppState) =>{
    return state.home.cityId
}

export const getCountryId = (state:AppState) =>{
    return state.home.countryId
}

export const getCountryName = (state:AppState) =>{
    return state.home.countryName
}

export const getFetching = (state:AppState) =>{
    return state.home.isFetching
}

export const getSnackbar = (state:AppState) =>{
    return state.home.snackbar
}