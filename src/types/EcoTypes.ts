export type UserEcoSubs = {
  id: string;
  cityId: string;
  subscribed: boolean;
}

export type EcoStation = {
  id: string;
  name: string;
  url: string;
  type: 'station';
  coordinates: {
    latitude: number;
    longitude: number;
  };
  aqi: number;
  followersCount: number;
};

export type EcoCity = {
  id: string;
  state: string;
  country: string;
  url: string;
  estimated: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  name: string;
  aqi: number;
  followersCount: number;
  zoomLevel: number;
};

export type EcoState = {
  id: string;
  country: string;
  url: string;
  estimated: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  name: string;
  zoomLevel: number;
};

export type EcoCountry = {
  id: string;
  url: string;
  estimated: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  name: string;
  zoomLevel: number;
};

export type EcoContributor = {
  name: string;
  picture: string;
  url: string;
  followers: number;
};

export type EcoSearchData = {
  stations: EcoStation[];
  cities: EcoCity[];
  states: EcoState[];
  countries: EcoCountry[];
  contributors: EcoContributor[];
  publications: [];
};

export type EcoContributorType = 'Government' | 'Contributor' | 'anonymous';
export type EcoContributorSubType = 'Government' | 'Corporate';

export type EcoCityContributor = {
  type: EcoContributorType;
  name: string;
  stationsCount: number;
  pictureURL: string;
  url: string;
  subtype?: EcoContributorSubType;
};

export type EcoCitySource = {
  type: string;
  name: string;
  stationsCount: number;
  pictureURL: string;
  url: string;
  subtype?: string;
};

export type EcoCityType = 'city' | 'country' | 'state';

export enum EcoPollutantName {
  pm25 = 'pm25',
  pm10 = 'pm10',
  o3 = 'o3',
  no2 = 'no2',
  so2 = 'so2',
  co2 = 'co2',
}

export type EcoCityPollutant = {
  aqi: number;
  concentration: number;
  pollutantName: EcoPollutantName;
};

export type EcoCityForecastHourly = {
  /**
   * format '2021-11-03T06:00:00.000Z'
   */
  ts: string;
  aqi: number;
  pressure: number;
  humidity: number;
  wind: {
    speed: number;
    direction: number;
  };
  icon: number;
  condition: string;
  temperature: number;
};
export type EcoCityForecastDaily = {
  /**
   * format '2021-11-03T06:00:00.000Z'
   */
  ts: string;
  aqi: number;
  pressure: number;
  humidity: number;
  wind: {
    speed: number;
    direction: number;
  };
  icon: number;
  condition: string;
  temperature: {
    max: number;
    min: number;
  };
};

export type EcoCityData = {
  id: string;
  name: string;
  country: string;
  zoomLevel: number;
  breadcrumbs: {
    label: string;
    url: string;
  }[];
  followers: {
    count: number;
    pictures: string[];
  };
  contributors: EcoCityContributor[];
  sources: EcoCitySource[];
  timezone: string;
  activeStationsCount: number;
  hasLowCostSensor: boolean;
  label: string;
  link: string;
  type: 'city';
  current: {
    /**
     * format 2021-11-03T06:00:00.000Z
     */
    ts: string;
    aqi: number;
    mainPollutant: EcoPollutantName;
    concentration: number;
    WHOExposure: {
      WHOExposure: number;
      WHOExposureColor: string;
    };
    condition: string;
    icon: string;
    humidity: number;
    pressure: number;
    wind: {
      speed: number;
      direction: number;
    };
    temperature: number;
    pollutants: EcoCityPollutant[];
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  forecasts: {
    hourly: EcoCityForecastHourly[];
    daily: EcoCityForecastDaily[];
  };
  recommendations: {
    pollution: {
      exercice: {
        value: string;
        text: string;
      };
      windows: {
        value: string;
        text: string;
      };
      mask: {
        value: string;
      };
      air_purifier: {
        value: string;
      };
    };
  };
  countryID: string;
};
export type EcoCountryData = {
  id: string;
  name: string;
  breadcrumbs: {
    label: string;
    url: string;
  }[];
  contributors: EcoCityContributor[];
  sources: EcoCitySource[];
  activeStationsCount: number;
  hasLowCostSensor: boolean;
  label: string;
  link: string;
  type: 'country';
  coordinates: {
    latitude: number;
    longitude: number;
  };
};
export type EcoStateData = {
  id: string;
  name: string;
  breadcrumbs: {
    label: string;
    url: string;
  }[];
  contributors: EcoCityContributor[];
  sources: EcoCitySource[];
  activeStationsCount: number;
  hasLowCostSensor: boolean;
  label: string;
  link: string;
  type: 'state';
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export enum EcoInfoTarget {
  City = 'city',
  Country = 'country',
  State = 'state',
}

export type EcoCityRank = {
  aqi: number;
  city: string;
  id: string;
  rank: number;
  state: string;
  url: string;
};