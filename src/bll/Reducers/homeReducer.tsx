import { ReactElement } from "react";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import bridge from "@vkontakte/vk-bridge";
import { AppState } from "../store";
import {
  getCityByCoordinate,
  getEcologyCity,
  getEcoSearchData,
  getSubscribes,
  subscribeNoticification,
  unsubscribeNoticification,
} from "../../dal/api";
import {
  DEFAULT_CITY_ID,
  DEFAULT_COUNTRY_ID,
  DEFAULT_COUNTRY_NAME,
} from "../../consts/DEFAULT_VALUES";
import { STATE_KEYS } from "../../consts/STATE_KEYS";
import {
  EcoCityData,
  EcoCountry,
  EcoStation,
  UserEcoSubs,
} from "../../types/EcoTypes";
import { setValueByKeyStorageVKBridge } from "../../utils/setAndGetVkBridge";
import { MySnackbar } from "../../bricks/MySnackbar";

const SET_NATIVE_CITY: "homeReducer/SET_NATIVE_CITY" =
  "homeReducer/SET_NATIVE_CITY";
const SET_CITY_FROM_SEARCH: "homeReducer/SET_CITY_FROM_SEARCH" =
  "homeReducer/SET_CITY_FROM_SEARCH";
const SET_ALLOWED_PLACE: "homeReducer/SET_ALLOWED_PLACE" =
  "homeReducer/SET_ALLOWED_PLACE";
const SET_CHECK_INTRO: "homeReducer/SET_CHECK_INTRO" =
  "homeReducer/SET_CHECK_INTRO";
const SET_NATIVE_CITY_ID: "homeReducer/SET_NATIVE_CITY_ID" =
  "homeReducer/SET_NATIVE_CITY_ID";
const SET_DEFAULT_CITY_ID: "homeReducer/SET_DEFAULT_CITY_ID" =
  "homeReducer/SET_DEFAULT_CITY_ID";
const SET_COUNTRY_ID: "homeReducer/SET_COUNTRY_ID" =
  "homeReducer/SET_COUNTRY_ID";
const SET_COUNTRY_NAME: "homeReducer/SET_COUNTRY_NAME" =
  "homeReducer/SET_COUNTRY_NAME";
const SET_FETCHING: "homeReducer/SET_FETCHING" = "homeReducer/SET_FETCHING";
const SET_SNACKBAR: "homeReducer/SET_SNACKBAR" = "homeReducer/SET_SNACKBAR";
const ADD_SUBSCRIBED_CITIES: "homeReducer/ADD_LIST_TO_SUBSCRIBED_CITIES" =
  "homeReducer/ADD_LIST_TO_SUBSCRIBED_CITIES";
const REMOVE_SUBSCRIBED_CITIES: "homeReducer/REMOVE_SUBSCRIBED_CITIES" =
  "homeReducer/REMOVE_SUBSCRIBED_CITIES";
const SET_STATIONS: "homeReducer/SET_STATIONS" = "homeReducer/SET_STATIONS";

type Thunk = ThunkAction<Promise<void>, AppState, unknown, Action>;

const initialState = {
  city: {
    fromSearch: null as null | EcoCityData,
    native: null as null | EcoCityData,
  },
  defaultCityId: null as null | string,
  nativeCityId: null as null | string,
  countryId: DEFAULT_COUNTRY_ID,
  countryName: DEFAULT_COUNTRY_NAME,
  subscribedCities: [] as UserEcoSubs[],
  stations: [] as EcoStation[],
  isAllowedPlace: false,
  isCheckIntro: false,
  isFetching: true as boolean,
  snackbar: null as null | ReactElement<any, any>,
};
type InitialState = typeof initialState;

type Action =
  | SetNativeCity
  | SetCityFromSearch
  | SetCountryName
  | SetCountryId
  | SetDefaultCityId
  | SetAllowedPlace
  | AddSubscribedCities
  | SetCheckIntro
  | SetFetching
  | SetNativeCityId
  | SetStations
  | SetSnackbar
  | RemoveSubscribedCities;

