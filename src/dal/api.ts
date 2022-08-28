import axios from "axios";
import {
  EcoCityData,
  EcoCityRank,
  EcoSearchData,
  UserEcoSubs,
} from "../types/EcoTypes";

const instance = axios.create({
  baseURL: "https://showtime.app-dich.com/api/ecology/",
});

export const getEcoSearchData = (searchQ?: string) => {
  return instance
    .post<{ data: EcoSearchData }>(`search${window.location.search}`, {
      searchQ,
    })
    .then((res) => res.data)
    .catch((e) => e.response.data);
};

export const getEcologyCity = (cityId: string) => {
  return instance
    .post<{ data: EcoCityData } | null>(`eco-info${window.location.search}`, {
      id: cityId,
      target: "city",
    })
    .then((res) => res.data)
    .catch((e) => e.response.data);
};

export const getEcologyCountry = (countryId: string) => {
  return instance
    .post<{ data: EcoCityData } | null>(`eco-info${window.location.search}`, {
      id: countryId,
      target: "country",
    })
    .then((res) => res.data)
    .catch((e) => e.response.data);
};

export type CityCoordinateType = {
  city: string;
  countryName: string;
};
export const getCityByCoordinate = (lat: number, long: number) => {
  return axios
    .get<CityCoordinateType>(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=ru`
    )
    .then((res) => res.data)
    .catch((e) => e.response.data);
};

export const getEcoRankCity = (countryId: string) => {
  return instance
    .post<EcoCityRank>(`rank${window.location.search}`, {
      id: countryId,
    })
    .then((res) => res.data)
    .catch((e) => e.response.data);
};

export const subscribeNoticification = (cityId: string) => {
  return instance.post(`subscribe${window.location.search}`, { id: cityId });
};

export const unsubscribeNoticification = (cityId: string) => {
  return instance.delete(`subscribe${window.location.search}`, {
    data: { id: cityId },
  });
};

export const getSubscribes = () => {
  return instance
    .get<{ data: UserEcoSubs[] }>(`subscribe${window.location.search}`)
    .then((res) => res.data.data);
};
