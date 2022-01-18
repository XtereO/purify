import { AppState } from "../store";


export const getFetching = (state:AppState)=>{
    return state.pollutionCities.isFetching
}

export const getClearestCities = (state:AppState)=>{
    return state.pollutionCities.cities.clearest
}

export const getCitiesFromSearch = (state:AppState)=>{
    return state.pollutionCities.cities.fromSearch
}


