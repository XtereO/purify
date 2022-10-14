import {
  Group,
  Panel,
  Div,
  Avatar,
  Card,
  Cell,
  Spacing,
  Header,
  Link,
  Footer,
  FixedLayout,
  PanelHeader,
} from "@vkontakte/vkui";
import React, { ReactElement, useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem } from "../bricks/ListItem";
import { PollutionItem } from "../bricks/PollutionItem";
import { WeatherItem } from "../bricks/WeatherItem";
import { Advice } from "../bricks/Advice";
import { StationItem } from "../bricks/StationItem";
import { setStationsByCityName } from "../bll/Reducers/homeReducer";
import { getStations } from "../bll/Selectors/homeSelector";
import { EcoCityData } from "../types/EcoTypes";
import { getDistance } from "../utils/getDistance";
import {
  getDescriptionPollutant,
  getFullNamePollutant,
} from "../utils/pollutants";
import { Icon24Dropdown } from "@vkontakte/icons";
import { Icon16Place, Icon24Search } from "@vkontakte/icons";
import { Icon24NotificationOutline } from "@vkontakte/icons";
import { Icon24StoryOutline } from "@vkontakte/icons";
import { Icon24NotificationCheckOutline } from "@vkontakte/icons";
//@ts-ignore
import logo from "../media/IQAir_logo.svg";
import { TextInterMedium, TextSFProRoundedSemibold } from "../bricks/Fonts";
import { Banner } from "../bricks/Banner";
import { ThemeContext } from "../contexts/theme";

type Props = {
  id: string;
  isGoodWind: boolean;
  city: EcoCityData | null;
  nativeCityId: string;
  go: (modal: string) => void;
  isFetching: boolean;
  subscribeNoticification: () => void;
  unsubsubscribeNoticification: () => void;
  isCitySubscribed: boolean;
  snackbar: ReactElement<any, any> | null;
  doStory: () => void;
};

