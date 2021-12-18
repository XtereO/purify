import bridge from "@vkontakte/vk-bridge"
import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { DEFAULT_CITY_ID, DEFAULT_COUNTRY_ID, DEFAULT_COUNTRY_NAME } from "../../consts/DEFAULT_VALUES"
import { STATE_KEYS } from "../../consts/STATE_KEYS"
import { getCityByCoordinate, getEcoSearchData } from "../../dal/api"
import { EcoCityData, UserEcoSubs } from "../../types/EcoTypes"
import { AppState } from "../store"

type Thunk=ThunkAction<Promise<void>, AppState, unknown, Action>

const SET_NATIVE_CITY:'homeReducer/SET_NATIVE_CITY'='homeReducer/SET_NATIVE_CITY'
const SET_CITY_FROM_SEARCH:'homeReducer/SET_CITY_FROM_SEARCH'='homeReducer/SET_CITY_FROM_SEARCH'
const SET_ALLOWED_PLACE:'homeReducer/SET_ALLOWED_PLACE'='homeReducer/SET_ALLOWED_PLACE'
const SET_CHECK_INTRO:'homeReducer/SET_CHECK_INTRO'='homeReducer/SET_CHECK_INTRO'
const SET_SUBSCRIBED_CITIES:'homeReducer/SET_SUBSCRIBED_CITIES'='homeReducer/SET_SUBSCRIBED_CITIES'
const SET_CITY_ID:'homeReducer/SET_CITY_ID'='homeReducer/SET_CITY_ID'
const SET_COUNTRY_ID:'homeReducer/SET_COUNTRY_ID'='homeReducer/SET_COUNTRY_ID'
const SET_COUNTRY_NAME:'homeReducer/SET_COUNTRY_NAME'='homeReducer/SET_COUNTRY_NAME'
const SET_FETCHING:'homeReducer/SET_FETCHING'='homeReducer/SET_FETCHING'


const initialState = {
    city:{
        fromSearch: null as null | EcoCityData,
        native: null as null | EcoCityData
    },
    isAllowedPlace: false,
    isCheckIntro: false,
    subscribedCities: [] as UserEcoSubs[],
    cityId: null as null | string,
    countryId: DEFAULT_COUNTRY_ID,
    countryName: DEFAULT_COUNTRY_NAME,
    isFetching: false as boolean
}
type InitialState = typeof initialState

type Action = ( SetNativeCity | SetCityFromSearch   | 
                SetCountryName | SetCountryId       |
                SetCityId | SetAllowedPlace         |
                SetSubscribedCities | SetCheckIntro |
                SetFetching                          )

