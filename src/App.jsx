import React, { useEffect, useRef, useCallback, memo } from "react";
import bridge from "@vkontakte/vk-bridge";
import useImage from "use-image";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  AdaptivityProvider,
  AppRoot,
  ModalRoot,
  ConfigProvider,
  PanelSpinner,
  SplitLayout,
  SplitCol,
  Root,
} from "@vkontakte/vkui";
import { Layer, Stage, Image, Text, Rect } from "react-konva";
import "@vkontakte/vkui/dist/vkui.css";
import "./App.css";
import { Intro } from "./panels/Intro";
import { Home } from "./panels/Home";
import { PollutionCities } from "./panels/PollutionCities";
import { MySnackbar } from "./bricks/MySnackbar";
import { NotConnection } from "./panels/NotConnection";
import { TurnNoticification } from "./panels/TurnNoticifications";
import {
  checkIntro,
  requestPermissionLocation,
  setAllSubscribersUser,
  setCityFromSearchByCityId,
  setDefaultCityId,
  setNativeCityByPermission,
  setSnackbar,
  subscribeNoticificationByCityId,
  unsubscribeNoticificationByCityId,
} from "./bll/Reducers/homeReducer";
import {
  getAllowedPlace,
  getCityFromSearch,
  getDefaultCityId,
  getCountryId,
  getCountryName,
  getFetching,
  getNativeCity,
  getSnackbar,
  getSubscribedCities,
} from "./bll/Selectors/homeSelector";
import { getPlatform, getTheme } from "./bll/Selectors/initialSelector";
import { ROUTES } from "./consts/ROUTES";
import { DEFAULT_CITY_ID } from "./consts/DEFAULT_VALUES";
import { ThemeContext, theme } from "./contexts/theme";
import placePNG from "./media/place_for_story.png";
import chevron_right from "./media/chevron_right_for_story.png";
import wifiImage from "./media/wifi_outline_56.svg";
import failed_img from "./media/score_high.svg";
import { useInitRouter, useRouter, setActiveModal, back, createCatchBackBrowserRouteMiddleware } from "@blumjs/router";
import { useEventListener } from "@blumjs/hooks";
import { toOffline, toOnline } from "./utils/internetConnection";

