import { AppState } from "../store";

export const getCityFromSearch = (state: AppState) => {
  return state.home.city.fromSearch;
};
export const getNativeCity = (state: AppState) => {
  return state.home.city.native;
};
export const getAllowedPlace = (state: AppState) => {
  return state.home.isAllowedPlace;
};
export const getCheckIntro = (state: AppState) => {
  return state.home.isCheckIntro;
};
export const getSubscribedCities = (state: AppState) => {
  return state.home.subscribedCities;
};
export const getStations = (state: AppState) => {
  return state.home.stations;
};
export const getDefaultCityId = (state: AppState) => {
  return state.home.defaultCityId;
};
export const getNativeCityId = (state: AppState) => {
  return state.home.nativeCityId;
};
export const getCountryId = (state: AppState) => {
  return state.home.countryId;
};
export const getCountryName = (state: AppState) => {
  return state.home.countryName;
};

export const getFetching = (state: AppState) => {
  return state.home.isFetching;
};

export const getSnackbar = (state: AppState) => {
  return state.home.snackbar;
};
