import { ThunkAction } from "redux-thunk"
import { City } from "../../types/EcoTypes"
import { AppState } from "../store"

type Thunk = ThunkAction<Promise<void>, AppState, unknown, Action>

const SET_CLEAREST_CITIES:'pollutionCitiesReducer/SET_CLEAREST_CITIES'='pollutionCitiesReducer/SET_CLEAREST_CITIES'
const SET_CITIES_FROM_SEARCH:'pollutionCitiesReducer/SET_CITIES_FROM_SEARCH'='pollutionCitiesReducer/SET_CITIES_FROM_SEARCH'
const SET_FETCHING:'pollutionCitiesReducer/SET_FETCHING'='pollutionCitiesReducer/SET_FETCHING'

const initialState = {
    cities: {
        clearest: [] as City[],
        fromSearch: [] as City[]
    },
    isFetching: true
}
type InitialState = typeof initialState

type Action = (any)

export const pollutionCitiesReducer = (state=initialState, action:Action):InitialState =>{
    switch(action.type){
        default:
            return state
    }
}

type SetFetching = {
    type: typeof SET_FETCHING
    payload: {
        isFetching: boolean
    }
}
export const setFetching = (isFetching:boolean):SetFetching =>{
    return{
        type: SET_FETCHING,
        payload: {
            isFetching
        }
    }
}

type SetClearestCities = {
    type: typeof SET_CLEAREST_CITIES
    clearestCities: City[]
}
export const setClearestCities = (clearestCities:City[]):SetClearestCities =>{
    return{
        type: SET_CLEAREST_CITIES,
        clearestCities
    }
}

type SetCitiesFromSearch = {
    type: typeof SET_CLEAREST_CITIES
    citiesFromSearch: City[]
}
export const setCitiesFromSearch = (citiesFromSearch:City[]):SetCitiesFromSearch =>{
    return{
        type: SET_CLEAREST_CITIES,
        citiesFromSearch
    }
}