export const homeReducer = (
  state = initialState,
  action: Action
): InitialState => {
  switch (action.type) {
    case SET_NATIVE_CITY:
      return {
        ...state,
        city: {
          ...state.city,
          native: action.city,
        },
      };
    case SET_CITY_FROM_SEARCH:
      return {
        ...state,
        city: {
          ...state.city,
          fromSearch: action.city,
        },
      };
    case ADD_SUBSCRIBED_CITIES:
      return {
        ...state,
        subscribedCities: [
          ...state.subscribedCities,
          ...action.subscribedCities,
        ],
      };
    case REMOVE_SUBSCRIBED_CITIES:
      return {
        ...state,
        subscribedCities: state.subscribedCities.filter((s) =>
          action.subscribedCities.some((a) => a.cityId !== s.cityId)
        ),
      };
    case SET_COUNTRY_NAME:
    case SET_COUNTRY_ID:
    case SET_DEFAULT_CITY_ID:
    case SET_NATIVE_CITY_ID:
    case SET_ALLOWED_PLACE:
    case SET_CHECK_INTRO:
    case SET_SNACKBAR:
    case SET_STATIONS:
    case SET_FETCHING:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

type SetSnackbar = {
  type: typeof SET_SNACKBAR;
  payload: {
    snackbar: null | ReactElement<any, any>;
  };
};
export const setSnackbar = (
  snackbar: null | ReactElement<any, any>
): SetSnackbar => {
  return {
    type: SET_SNACKBAR,
    payload: {
      snackbar,
    },
  };
};

type SetNativeCity = {
  type: typeof SET_NATIVE_CITY;
  city: EcoCityData;
};
export const setNativeCity = (city: EcoCityData): SetNativeCity => {
  return {
    type: SET_NATIVE_CITY,
    city,
  };
};

type SetCityFromSearch = {
  type: typeof SET_CITY_FROM_SEARCH;
  city: EcoCityData;
};
export const setCityFromSearch = (city: EcoCityData): SetCityFromSearch => {
  return {
    type: SET_CITY_FROM_SEARCH,
    city,
  };
};

type SetFetching = {
  type: typeof SET_FETCHING;
  payload: {
    isFetching: boolean;
  };
};
export const setFetching = (isFetching: boolean): SetFetching => {
  return {
    type: SET_FETCHING,
    payload: {
      isFetching,
    },
  };
};

type SetAllowedPlace = {
  type: typeof SET_ALLOWED_PLACE;
  payload: {
    isAllowedPlace: boolean;
  };
};
export const setAllowedPlace = (isAllowedPlace: boolean): SetAllowedPlace => {
  return {
    type: SET_ALLOWED_PLACE,
    payload: {
      isAllowedPlace,
    },
  };
};

type SetCheckIntro = {
  type: typeof SET_CHECK_INTRO;
  payload: {
    isCheckIntro: boolean;
  };
};
export const setCheckIntro = (isCheckIntro: boolean): SetCheckIntro => {
  return {
    type: SET_CHECK_INTRO,
    payload: {
      isCheckIntro,
    },
  };
};

type SetStations = {
  type: typeof SET_STATIONS;
  payload: {
    stations: EcoStation[];
  };
};
export const setStations = (stations: EcoStation[]): SetStations => {
  return {
    type: SET_STATIONS,
    payload: {
      stations,
    },
  };
};

type AddSubscribedCities = {
  type: typeof ADD_SUBSCRIBED_CITIES;
  subscribedCities: UserEcoSubs[];
};
export const addSubscribedCities = (
  subscribedCities: UserEcoSubs[]
): AddSubscribedCities => {
  return {
    type: ADD_SUBSCRIBED_CITIES,
    subscribedCities,
  };
};

type RemoveSubscribedCities = {
  type: typeof REMOVE_SUBSCRIBED_CITIES;
  subscribedCities: UserEcoSubs[];
};
export const removeSubscribedCities = (
  subscribedCities: UserEcoSubs[]
): RemoveSubscribedCities => {
  return {
    type: REMOVE_SUBSCRIBED_CITIES,
    subscribedCities,
  };
};

type SetDefaultCityId = {
  type: typeof SET_DEFAULT_CITY_ID;
  payload: {
    defaultCityId: string | null;
  };
};
export const setDefaultCityId = (
  defaultCityId: string | null
): SetDefaultCityId => {
  return {
    type: SET_DEFAULT_CITY_ID,
    payload: {
      defaultCityId,
    },
  };
};

type SetNativeCityId = {
  type: typeof SET_NATIVE_CITY_ID;
  payload: {
    nativeCityId: string | null;
  };
};
export const setNativeCityId = (
  nativeCityId: string | null
): SetNativeCityId => {
  return {
    type: SET_NATIVE_CITY_ID,
    payload: {
      nativeCityId,
    },
  };
};

type SetCountryId = {
  type: typeof SET_COUNTRY_ID;
  payload: {
    countryId: string;
  };
};
export const setCountryId = (countryId: string): SetCountryId => {
  return {
    type: SET_COUNTRY_ID,
    payload: {
      countryId,
    },
  };
};

type SetCountryName = {
  type: typeof SET_COUNTRY_NAME;
  payload: {
    countryName: string;
  };
};
export const setCountryName = (countryName: string): SetCountryName => {
  return {
    type: SET_COUNTRY_NAME,
    payload: {
      countryName,
    },
  };
};

const trySetNativeCityByPermission = () => async (dispatch: Dispatch) => {
  dispatch(setFetching(true));
  //@ts-ignore
  const { lat, long } = await bridge.send("VKWebAppGetGeodata");
  const { city } = await getCityByCoordinate(lat, long);
  const cityNameFromCoordinate = city;

  let candidateCityId = DEFAULT_CITY_ID;
  let candidateCountryId = DEFAULT_COUNTRY_ID;
  let candidateCountryName = DEFAULT_COUNTRY_NAME;
  let candidateNativeCity = null as null | EcoCityData;

  const { cities } = (await getEcoSearchData(cityNameFromCoordinate)).data;
  cities.forEach((item: EcoCityData) => {
    if (item.name === cityNameFromCoordinate && !candidateNativeCity) {
      candidateCityId = item.id;
      candidateNativeCity = item;
    }
  });
  if (!candidateNativeCity) {
    candidateNativeCity = (await getEcologyCity(candidateCityId)).data;
  }

  const { countries } = (
    await getEcoSearchData(
      candidateNativeCity?.country
        ? candidateNativeCity.country
        : candidateCountryName
    )
  ).data;
  countries.forEach((item: EcoCountry) => {
    if (item.name === candidateNativeCity.country) {
      candidateCountryId = item.id;
      candidateCountryName = item.name;
    }
  });

  await setValueByKeyStorageVKBridge(
    candidateCountryName,
    STATE_KEYS.DEFAULT_COUNTRY_NAME
  );
  dispatch(setCountryName(candidateCountryName));

  await setValueByKeyStorageVKBridge(
    candidateCountryId,
    STATE_KEYS.DEFAULT_COUNTRY_ID
  );
  dispatch(setCountryId(candidateCountryId));

  await setValueByKeyStorageVKBridge(
    candidateCityId,
    STATE_KEYS.NATIVE_CITY_ID
  );
  //@ts-ignore
  dispatch(setNativeCity(candidateNativeCity));

  dispatch(setFetching(false));
};
export const setNativeCityByPermission =
  (): Thunk => async (dispatch: Dispatch) => {
    try {
      trySetNativeCityByPermission()(dispatch);
    } catch (e) {
      await setValueByKeyStorageVKBridge(
        DEFAULT_CITY_ID,
        STATE_KEYS.DEFAULT_CITY_ID
      );
      dispatch(setFetching(false));
    }
  };

const trySetCityFromSearchByCityId =
  (cityId: string) => async (dispatch: Dispatch) => {
    dispatch(setFetching(true));

    let city = (await getEcologyCity(cityId)).data;
    if (!city) {
      city = (await getEcologyCity(DEFAULT_CITY_ID)).data;
    }
    dispatch(setCityFromSearch(city));

    await setValueByKeyStorageVKBridge(city.id, STATE_KEYS.DEFAULT_CITY_ID);
    dispatch(setFetching(false));
  };
export const setCityFromSearchByCityId =
  (cityId: string): Thunk =>
  async (dispatch: Dispatch) => {
    try {
      trySetCityFromSearchByCityId(cityId)(dispatch);
    } catch (e) {
      dispatch(setFetching(false));
    }
  };

const tryRequestPermissionLocation = () => async (dispatch: Dispatch) => {
  await bridge.send("VKWebAppGetGeodata");
  await setValueByKeyStorageVKBridge(
    JSON.stringify(true),
    STATE_KEYS.IS_ALLOWED_PLACE
  );
  dispatch(setAllowedPlace(true));
};
export const requestPermissionLocation =
  (): Thunk => async (dispatch: Dispatch) => {
    try {
      tryRequestPermissionLocation()(dispatch);
    } catch (e) {
      dispatch(setAllowedPlace(false));
    }
  };

const tryCheckIntro = () => async (dispatch: Dispatch) => {
  await setValueByKeyStorageVKBridge(
    JSON.stringify(true),
    STATE_KEYS.IS_CHECK_INFO
  );
  dispatch(setCheckIntro(true));
};
export const checkIntro = (): Thunk => async (dispatch: Dispatch) => {
  try {
    tryCheckIntro()(dispatch);
  } catch (e) {}
};

const trySubscribeNoticificationByCityId =
  (cityId: string) => async (dispatch: Dispatch) => {
    await subscribeNoticification(cityId);
    dispatch(addSubscribedCities([{ cityId, id: cityId, subscribed: true }]));
    dispatch(
      setSnackbar(
        <MySnackbar
          closeHandler={() => dispatch(setSnackbar(null))}
          resultOperation={true}
          text={"Уведомления включены"}
        />
      )
    );
  };
export const subscribeNoticificationByCityId =
  (cityId: string | null): Thunk =>
  async (dispatch: Dispatch) => {
    try {
      const res = await bridge.send("VKWebAppAllowNotifications");

      if (res.result && cityId) {
        trySubscribeNoticificationByCityId(cityId)(dispatch);
      } else {
        dispatch(
          setSnackbar(
            <MySnackbar
              closeHandler={() => dispatch(setSnackbar(null))}
              resultOperation={false}
              text={"Включить уведомления не удалось"}
            />
          )
        );
      }
    } catch (e) {
      dispatch(
        setSnackbar(
          <MySnackbar
            closeHandler={() => dispatch(setSnackbar(null))}
            resultOperation={false}
            text={"Включить уведомления не удалось"}
          />
        )
      );
    }
  };

const tryUnsubscribeNoticificationByCityId =
  (cityId: string) => async (dispatch: Dispatch) => {
    await unsubscribeNoticification(cityId);
    dispatch(
      removeSubscribedCities([{ cityId, id: cityId, subscribed: false }])
    );
    dispatch(
      setSnackbar(
        <MySnackbar
          resultOperation={true}
          closeHandler={() => dispatch(setSnackbar(null))}
          text={"Уведомления выключены"}
        />
      )
    );
  };
export const unsubscribeNoticificationByCityId =
  (cityId: string | null): Thunk =>
  async (dispatch: Dispatch) => {
    try {
      if (cityId) {
        tryUnsubscribeNoticificationByCityId(cityId)(dispatch);
      } else {
        dispatch(
          setSnackbar(
            <MySnackbar
              closeHandler={() => dispatch(setSnackbar(null))}
              resultOperation={false}
              text={"Выключить уведомления не удалось"}
            />
          )
        );
      }
    } catch (e) {
      dispatch(
        setSnackbar(
          <MySnackbar
            closeHandler={() => dispatch(setSnackbar(null))}
            resultOperation={false}
            text={"Выключить уведомления не удалось"}
          />
        )
      );
    }
  };

const trySetAllSubscribersUser = () => async (dispatch: Dispatch) => {
  const res = await getSubscribes();
  dispatch(addSubscribedCities(res));
};
export const setAllSubscribersUser =
  (): Thunk => async (dispatch: Dispatch) => {
    try {
      trySetAllSubscribersUser()(dispatch);
    } catch (e) {
      dispatch(addSubscribedCities([]));
    }
  };

const trySetStationsByCityName =
  (cityName: string) => async (dispatch: Dispatch) => {
    const { stations } = (await getEcoSearchData(cityName)).data;
    dispatch(setStations(stations));
  };
export const setStationsByCityName =
  (cityName: string): Thunk =>
  async (dispatch: Dispatch) => {
    try {
      trySetStationsByCityName(cityName)(dispatch);
    } catch (e) {
      dispatch(setStations([]));
    }
  };