export const homeReducer = (state=initialState,action:Action):InitialState=>{
    switch(action.type){
        case SET_NATIVE_CITY:
            return{
                ...state,
                city:{
                    ...state.city,
                    native: action.city
                }
            }
        case SET_CITY_FROM_SEARCH:
            return{
                ...state,
                city:{
                    ...state.city,
                    fromSearch: action.city
                }
            }
        case SET_COUNTRY_NAME:
        case SET_COUNTRY_ID:
        case SET_CITY_ID:
        case SET_ALLOWED_PLACE:
        case SET_SUBSCRIBED_CITIES:
        case SET_CHECK_INTRO:
        case SET_FETCHING:
            return{
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}


type SetNativeCity = {
    type: typeof SET_NATIVE_CITY
    city: EcoCityData
}
export const setNativeCity = (city:EcoCityData):SetNativeCity =>{
    return{
        type: SET_NATIVE_CITY, city
    }
}
 
type SetCityFromSearch = {
    type: typeof SET_CITY_FROM_SEARCH
    city: EcoCityData
}
export const setCityFromSearch = (city:EcoCityData):SetCityFromSearch =>{
    return{
        type: SET_CITY_FROM_SEARCH, city
    }
}

type SetFetching = {
    type: typeof SET_FETCHING
    payload:{
        isFetching: boolean
    }
}
export const setFetching = (isFetching: boolean):SetFetching =>{
    return{
        type: SET_FETCHING,
        payload:{
            isFetching
        }
    }
}

type SetAllowedPlace = {
    type: typeof SET_ALLOWED_PLACE
    payload: {
        isAllowedPlace: boolean
    }
}
export const setAllowedPlace = (isAllowedPlace: boolean):SetAllowedPlace =>{
    return{
        type: SET_ALLOWED_PLACE,
        payload: {
            isAllowedPlace
        }
    }
}

type SetCheckIntro = {
    type: typeof SET_CHECK_INTRO
    payload: {
        isCheckIntro: boolean
    }
}
export const setCheckIntro = (isCheckIntro: boolean):SetCheckIntro =>{
    return{
        type: SET_CHECK_INTRO,
        payload: {
            isCheckIntro
        }
    }
}

type SetSubscribedCities = {
    type: typeof SET_SUBSCRIBED_CITIES
    payload:{
        subscribedCities: UserEcoSubs[]
    }
}
export const setSubscribedCities = (subscribedCities:UserEcoSubs[]):SetSubscribedCities =>{
    return{
        type: SET_SUBSCRIBED_CITIES,
        payload:{
            subscribedCities
        }
    }
}

type SetCityId = {
    type: typeof SET_CITY_ID
    payload: {
        cityId: string | null
    }
}
export const setCityId = (cityId: string | null):SetCityId =>{
    return{
        type: SET_CITY_ID,
        payload: {
            cityId
        }
    }
}

type SetCountryId = {
    type: typeof SET_COUNTRY_ID
    payload: {
        countryId: string
    }
}
export const setCountryId = (countryId: string):SetCountryId =>{
    return{
        type: SET_COUNTRY_ID,
        payload: {
            countryId
        }
    }
}

type SetCountryName = {
    type: typeof SET_COUNTRY_NAME
    payload: {
        countryName: string
    }
}
export const setCountryName = (countryName: string):SetCountryName =>{
    return{
        type: SET_COUNTRY_NAME,
        payload: {
            countryName
        }
    }
}


// Thunks

export const allowPlace = (cityId:string | null):Thunk => async (dispatch:Dispatch)=>{
    try {
        dispatch(setFetching(true))
        //@ts-ignore
        let { lat, long } = await bridge.send('VKWebAppGetGeodata')
        const { city } = await getCityByCoordinate(lat, long)
        let cityNameFromCoordinate = city

        let candidateCityId = DEFAULT_CITY_ID
        let candidateCountryId = DEFAULT_COUNTRY_ID
        let candidateCountryName = DEFAULT_COUNTRY_NAME
        let candidateNativeCity = null as null | EcoCityData

        const data = (await getEcoSearchData(cityNameFromCoordinate)).data
        data.cities.forEach(item => {
            if (item.name === cityNameFromCoordinate && (!candidateNativeCity)) {
                candidateCityId = item.id
                candidateNativeCity = item
            }
        })
        const dataCountry = (await getEcoSearchData(candidateNativeCity.country)).data
        dataCountry.countries.forEach(item => {
            if (item.name === candidateNativeCity.country) {
                candidateCountryId = item.id
                candidateCountryName = item.name
            }
        })
        await bridge.send('VKWebAppStorageSet',
            {
                key: STATE_KEYS.DEFAULT_COUNTRY_NAME,
                value: candidateCountryName
            })
        dispatch(setCountryName(candidateCountryName))

        await bridge.send('VKWebAppStorageSet',
            {
                key: STATE_KEYS.DEFAULT_COUNTRY_ID,
                value: candidateCountryId
            })
        dispatch(setCountryId(candidateCountryId))

        await bridge.send('VKWebAppStorageSet',
            {
                key: STATE_KEYS.DEFAULT_CITY_ID,
                value: candidateCityId
            })
        if (!cityId) {
            dispatch(setCityId(candidateCityId))
        }
        dispatch(setNativeCity(candidateNativeCity))
        dispatch(setFetching(false))
    } catch (e) {
        bridge.send('VKWebAppStorageSet',
            {
                key: STATE_KEYS.DEFAULT_CITY_ID,
                value: JSON.stringify(cityId)
            })
        dispatch(setFetching(false))
    }
}