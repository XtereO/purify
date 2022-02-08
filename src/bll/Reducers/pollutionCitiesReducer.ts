import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { AppState } from "../store"
import { getEcoRankCity, getEcoSearchData } from "../../dal/api"
import { City } from "../../types/EcoTypes"

const SET_CLEAREST_CITIES: 'pollutionCitiesReducer/SET_CLEAREST_CITIES' = 'pollutionCitiesReducer/SET_CLEAREST_CITIES'
const SET_CITIES_FROM_SEARCH: 'pollutionCitiesReducer/SET_CITIES_FROM_SEARCH' = 'pollutionCitiesReducer/SET_CITIES_FROM_SEARCH'
const SET_FETCHING: 'pollutionCitiesReducer/SET_FETCHING' = 'pollutionCitiesReducer/SET_FETCHING'

type Thunk = ThunkAction<Promise<void>, AppState, unknown, Action>

const initialState = {
    cities: {
        clearest: [] as City[],
        fromSearch: [] as City[]
    },
    isFetching: true
}
type InitialState = typeof initialState

type Action = (SetFetching | SetCitiesFromSearch |
               SetClearestCities                  )

export const pollutionCitiesReducer = (state = initialState, action: Action): InitialState => {
    switch (action.type) {
        case SET_CLEAREST_CITIES:
            return{
                ...state,
                cities:{
                    ...state.cities,
                    clearest: [...action.clearestCities]
                }
            }
        case SET_CITIES_FROM_SEARCH:
            return{
                ...state,
                cities:{
                    ...state.cities,
                    fromSearch: [...action.citiesFromSearch]
                }
            }
        case SET_FETCHING:
            return{
                ...state,
                ...action.payload
            }
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
export const setFetching = (isFetching: boolean): SetFetching => {
    return {
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
export const setClearestCities = (clearestCities: City[]): SetClearestCities => {
    return {
        type: SET_CLEAREST_CITIES,
        clearestCities
    }
}

type SetCitiesFromSearch = {
    type: typeof SET_CITIES_FROM_SEARCH,
    citiesFromSearch: City[]
}
export const setCitiesFromSearch = (citiesFromSearch: City[]): SetCitiesFromSearch => {
    return {
        type: SET_CITIES_FROM_SEARCH,
        citiesFromSearch
    }
}


const trySetCititesByTitle = (title:string) => async (dispatch:Dispatch)=>{
    dispatch(setFetching(true))
    const data = (await getEcoSearchData(title)).data
    dispatch(setCitiesFromSearch(data.cities))
    dispatch(setFetching(false))
}
export const setCitiesByTitle = (title:string):Thunk => async (dispatch:Dispatch) => {
    try {
        trySetCititesByTitle(title)(dispatch)
    } catch (e) {
        dispatch(setFetching(false))
    }
}

const trySetClearestCititesByCountryId = (countryId:string) => async (dispatch:Dispatch) => {
    dispatch(setFetching(true))
    const data = (await getEcoRankCity(countryId)).data
    dispatch(setClearestCities(data))
    dispatch(setFetching(false))
}
export const setClearestCitiesByCountryId = (countryId:string):Thunk => async (dispatch: Dispatch) => {
    try {
        trySetClearestCititesByCountryId(countryId)(dispatch)
    } catch (e) {
        dispatch(setFetching(false))
    }
}
