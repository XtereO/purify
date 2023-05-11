import {
  Group,
  Panel,
  Div,
  Avatar,
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
import { ThemeContext } from "../contexts/theme";
import { Skeleton } from "../bricks/Skeleton";
import { CustomizedCard } from "../bricks/CustomizedCard";
import { getTheme } from "../bll/Selectors/initialSelector";

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
    const appearance = useSelector(getTheme);
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
            <div key={`${index}${c.name}`}>
              <StationItem
                distance={getDistance({
                  point1: c.coordinates,
                  point2: city.coordinates,
                })}
                stationName={c.name}
                value={c.aqi}
                mode={c.aqi >= 100 ? "danger" : c.aqi >= 50 ? "okay" : "good"}
              />
              {index + 1 !== stations.length && (
                <Spacing
                  key={`station_spacing${index}`}
                  className="spacing"
                  size={16}
                />
              )}
            </div>
          ))
        : [];

    const pollutantsJSX = city
      ? city.current.pollutants.map((p, index) => (
          <div key={`${index}${p.pollutantName}`}>
            <PollutionItem
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
                size={32}
              />
            )}
          </div>
        ))
      : [];

    const currentDay = new Date().getDay();
    const forecastsJSX = city
      ? city.forecasts.daily.map((c, index) => (
          <div key={`${index}-${c.temperature}${c.aqi}`}>
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
                size={16}
              />
            )}
          </div>
        ))
      : [];

    return (
      <Panel id={id}>
        <div style={{ width: "100%", overflow: "hidden" }}>
          <div>
            <PanelHeader className={appearance} separator={false} />
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
                  <Skeleton
                    width={61}
                    height={24}
                    background={theme.skeleton[200]}
                  />
                ) : (
                  <div
                    style={{
                      fontSize: 24,
                      lineHeight: 2.2,
                      color: theme.banner.color,
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
                      <Skeleton
                        height={16}
                        width={97}
                        className="mt-1"
                        background={theme.skeleton[200]}
                      />
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
                      <Avatar style={{ backgroundColor: theme.banner.avatar }}>
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
                      <Avatar style={{ backgroundColor: theme.banner.avatar }}>
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
                <CustomizedCard>
                  <div className="d-flex">
                    <Skeleton height={24} width={24} borderRadius={20000} />
                    <Skeleton className="ml-2" height={17} width={122} />
                  </div>
                </CustomizedCard>
              )}
            </Div>
            {(pollutantsJSX.length > 0 || isFetching) && (
              <Div>
                <Header>
                  <TextSFProRoundedSemibold>
                    {!isFetching ? (
                      <span
                        style={{ color: theme.card.header }}
                        className="unselectable"
                      >
                        ЗАГРЯЗНИТЕЛИ
                      </span>
                    ) : (
                      <Skeleton height={12} width={85} />
                    )}
                  </TextSFProRoundedSemibold>
                </Header>
                <CustomizedCard>
                  <div className="card__app">
                    {isFetching &&
                      [3, 2, 1, 0].map((c) => (
                        <div key={`pollutant${c}`}>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 50px",
                            }}
                          >
                            <Skeleton width={91} height={17} />
                            <Skeleton width={24} height={24} />
                          </div>
                          {c !== 0 && (
                            <Spacing
                              key={`pollutant_key${c}`}
                              className="spacing"
                              size={32}
                            />
                          )}
                        </div>
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
                </CustomizedCard>
              </Div>
            )}
            {(forecastsJSX.length > 0 || isFetching) && (
              <Div>
                <Header>
                  <TextSFProRoundedSemibold>
                    {!isFetching ? (
                      <span
                        style={{ color: theme.card.header }}
                        className="unselectable"
                      >
                        ПРОГНОЗ НА НЕДЕЛЮ
                      </span>
                    ) : (
                      <Skeleton height={12} width={85} />
                    )}
                  </TextSFProRoundedSemibold>
                </Header>
                <CustomizedCard>
                  <div>
                    {isFetching &&
                      [5, 6, 7, 8, 9, 4, 10].map((c) => (
                        <div key={`weather${c}`}>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "24px 1fr 60px",
                              gridGap: "10px",
                            }}
                          >
                            <Skeleton width={24} height={24} />
                            <Skeleton width={91} height={17} />
                            <Skeleton width={52} height={24} />
                          </div>
                          {c !== 10 && (
                            <Spacing
                              key={`weather_spacing${c}`}
                              className="spacing"
                              size={16}
                            />
                          )}
                        </div>
                      ))}
                    {!isFetching && forecastsJSX}
                  </div>
                </CustomizedCard>
              </Div>
            )}
            {(stationsJSX.length > 0 || isFetching) && (
              <Div>
                <Header>
                  <TextSFProRoundedSemibold>
                    {!isFetching ? (
                      <span style={{ color: theme.card.header }}>СТАНЦИИ</span>
                    ) : (
                      <Skeleton height={12} width={85} />
                    )}
                  </TextSFProRoundedSemibold>
                </Header>
                <CustomizedCard>
                  <div>
                    {isFetching &&
                      [5, 6, 7, 8, 9, 4, 10].map((c) => (
                        <div key={`station${c}`}>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "24px 1fr 60px",
                              gridGap: "10px",
                            }}
                          >
                            <Skeleton width={24} height={24} />
                            <Skeleton width={91} height={17} />
                            <Skeleton width={52} height={24} />
                          </div>
                          {c !== 10 && (
                            <Spacing
                              key={`station_spacing${c}}`}
                              className="spacing"
                              size={16}
                            />
                          )}
                        </div>
                      ))}
                    {!isFetching && stationsJSX}
                  </div>
                </CustomizedCard>
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
