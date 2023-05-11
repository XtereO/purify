import bridge from "@vkontakte/vk-bridge";
import {
  setAllowedPlace,
  setCheckIntro,
  setDefaultCityId,
  setCountryId,
  setCountryName,
  setNativeCityId,
} from "../bll/Reducers/homeReducer";
import {
  setPlatform,
  setTheme,
} from "../bll/Reducers/initialReducer";
import { store } from "../bll/store";
import {
  DEFAULT_CITY_ID,
  DEFAULT_COUNTRY_ID,
  DEFAULT_COUNTRY_NAME,
} from "../consts/DEFAULT_VALUES";
import { ROUTES } from "../consts/ROUTES";
import { STATE_KEYS } from "../consts/STATE_KEYS";
import { theme } from "../contexts/theme";
import { setActiveModal } from "@blumjs/router";
import { getValuesByKeysStorageVKBridge } from "./setAndGetVkBridge";

const dispatch = store.dispatch;
export const subscribeVkBridge = async () => {
  bridge.subscribe(({ detail }) => {
    const { type, data } = detail;
    if (type === "VKWebAppUpdateConfig") {
      console.log("updated", data)
      dispatch(setTheme(data.appearance));
      if(bridge.supports("VKWebAppSetViewSettings")){
        bridge.send("VKWebAppSetViewSettings", {
          status_bar_style: data.appearance,
          action_bar_color: theme[data.appearance].bgApp,
        });
        dispatch(setPlatform("mobile"));
      }
      
      if (
        window.location.href.match(new RegExp("vk_platform=mobile_web")) ||
        data.scheme.match(new RegExp("vkcom"))
      ) {
        dispatch(setPlatform("pc"));
      } else {
        dispatch(setPlatform("mobile"));
      }
    }
  });
};

export const fetchData = async () => {
  const data = await getValuesByKeysStorageVKBridge(Object.values(STATE_KEYS))
  console.log("fetched data", data)

  data.forEach((s) => {
    const value = s.value;
    switch (s.key) {
      case STATE_KEYS.DEFAULT_COUNTRY_NAME:
        dispatch(setCountryName(value ? value : DEFAULT_COUNTRY_NAME));
        break;
      case STATE_KEYS.IS_CHECK_INFO:
        if (!value) {
          setActiveModal(ROUTES.INFO);
        } else {
          dispatch(setCheckIntro(true));
        }
        break;
      case STATE_KEYS.IS_ALLOWED_PLACE:
        if (value) {
          dispatch(setAllowedPlace(true));
        }
        break;
      case STATE_KEYS.DEFAULT_COUNTRY_ID:
        dispatch(setCountryId(value ? value : DEFAULT_COUNTRY_ID));
        break;
      case STATE_KEYS.NATIVE_CITY_ID:
        dispatch(setNativeCityId(value ? value : DEFAULT_CITY_ID));
        break;
      case STATE_KEYS.DEFAULT_CITY_ID:
        const defaultCityId = store.getState().home.defaultCityId;
        if (value && !defaultCityId) {
          dispatch(setDefaultCityId(value));
        }
        break;
      default:
        break;
    }
  });

  const defaultCityId = store.getState().home.defaultCityId;
  if (!defaultCityId) {
    const nativeCityId = store.getState().home.nativeCityId;
    dispatch(setDefaultCityId(nativeCityId));
  }
};
