import React, { Fragment, ReactElement, useContext } from "react";
import {
  Div,
  Spacing,
  Group,
  ModalPage,
  ModalPageHeader,
  Button,
} from "@vkontakte/vkui";
import "./Intro.css";
import { Icon28NarrativeOutline } from "@vkontakte/icons";
import { Icon28Notifications } from "@vkontakte/icons";
import { Icon28StoryOutline } from "@vkontakte/icons";
import { Icon24LocationOutline } from "@vkontakte/icons";
import { getTheme } from "../bll/Selectors/initialSelector";
import { useSelector } from "react-redux";
import { ThemeContext } from "../contexts/theme";

type IntroProps = {
  id: string;
  closeHandler: () => void;
  checkIntro: () => void;
  requestPermissionLocation: () => void;
};

export const Intro = React.memo<IntroProps>(
  ({ id, closeHandler, checkIntro, requestPermissionLocation }) => {
    const appeareance = useSelector(getTheme);
    const theme = useContext(ThemeContext);
    return (
      <ModalPage
        id={id}
        onClose={closeHandler}
        header={
          <ModalPageHeader
            className={`modal__app__${appeareance}`}
          ></ModalPageHeader>
        }
      >
        <div style={{ background: theme.bgApp }}>
          <Fragment>
            <Group>
              <Div className="center__x text__big" style={{color: theme.gray[700]}}>
                Добро пожаловать в Purify
              </Div>
              <Div>
                <InfoBlock
                  icon={<Icon28NarrativeOutline fill={theme.accent.icon} />}
                  description={
                    "Просматривайте актуальную статистику и получайте важные советы, чтобы сберечь здоровье. "
                  }
                  title={"Следите за качеством воздуха"}
                />
                <InfoBlock
                  icon={<Icon28Notifications fill={theme.accent.icon} />}
                  description={
                    "Получайте уведомления, чтобы заранее знать об изменениях в худшую сторону."
                  }
                  title={"Будьте в курсе"}
                />
                <InfoBlock
                  icon={<Icon28StoryOutline fill={theme.accent.icon} />}
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
                style={{ background: theme.accent.icon }}
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
              style={{
                paddingTop: 15,
                paddingBottom: 15,
                color: theme.gray[300],
              }}
              className="w-100 highlight_on_touch center__x"
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
  const theme = useContext(ThemeContext);
  return (
    <Div className="intro__info">
      <div className="center__y">{icon}</div>
      <Div>
        <div style={{ color: theme.gray[700] }}>
          <strong>{title}</strong>
        </div>
        <div style={{ color: theme.gray[500] }}>{description}</div>
      </Div>
    </Div>
  );
});
