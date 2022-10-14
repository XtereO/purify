import { useDispatch, useSelector } from "react-redux";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  Cell,
  Div,
  Group,
  Header,
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  Search,
  Spacing,
} from "@vkontakte/vkui";
import { ListItem } from "../bricks/ListItem";
import { PlaceItem } from "../bricks/PlaceItem";
import {
  setCitiesByTitle,
  setClearestCitiesByCountryId,
} from "../bll/Reducers/pollutionCitiesReducer";
import {
  getCitiesFromSearch,
  getClearestCities,
  getFetching,
} from "../bll/Selectors/pollutionCitiesSelector";
import {
  Icon12ErrorCircle,
  Icon24Dismiss,
  Icon32PlaceOutline,
} from "@vkontakte/icons";
import { TextSFProRoundedSemibold } from "../bricks/Fonts";
import { ThemeContext } from "../contexts/theme";
import { getTheme } from "../bll/Selectors/initialSelector";
import { Skeleton } from "../bricks/Skeleton";
import { CustomizedCard } from "../bricks/CustomizedCard";

type Props = {
  id: string;
  countryId: string;
  countryName: string;
  myCity: string;
  myCityId: string;
  isAllowedPlace: boolean;
  requestPermissionLocation: () => void;
  closeHandler: () => void;
  setDefaultCity: (cityId: string) => void;
};