export const Home = React.memo<Props>(
  ({
    id,
    snackbar,
    isGoodWind,
    city,
    go,
    isFetching,
    nativeCityId,
    isCitySubscribed,
    subscribeNoticification,
    unsubsubscribeNoticification,
    doStory,
  }) => {
    const dispatch = useDispatch();
    const theme = useContext(ThemeContext);
    const [isShowMore, setShowMore] = useState(false);
    const stations = useSelector(getStations);
    useEffect(() => {
      if (city) {
        dispatch(setStationsByCityName(city.name));
        setShowMore(false);
      }
      return () => {
        setShowMore(false);
      };
    }, [city]);

    const stationsJSX =
      stations && city
        ? stations.map((c, index) => (
            <>
              <StationItem
                distance={getDistance({
                  point1: c.coordinates,
                  point2: city.coordinates,
                })}
                stationName={c.name}
                key={`${index}${c.name}`}
                value={c.aqi}
                mode={c.aqi >= 100 ? "danger" : c.aqi >= 50 ? "okay" : "good"}
              />
              {index + 1 !== stations.length && (
                <Spacing
                  key={`station_spacing${index}`}
                  className="spacing"
                  separator
                  size={16}
                />
              )}
            </>
          ))
        : [];

    const pollutantsJSX = city
      ? city.current.pollutants.map((p, index) => (
          <>
            <PollutionItem
              key={`${index}${p.pollutantName}`}
              title={getFullNamePollutant(p.pollutantName)}
              value={p.concentration}
              aqi={p.aqi}
              tooltipDescription={getDescriptionPollutant(p.pollutantName)}
              bar={
                p.aqi >= 100 ? "bad_bar" : p.aqi >= 50 ? "okay_bar" : "good_bar"
              }
            />
            {index + 1 !== city.current.pollutants.length && (
              <Spacing
                key={`pollutant_spacing${index}`}
                className="spacing"
                separator
                size={32}
              />
            )}
          </>
        ))
      : [];

    const currentDay = new Date().getDay();
    const forecastsJSX = city
      ? city.forecasts.daily.map((c, index) => (
          <>
            <WeatherItem
              key={`${index}-${c.temperature}${c.aqi}`}
              day={currentDay + index + 1}
              value={c.aqi}
              mode={c.aqi >= 100 ? "danger" : c.aqi >= 50 ? "okay" : "good"}
            />
            {index + 1 !== city.forecasts.daily.length && (
              <Spacing
                key={`weather_spacing${index}`}
                className="spacing"
                separator
                size={16}
              />
            )}
          </>
        ))
      : [];

    return (
      <Panel id={id}>
        <div style={{ width: "100%", overflow: "hidden" }}>
          <div style={{ background: theme.bgApp }}>
            <PanelHeader separator={false}></PanelHeader>
          </div>
          <Group style={{ paddingTop: 0, background: theme.bgApp }}>
            <Div
              className={
                "card " +
                (city && city.current.aqi < 50
                  ? "home__good__weather"
                  : city && city.current.aqi < 100
                  ? "home__okay__weather"
                  : "home__bad__weather")
              }
              style={{ background: isFetching ? theme.skeleton[100] : "" }}
            >
              <div className="home__main__title">
                {isFetching ? (
                  <div
                    style={{
                      height: 24,
                      width: 61,
                      background: theme.skeleton[200],
                    }}
                  ></div>
                ) : (
                  <div
                    style={{
                      fontSize: 24,
                      lineHeight: 2.2,
                      color: "rgba(0,0,0,0.5)",
                    }}
                  >
                    <TextSFProRoundedSemibold>
                      <>{city && city.current.aqi} AQI</>
                    </TextSFProRoundedSemibold>
                  </div>
                )}
              </div>
              <TextInterMedium>
                <div className="center__x" style={{ color: "rgba(0,0,0,0.5)" }}>
                  <>
                    {isFetching && (
                      <div
                        style={{
                          height: 16,
                          width: 97,
                          marginTop: 10,
                          background: theme.skeleton[200],
                        }}
                      ></div>
                    )}
                    <div style={{ fontSize: 17 }} className="center__y">
                      {city && nativeCityId === city.id && !isFetching && (
                        <Icon16Place
                          fill={theme.banner.color}
                          style={{ marginRight: 3 }}
                        />
                      )}
                    </div>
                    {!isFetching && city && city.name}
                  </>
                </div>
              </TextInterMedium>
              <div>
                <div className="mt-4 home__main__bottom__side">
                  <div>
                    <div
                      className="home__search__cell__rounded home__search__cell__rounded_active"
                      onClick={() => go("POLLUTION_CITIES")}
                      style={{ opacity: 0.5 }}
                    >
                      <Avatar
                        style={{ backgroundColor: theme.banner.avatar }}
                        shadow={false}
                      >
                        {!isFetching && (
                          <Icon24Search fill={theme.banner.color} />
                        )}
                      </Avatar>
                    </div>
                  </div>
                  <div className="home__main__bottom__right__side">
                    <div
                      style={{ opacity: 0.5 }}
                      onClick={
                        city
                          ? isCitySubscribed
                            ? unsubsubscribeNoticification
                            : subscribeNoticification
                          : () => {}
                      }
                      className="home__search__cell__rounded home__search__cell__rounded_active"
                    >
                      <Avatar
                        style={{ backgroundColor: theme.banner.avatar }}
                        shadow={false}
                      >
                        {!isFetching && !isCitySubscribed && (
                          <Icon24NotificationOutline
                            fill={theme.banner.color}
                          />
                        )}
                        {!isFetching && isCitySubscribed && (
                          <Icon24NotificationCheckOutline
                            fill={theme.banner.color}
                          />
                        )}
                      </Avatar>
                    </div>
                    <div
                      className="ml-1"
                      style={{ opacity: 0.5 }}
                      onClick={city ? doStory : () => {}}
                    >
                      <Avatar
                        className="home__search__cell__rounded home__search__cell__rounded_active"
                        style={{ backgroundColor: theme.banner.avatar }}
                        shadow={false}
                      >
                        {!isFetching && (
                          <Icon24StoryOutline fill={theme.banner.color} />
                        )}
                      </Avatar>
                    </div>
                  </div>
                </div>
              </div>
            </Div>
            <Div>
              {city && !isFetching && (
                <Advice
                  doStory={doStory}
                  pollution={city.recommendations.pollution}
                  isGoodWind={isGoodWind}
                />
              )}
              {isFetching && (
                <Card className="card__app" mode="shadow">
                  <div className="d-flex">
                    <div
                      style={{ height: 24, width: 24, background: theme.skeleton[100], borderRadius: 20000 }}
                    ></div>
                    <div
                      className="ml-2"
                      style={{ height: 17, width: 122, background: theme.skeleton[100] }}
                    />
                  </div>
                </Card>
              )}
            </Div>
            <Banner />
            <Div>
              <Header>
                <TextSFProRoundedSemibold>
                  {!isFetching ? (
                    <span style={{color: theme.cardHeader}} className="unselectable">
                      ЗАГРЯЗНИТЕЛИ
                    </span>
                  ) : (
                    <div
                      style={{ height: 12, width: 85, background: theme.skeleton[100] }}
                    />
                  )}
                </TextSFProRoundedSemibold>
              </Header>
              <Card mode="shadow" className="card__app">
                <div className="card__app">
                  {isFetching &&
                    [3, 2, 1, 0].map((c) => (
                      <>
                        <div
                          key={`pollutant${c}`}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 50px",
                          }}
                        >
                          <div
                            style={{
                              width: 91,
                              height: 17,
                              background: theme.skeleton[100],
                            }}
                          />
                          <div
                            style={{
                              width: 24,
                              height: 24,
                              display: "flex",
                              justifyContent: "end",
                              background: theme.skeleton[100],
                            }}
                          />
                        </div>
                        {c !== 0 && (
                          <Spacing
                            key={`pollutant_key${c}`}
                            className="spacing"
                            separator
                            size={32}
                          />
                        )}
                      </>
                    ))}
                  {!isFetching && [...pollutantsJSX].slice(0, 4)}
                  {!isShowMore && pollutantsJSX.length > 4 && (
                    <Cell onClick={() => setShowMore(true)}>
                      <ListItem
                        description={
                          <Link style={{ color: theme.accent.default }}>
                            Показать все
                          </Link>
                        }
                      >
                        <Icon24Dropdown fill={theme.accent.icon} />
                      </ListItem>
                    </Cell>
                  )}
                  {isShowMore && !isFetching && (
                    <>{[...pollutantsJSX].slice(4, 6)}</>
                  )}
                </div>
              </Card>
            </Div>
            <Div>
              <Header>
                <TextSFProRoundedSemibold>
                  {!isFetching ? (
                    <span
                      style={{ color: theme.cardHeader }}
                      className="unselectable"
                    >
                      ПРОГНОЗ НА НЕДЕЛЮ
                    </span>
                  ) : (
                    <div
                      style={{
                        height: 12,
                        width: 85,
                        background: theme.skeleton[100],
                      }}
                    />
                  )}
                </TextSFProRoundedSemibold>
              </Header>
              <Card mode="shadow" className="card__app">
                <div>
                  {isFetching &&
                    [5, 6, 7, 8, 9, 4, 10].map((c) => (
                      <>
                        <div
                          key={`weather${c}`}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "24px 1fr 60px",
                            gridGap: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: 24,
                              height: 24,
                              background: theme.skeleton[100],
                            }}
                          />
                          <div
                            style={{
                              width: 91,
                              height: 17,
                              background: theme.skeleton[100],
                            }}
                          />
                          <div
                            style={{
                              width: 52,
                              height: 24,
                              display: "flex",
                              justifyContent: "end",
                              background: theme.skeleton[100],
                            }}
                          />
                        </div>
                        {c !== 10 && (
                          <Spacing
                            key={`weather_spacing${c}`}
                            className="spacing"
                            separator
                            size={16}
                          />
                        )}
                      </>
                    ))}
                  {!isFetching && forecastsJSX}
                </div>
              </Card>
            </Div>
            {stations.length !== 0 && (
              <Div>
                <Header>
                  <TextSFProRoundedSemibold>
                    {!isFetching ? (
                      <span style={{ color: theme.cardHeader }}>СТАНЦИИ</span>
                    ) : (
                      <div
                        style={{
                          height: 12,
                          width: 85,
                          background: theme.skeleton[100],
                        }}
                      />
                    )}
                  </TextSFProRoundedSemibold>
                </Header>
                <Card mode="shadow" className="card__app">
                  <div>
                    {isFetching &&
                      [5, 6, 7, 8, 9, 4, 10].map((c) => (
                        <>
                          <div
                            key={`station${c}`}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "24px 1fr 60px",
                              gridGap: "10px",
                            }}
                          >
                            <div
                              style={{
                                width: 24,
                                height: 24,
                                background: theme.skeleton[100],
                              }}
                            />
                            <div
                              style={{
                                width: 91,
                                height: 17,
                                background: theme.skeleton[100],
                              }}
                            />
                            <div
                              style={{
                                width: 52,
                                height: 24,
                                display: "flex",
                                justifyContent: "end",
                                background: theme.skeleton[100],
                              }}
                            />
                          </div>
                          {c !== 10 && (
                            <Spacing
                              key={`station_spacing${c}}`}
                              separator
                              className="spacing"
                              size={16}
                            />
                          )}
                        </>
                      ))}
                    {!isFetching && stationsJSX}
                  </div>
                </Card>
              </Div>
            )}
            <Footer style={{ paddingTop: 4, paddingLeft: 4 }}>
              <Div style={{ color: theme.gray[300] }}>
                <TextSFProRoundedSemibold>
                  Информация предоставлена
                </TextSFProRoundedSemibold>
              </Div>
              <Div>
                <img src={logo} />
              </Div>
            </Footer>
            <FixedLayout>{snackbar}</FixedLayout>
          </Group>
        </div>
      </Panel>
    );
  }
);
