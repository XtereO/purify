import bridge from "@vkontakte/vk-bridge";
import { setAllowedPlace, setCheckIntro, setDefaultCityId, setCountryId, setCountryName, setNativeCityId } from "../bll/Reducers/homeReducer";
import { setBgApp, setPlatform, setActiveModalState } from "../bll/Reducers/initialReducer";
import { store } from "../bll/store";
import { DEFAULT_CITY_ID, DEFAULT_COUNTRY_ID, DEFAULT_COUNTRY_NAME } from "../consts/DEFAULT_VALUES";
import { ROUTES } from "../consts/ROUTES";
import { STATE_KEYS } from "../consts/STATE_KEYS";


const dispatch = store.dispatch
export const subscribeVkBridge = async () => {
    bridge.subscribe(({ detail }) => {
        const { type, data } = detail
        if (type === 'VKWebAppUpdateConfig') {
            const schemeAttribute = document.createAttribute('scheme');
            //@ts-ignore
            schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
            const title = new RegExp('light')
            //@ts-ignore
            if ((data.scheme.match(title)) || data.scheme.match(new RegExp('vkcom'))) {
                dispatch(setBgApp('bg__app__light'))
                //@ts-ignore
                bridge.send("VKWebAppSetViewSettings", { "status_bar_style": "dark", "action_bar_color": "#F5F5F5" })
            } else {
                dispatch(setBgApp('bg__app__dark'))
                bridge.send("VKWebAppSetViewSettings", { "status_bar_style": "light", "action_bar_color": "#343434" })
            }

            //@ts-ignore
            if (window.location.href.match(new RegExp('vk_platform=mobile_web')) || data.scheme.match(new RegExp('vkcom'))) {
                dispatch(setPlatform('pc'))
            } else {
                dispatch(setPlatform('mobile'))
            }

            document.body.attributes.setNamedItem(schemeAttribute);
        }
    })
}

export const fetchData = async () => {
    const res = (await bridge.send('VKWebAppStorageGet', { keys: Object.values(STATE_KEYS) }))
    const data = res.keys
    
    data.forEach((s) => {
        const value = s.value
        switch (s.key) {
            case STATE_KEYS.DEFAULT_COUNTRY_NAME:
                dispatch(setCountryName(value ? value : DEFAULT_COUNTRY_NAME))
                break
            case STATE_KEYS.IS_CHECK_INFO:
                if (!value) {
                    dispatch(setActiveModalState(ROUTES.INFO))
                } else {
                    dispatch(setCheckIntro(true))
                }
                break
            case STATE_KEYS.IS_ALLOWED_PLACE:
                if (value) {
                    dispatch(setAllowedPlace(true))
                }
                break
            case STATE_KEYS.DEFAULT_COUNTRY_ID:
                dispatch(setCountryId(value ? value : DEFAULT_COUNTRY_ID))
                break
            case STATE_KEYS.NATIVE_CITY_ID:
                dispatch(setNativeCityId(value ? value : DEFAULT_CITY_ID))
                break
            case STATE_KEYS.DEFAULT_CITY_ID:
                const defaultCityId = store.getState().home.defaultCityId
                if (value && (!defaultCityId)) {
                    dispatch(setDefaultCityId(value))
                }
                break
            default:
                break;
        }
    })

    const defaultCityId = store.getState().home.defaultCityId
    if (!defaultCityId) {
        const nativeCityId = store.getState().home.nativeCityId
        dispatch(setDefaultCityId(nativeCityId))
    }
}

