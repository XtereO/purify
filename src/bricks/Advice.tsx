import React from "react";
import { Card, Spacing } from "@vkontakte/vkui";
import { LIGHT_BLUE } from "../consts/COLORS";
import { ListItem } from "./ListItem";
//@ts-ignore
import mask from "../media/mask.svg";
//@ts-ignore
import windowSVG from "../media/window.svg";
//@ts-ignore
import score_high from "../media/score_high.svg";
//@ts-ignore
import score_low from "../media/score_low.svg";
import { Icon28LikeOutline, Icon28StoryOutline } from "@vkontakte/icons";

type Props = {
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
  isGoodWind: boolean;
  bgApp: string;
  doStory: () => void;
};

export const Advice = React.memo<Props>(
  ({ isGoodWind, pollution, bgApp, doStory }) => {
    return (
      <Card mode="shadow" className="card__app">
        <div>
          <div style={{ marginLeft: 3.5 }}>
            <ListItem
              bgApp={bgApp}
              description={
                isGoodWind ? (
                  "Качество воздуха хорошее и соответствует требованиям ООН. Наслаждайтесь."
                ) : (
                  <span>
                    Качество воздуха плохое и превышает требования ООН.
                  </span>
                )
              }
            >
              {isGoodWind ? <img src={score_low} /> : <img src={score_high} />}
            </ListItem>
          </div>
          {pollution.mask.value !== "green" &&
            pollution.mask.value !== "hidden" && (
              <>
                <Spacing className="spacing" size={32} separator />
                <ListItem bgApp={bgApp} description={"Носите маску на улице."}>
                  <img src={mask} />
                </ListItem>
              </>
            )}
          {pollution.windows.value !== "hidden" && (
            <>
              <Spacing size={32} separator className="spacing" />
              <ListItem
                bgApp={bgApp}
                description={
                  pollution.windows.value !== "green"
                    ? "Закройте окна."
                    : "Откройте окна и проветрите помещение свежим воздухом."
                }
              >
                <div style={{ width: 28 }} className="center__x">
                  <img src={windowSVG} />
                </div>
              </ListItem>
            </>
          )}
          {pollution.exercice.value !== "hidden" && (
            <>
              <Spacing size={32} className="spacing" separator />
              <ListItem
                bgApp={bgApp}
                description={
                  pollution.exercice.value !== "green"
                    ? "Избегайте нагрузок на улице."
                    : "Хорошее время для тренировки."
                }
              >
                <Icon28LikeOutline fill={LIGHT_BLUE} />
              </ListItem>
            </>
          )}
          <>
            <Spacing className="spacing" size={32} separator />
            <ListItem
              onClick={doStory}
              bgApp={bgApp}
              description={
                <div style={{ color: LIGHT_BLUE }}>
                  <div>Сообщите друзьям и близким</div>
                  <div>Поделитесь историей</div>
                </div>
              }
            >
              <Icon28StoryOutline fill={LIGHT_BLUE} />
            </ListItem>
          </>
        </div>
      </Card>
    );
  }
);
