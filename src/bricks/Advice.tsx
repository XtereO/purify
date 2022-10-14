import React, { useContext } from "react";
import { Spacing } from "@vkontakte/vkui";
import { ListItem } from "./ListItem";
import { MaskIcon } from "../icons/MaskIcon";
import { WindowIcon } from "../icons/WindowIcon";
import { ScoreLowIcon } from "../icons/ScoreLowIcon";
import { ScroeHighIcon } from "../icons/ScoreHighIcon";
import { Icon28LikeOutline, Icon28StoryOutline } from "@vkontakte/icons";
import { ThemeContext } from "../contexts/theme";
import { CustomizedCard } from "./CustomizedCard";

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
  doStory: () => void;
};

export const Advice = React.memo<Props>(
  ({ isGoodWind, pollution, doStory }) => {
    const theme = useContext(ThemeContext);
    return (
      <CustomizedCard>
        <div>
          <div style={{ marginLeft: 3.5 }}>
            <ListItem
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
              {isGoodWind ? <ScoreLowIcon /> : <ScroeHighIcon />}
            </ListItem>
          </div>
          {pollution.mask.value !== "green" &&
            pollution.mask.value !== "hidden" && (
              <>
                <Spacing className="spacing" size={32} separator />
                <ListItem description={"Носите маску на улице."}>
                  <MaskIcon />
                </ListItem>
              </>
            )}
          {pollution.windows.value !== "hidden" && (
            <>
              <Spacing size={32} separator className="spacing" />
              <ListItem
                description={
                  pollution.windows.value !== "green"
                    ? "Закройте окна."
                    : "Откройте окна и проветрите помещение свежим воздухом."
                }
              >
                <div style={{ width: 28 }} className="center__x">
                  <WindowIcon />
                </div>
              </ListItem>
            </>
          )}
          {pollution.exercice.value !== "hidden" && (
            <>
              <Spacing size={32} className="spacing" separator />
              <ListItem
                description={
                  pollution.exercice.value !== "green"
                    ? "Избегайте нагрузок на улице."
                    : "Хорошее время для тренировки."
                }
              >
                <Icon28LikeOutline fill={theme.accent.icon} />
              </ListItem>
            </>
          )}
          <>
            <Spacing className="spacing" size={32} separator />
            <ListItem
              onClick={doStory}
              description={
                <div style={{ color: theme.accent.default }}>
                  <div>Сообщите друзьям и близким</div>
                  <div>Поделитесь историей</div>
                </div>
              }
            >
              <Icon28StoryOutline fill={theme.accent.icon} />
            </ListItem>
          </>
        </div>
      </CustomizedCard>
    );
  }
);
