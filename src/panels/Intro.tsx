import React, { Fragment, ReactElement } from "react";
import {
  Div,
  Spacing,
  Group,
  ModalPage,
  ModalPageHeader,
  Button,
} from "@vkontakte/vkui";
import "./Intro.css";
import { LIGHT_BLUE } from "../consts/COLORS";
import { Icon28NarrativeOutline } from "@vkontakte/icons";
import { Icon28Notifications } from "@vkontakte/icons";
import { Icon28StoryOutline } from "@vkontakte/icons";
import { Icon24LocationOutline } from "@vkontakte/icons";

type IntroProps = {
  id: string;
  bgApp: string;
  closeHandler: () => void;
  checkIntro: () => void;
  requestPermissionLocation: () => void;
};

export const Intro = React.memo<IntroProps>(
  ({ id, bgApp, closeHandler, checkIntro, requestPermissionLocation }) => {
    return (
      <ModalPage
        id={id}
        onClose={closeHandler}
        header={
          <ModalPageHeader
            className={
              bgApp === "bg__app__light"
                ? "modal__app__light"
                : "modal__app__dark"
            }
          ></ModalPageHeader>
        }
      >
        <div className={bgApp}>
          <Fragment>
            <Group>
              <Div className="center__x text__big">
                Добро пожаловать в Purify
              </Div>
              <Div>
                <InfoBlock
                  icon={<Icon28NarrativeOutline fill={LIGHT_BLUE} />}
                  description={
                    "Просматривайте актуальную статистику и получайте важные советы, чтобы сберечь здоровье. "
                  }
                  title={"Следите за качеством воздуха"}
                />
                <InfoBlock
                  icon={<Icon28Notifications fill={LIGHT_BLUE} />}
                  description={
                    "Получайте уведомления, чтобы заранее знать об изменениях в худшую сторону."
                  }
                  title={"Будьте в курсе"}
                />
                <InfoBlock
                  icon={<Icon28StoryOutline fill={LIGHT_BLUE} />}
                  description={
                    "Информируйте их в критических ситуациях через истории ВКонтакте."
                  }
                  title={"Сообщайте близким"}
                />
              </Div>
            </Group>
            <Div className="center__x">
              <Button
                size="l"
                onClick={() => {
                  requestPermissionLocation();
                  closeHandler();
                }}
                className="intro__button__location"
                style={{ background: LIGHT_BLUE }}
                before={<Icon24LocationOutline />}
              >
                Разрешить доступ к местоположению
              </Button>
            </Div>
            <div
              onClick={() => {
                checkIntro();
                closeHandler();
              }}
              style={{ paddingTop: 15, paddingBottom: 15 }}
              className="w-100 highlight_on_touch center__x text__gray"
            >
              Пропустить
            </div>
            <Spacing size={80} />
          </Fragment>
        </div>
      </ModalPage>
    );
  }
);

type InfoBlockProps = {
  description: string;
  title: string;
  icon: ReactElement<any, any>;
};

const InfoBlock = React.memo<InfoBlockProps>(({ description, title, icon }) => {
  return (
    <Div className="intro__info">
      <div className="center__y">{icon}</div>
      <Div>
        <div>
          <strong>{title}</strong>
        </div>
        <div className="text__gray">{description}</div>
      </Div>
    </Div>
  );
});