export const PollutionCities = React.memo<Props>(
  ({
    id,
    countryId,
    closeHandler,
    setDefaultCity,
    countryName,
    myCity,
    myCityId,
    isAllowedPlace,
    requestPermissionLocation,
  }) => {
    const dispatch = useDispatch();
    const cities = useSelector(getCitiesFromSearch);
    const clearestCities = useSelector(getClearestCities);
    const isFetching = useSelector(getFetching);

    const [title, setTitle] = useState("");
    useEffect(() => {
      dispatch(setCitiesByTitle(title.length > 2 ? title : countryName));
    }, [title]);
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    };

    useEffect(() => {
      dispatch(setClearestCitiesByCountryId(countryId));
    }, []);

    const citiesJSX =
      cities.length > 0 ? (
        cities.map((c, index) => (
          <>
            <div key={c.id} className="">
              <PlaceItem
                onClick={() => {
                  setDefaultCity(c.id);
                  closeHandler();
                }}
                city={c.name}
                {...c}
              />
            </div>
            {index + 1 !== cities.length && (
              <Spacing separator className="spacing" size={8} />
            )}
          </>
        ))
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          Ничего не найдено
        </div>
      );
    const clearestCitiesJSX =
      clearestCities.length > 0 ? (
        clearestCities.map((c, index) => (
          <>
            <div key={c.id} className="">
              <PlaceItem
                value={c.aqi ? c.aqi : -1}
                onClick={() => {
                  setDefaultCity(c.id);
                  closeHandler();
                }}
                city={c.name}
                {...c}
                country={countryName}
              />
            </div>
            {index + 1 !== cities.length && (
              <Spacing className="spacing" separator size={8} />
            )}
          </>
        ))
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          Ничего не найдено
        </div>
      );

    const theme = useContext(ThemeContext);
    const appeareance = useSelector(getTheme);
    return (
      <ModalPage
        settlingHeight={100}
        header={
          <ModalPageHeader
            className={`modal__app__${appeareance}`}
            right={
              <PanelHeaderButton onClick={closeHandler}>
                <Icon24Dismiss />
              </PanelHeaderButton>
            }
          />
        }
        id={id}
      >
        <Group style={{ background: theme.bgApp }}>
          <Search
            className={appeareance}
            value={title}
            onChange={changeHandler}
          />
          <Div>
            <CustomizedCard style={{ padding: 0, overflow: "hidden" }}>
              <Cell
                onClick={() => {
                  if (isAllowedPlace) {
                    setDefaultCity(myCityId);
                    closeHandler();
                  } else {
                    requestPermissionLocation();
                  }
                }}
              >
                <div className="card__app">
                  {!isFetching && (
                    <ListItem
                      description={
                        <div>
                          {isAllowedPlace ? (
                            <>
                              {" "}
                              <div
                                style={{ fontSize: 16, color: theme.gray[900] }}
                              >
                                {myCity}
                              </div>
                              <div style={{ fontSize: 15 }}>
                                <div style={{ color: theme.gray[700] }}>
                                  Текущее местоположение
                                </div>
                                <div>
                                  <div className="d-flex">
                                    <div
                                      style={{ height: 18, marginRight: 5 }}
                                      className="center__y"
                                    >
                                      <Icon12ErrorCircle
                                        fill={theme.gray[200]}
                                      />
                                    </div>
                                    <div
                                      style={{
                                        fontSize: 15,
                                        color: theme.gray[300],
                                      }}
                                    >
                                      Может быть неточным
                                    </div>
                                  </div>
                                </div>
                              </div>{" "}
                            </>
                          ) : (
                            <div
                              style={{
                                color: theme.accent.default,
                                fontSize: 16,
                              }}
                            >
                              <div>Разрешить доступ</div>
                              <div>к местоположению</div>
                            </div>
                          )}
                        </div>
                      }
                    >
                      <Icon32PlaceOutline className="" fill="#4475F1" />
                    </ListItem>
                  )}
                  {isFetching && (
                    <ListItem
                      description={
                        <div>
                          <Skeleton width={122} height={16} />
                          <Skeleton width={88} height={12} className="mt-1" />
                        </div>
                      }
                    >
                      <Skeleton width={24} height={24} borderRadius={20000} />
                    </ListItem>
                  )}
                </div>
              </Cell>
            </CustomizedCard>
          </Div>
          <Div>
            <Header>
              <TextSFProRoundedSemibold>
                {!isFetching ? (
                  <span style={{ color: theme.card.header }}>
                    {title.length > 0 ? "ВСЕ" : "С НИЗКИМ AQI ЗА ДЕНЬ"}
                  </span>
                ) : (
                  <Skeleton width={85} height={12} />
                )}
              </TextSFProRoundedSemibold>
            </Header>
            <CustomizedCard>
              <Group>
                {isFetching ? (
                  title.length > 0 ? (
                    <BgInitCities />
                  ) : (
                    <BgInitClearestCities />
                  )
                ) : (
                  <></>
                )}
                {!isFetching ? (
                  title.length > 0 ? (
                    citiesJSX
                  ) : (
                    clearestCitiesJSX
                  )
                ) : (
                  <></>
                )}
              </Group>
            </CustomizedCard>
          </Div>
          <Div>
            <Header>
              <TextSFProRoundedSemibold>
                {!isFetching ? (
                  <span style={{ color: theme.card.header }}>
                    {title.length > 0 ? "С НИЗКИМ AQI ЗА ДЕНЬ" : "ВСЕ"}
                  </span>
                ) : (
                  <Skeleton width={85} height={12} />
                )}
              </TextSFProRoundedSemibold>
            </Header>
            <CustomizedCard>
              <Group>
                <Group>
                  {isFetching ? (
                    title.length > 0 ? (
                      <BgInitClearestCities />
                    ) : (
                      <BgInitCities />
                    )
                  ) : (
                    <></>
                  )}
                  {!isFetching ? (
                    title.length > 0 ? (
                      clearestCitiesJSX
                    ) : (
                      citiesJSX
                    )
                  ) : (
                    <></>
                  )}
                </Group>
              </Group>
            </CustomizedCard>
          </Div>
          <Spacing size={70} />
        </Group>
      </ModalPage>
    );
  }
);

type BgClearestCitiesProps = {};
const BgInitClearestCities = React.memo<BgClearestCitiesProps>(({}) => {
  const theme = useContext(ThemeContext);
  const items = [2, 3, 4, 5, 1].map((c) => (
    <>
      <Div
        key={`clearCity${c}`}
        className="px-2"
        style={{ display: "grid", gridTemplateColumns: "1fr 50px" }}
      >
        <div>
          <Skeleton width={122} height={16} />
          <Skeleton width={88} height={12} className="mt-1" />
        </div>
        <Skeleton width={44} height={24} className="mt-1" />
      </Div>
      {c !== 1 && <Spacing className="spacing" separator size={8} />}
    </>
  ));

  return <>{items}</>;
});

type BgInitCitiesProps = {};
const BgInitCities = React.memo<BgInitCitiesProps>(({}) => {
  const items = [2, 3, 4, 5, 1].map((c) => (
    <>
      <Div key={`city${c}`} className="px-2">
        <div>
          <Skeleton width={122} height={16} />
          <Skeleton width={88} height={12} className="mt-1" />
        </div>
      </Div>
      {c !== 1 && <Spacing className="spacing" separator size={8} />}
    </>
  ));

  return <>{items}</>;
});