const App = () => {
  useInitRouter({
    view: "Main",
    panel: ROUTES.HOME,
    modal: null,
    popout: null,
  }, 
  createCatchBackBrowserRouteMiddleware(ROUTES.HOME, ()=>{
    console.log("closing app...")
    bridge.send("VKWebAppClose", {status: "success"})
  }));
  const { activeModal, activePanel, isRouteInit } = useRouter();

  const dispatch = useDispatch();
  const platform = useSelector(getPlatform);
  const defaultCityId = useSelector(getDefaultCityId);
  const cityFromSearch = useSelector(getCityFromSearch);
  const isAllowedPlace = useSelector(getAllowedPlace);
  const nativeCity = useSelector(getNativeCity);
  const countryName = useSelector(getCountryName);
  const countryId = useSelector(getCountryId);
  const snackbar = useSelector(getSnackbar);
  const subscribedCities = useSelector(getSubscribedCities);
  const isFetching = useSelector(getFetching);

  const closeModalHandler = () => {
    back();
  };

  useEffect(() => {
    dispatch(setAllSubscribersUser());
  }, []);

  const handlerLocationHashChange = async () => {
    if (window.location.hash.slice(1)) {
      dispatch(setDefaultCityId(window.location.hash.slice(1)));
    }
  };
  useEffect(() => {
    handlerLocationHashChange();
  }, [window.location.hash]);

  const go = (modal) => {
    if (!modal) {
      back();
    } else {
      setActiveModal(modal);
    }
  };

  useEffect(() => {
    if (isAllowedPlace) {
      dispatch(setNativeCityByPermission());
    }
  }, [isAllowedPlace]);
  useEffect(() => {
    if (defaultCityId) {
      dispatch(setCityFromSearchByCityId(defaultCityId));
    }
  }, [defaultCityId]);

  const refSticker = useRef(null);
  const refBg = useRef(null);
  const tryDoStory = React.useCallback(
    async (data) => {
      //@ts-ignore
      await bridge
        .send("VKWebAppShowStoryBox", {
          ...data,
          stickers: [
            {
              sticker_type: "renderable",
              sticker: {
                can_delete: false,
                content_type: "image",
                //@ts-ignore
                blob: refSticker.current.toDataURL(),
                clickable_zones: [
                  {
                    action_type: "link",
                    action: {
                      link: `https://vk.com/app7991717#${
                        cityFromSearch?.id ?? DEFAULT_CITY_ID
                      }`,
                      tooltip_text_key: "tooltip_open_default",
                    },
                  },
                ],
                transform: {
                  gravity: "center",
                  relation_width: 1,
                },
              },
            },
          ],
        })
        .catch((e) => {
          dispatch(
            setSnackbar(
              <MySnackbar
                closeHandler={closeSnackbarHandler}
                resultOperation={true}
                text={"Опубликовать историю не удалось"}
              />
            )
          );
        })
        .then((res) => {
          if (res) {
            dispatch(
              setSnackbar(
                <MySnackbar
                  closeHandler={closeSnackbarHandler}
                  resultOperation={true}
                  text={"История опубликована"}
                />
              )
            );
          } else {
            dispatch(
              setSnackbar(
                <MySnackbar
                  closeHandler={closeSnackbarHandler}
                  resultOperation={false}
                  text={"Опубликовать историю не удалось"}
                />
              )
            );
          }
        });
    },
    [platform, refSticker, refBg]
  );
  const doStory = React.useCallback(async () => {
    let data = {};
    if (platform === "pc") {
      data = {
        background_type: "image",
        //@ts-ignore
        blob: refSticker.current.toDataURL(),
      };
    } else {
      data = {
        background_type: "none",
      };
    }
    try {
      if (cityFromSearch) {
        await tryDoStory(data);
      }
    } catch (e) {
      dispatch(
        setSnackbar(
          <MySnackbar
            closeHandler={closeSnackbarHandler}
            resultOperation={false}
            text={"Опубликовать историю не удалось"}
          />
        )
      );
    }
  }, [refSticker, cityFromSearch, refBg]);
  const closeSnackbarHandler = () => {
    dispatch(setSnackbar(null));
  };

  const subscribeNoticification = useCallback(() => {
    dispatch(subscribeNoticificationByCityId(defaultCityId));
  }, [defaultCityId]);
  const unsubscribeNoticification = useCallback(() => {
    dispatch(unsubscribeNoticificationByCityId(defaultCityId));
  }, [defaultCityId]);

  const modal = (
    <ModalRoot onClose={closeModalHandler} activeModal={activeModal}>
      <Intro
        checkIntro={() => dispatch(checkIntro())}
        requestPermissionLocation={() => dispatch(requestPermissionLocation())}
        id={ROUTES.INFO}
        closeHandler={closeModalHandler}
      />
      <TurnNoticification
        id={ROUTES.TURN_NOTICIFICATIONS}
        closeHandler={closeModalHandler}
        subscribeNoticification={subscribeNoticification}
      />
      <PollutionCities
        requestPermissionLocation={requestPermissionLocation}
        isAllowedPlace={isAllowedPlace}
        myCityId={nativeCity ? nativeCity.id : DEFAULT_CITY_ID}
        myCity={nativeCity ? nativeCity.name : "Санкт-Петербург"}
        setDefaultCity={(cityId) => dispatch(setDefaultCityId(cityId))}
        countryName={countryName}
        countryId={countryId}
        closeHandler={closeModalHandler}
        id={ROUTES.POLLUTION_CITIES}
      />
    </ModalRoot>
  );

  const openSubscribePanel = () => {
    go(ROUTES.TURN_NOTICIFICATIONS);
  };

  const appearance = useSelector(getTheme);
  useEventListener("offline", toOffline(activeModal));
  useEventListener("online", toOnline);

  if (!isRouteInit) {
    return <PanelSpinner />;
  }
  return (
    <ConfigProvider appearance={appearance}>
      <AdaptivityProvider>
        <ThemeContext.Provider value={theme[appearance]}>
          <AppRoot>
            <SplitLayout modal={modal}>
              <SplitCol animate>
                <Root activeView={"Main"}>
                  <View id="Main" activePanel={activePanel}>
                    <NotConnection image={wifiImage} id={ROUTES.OFFLINE} />
                    <Home
                      snackbar={snackbar}
                      subscribeNoticification={openSubscribePanel}
                      unsubsubscribeNoticification={unsubscribeNoticification}
                      isCitySubscribed={
                        cityFromSearch
                          ? subscribedCities.some(
                              (s) => s.cityId === cityFromSearch.id
                            )
                          : false
                      }
                      doStory={doStory}
                      nativeCityId={
                        nativeCity ? nativeCity.id : DEFAULT_CITY_ID
                      }
                      isFetching={isFetching}
                      go={go}
                      city={cityFromSearch ? cityFromSearch : null}
                      id={ROUTES.HOME}
                      isGoodWind={
                        cityFromSearch && cityFromSearch.current
                          ? cityFromSearch.current.aqi <= 50
                          : true
                      }
                    />
                  </View>
                </Root>
              </SplitCol>
            </SplitLayout>
          </AppRoot>
        </ThemeContext.Provider>
        <div
          id="canvas"
          style={{ width: 0, height: 0, opacity: 0, overflow: "hidden" }}
        >
          <img src={wifiImage} />
          <img src={failed_img} />
          <div className="text__Inter-SemiBold">Inter-Semibold</div>
          <div className="text__Inter-Regular">Inter-Regular</div>
          <div className="text__SF-Pro-Rounded-Regular"></div>
          <Stage width={253} height={250} ref={refBg}>
            <Layer>
              <Rect fill={"white"} width={253} height={250} />
            </Layer>
          </Stage>
          <Stage ref={refSticker} width={1362} height={1427}>
            <Layer>
              <Rect
                fillLinearGradientStartPoint={{ x: 0, y: -100 }}
                fillLinearGradientEndPoint={{ x: 670, y: 1200 }}
                fillLinearGradientColorStops={
                  cityFromSearch && cityFromSearch.current.aqi >= 100
                    ? [0, "rgba(255,153,182,1)", 1, "rgba(204,183,254,1)"]
                    : cityFromSearch && cityFromSearch.current.aqi >= 50
                    ? [0, "#FDCFB2", 1, "#BF8FF5"]
                    : [0, "#B3FF86", 1, "#EEFFC8"]
                }
                width={1362}
                height={1427}
                cornerRadius={118.56}
              />
            </Layer>
            <Layer>
              <Text
                fontFamily={"SF-Pro-Rounded-Heavy"}
                text="Качество воздуха:"
                x={254.58}
                fontSize={96}
                y={286.71}
                fill="rgba(0, 0, 0, 0.5)"
                width={860}
                height={115}
              />
              <Text
                fontFamily={"SF-Pro-Rounded-Heavy"}
                text={
                  cityFromSearch && cityFromSearch.current.aqi >= 100
                    ? "Плохое"
                    : cityFromSearch && cityFromSearch.current.aqi >= 50
                    ? "Неплохое"
                    : "Хорошее"
                }
                x={
                  cityFromSearch && cityFromSearch.current.aqi >= 100
                    ? 340
                    : cityFromSearch && cityFromSearch.current.aqi >= 50
                    ? 240
                    : 269.58
                } //53.5
                fontSize={188}
                y={421.71}
                fill="rgba(0, 0, 0, 0.5)"
                width={1000} //146
                height={224}
              />
              <Text
                fontFamily={"SF-Pro-Rounded-Regular"}
                text={cityFromSearch ? cityFromSearch.name : "SPb"}
                x={
                  (1362 -
                    (cityFromSearch ? cityFromSearch.name.length * 45 : 10)) /
                  2
                }
                fontSize={99}
                y={755}
                fill="rgba(0, 0, 0, 0.5)"
                width={1000}
                height={100}
              />
              <Rect
                x={231}
                y={1084}
                width={901}
                fill={"rgba(255,255,255,0.45)"}
                height={220}
                cornerRadius={165.98}
              />
              <Text
                text={"Узнать больше"}
                width={631}
                height={102}
                x={311}
                fontSize={84}
                fontFamily={"SF-Pro-Rounded-Regular"}
                fill="rgba(0, 0, 0, 0.5)"
                y={1153}
              />
              <PlaceImage
                x={
                  (1362 -
                    (cityFromSearch ? cityFromSearch.name.length * 45 : 10) -
                    140) /
                  2
                }
              />
              <ChevronRight />
            </Layer>
          </Stage>
        </div>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

const PlaceImage = memo(({ x }) => {
  const [image] = useImage(placePNG);
  return <Image x={x} y={762.15} image={image} />;
});

const ChevronRight = memo(() => {
  const [image] = useImage(chevron_right);
  return <Image x={1005.8} y={1167.05} image={image} />;
});

export default App;
