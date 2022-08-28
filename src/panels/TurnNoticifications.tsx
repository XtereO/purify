import React from "react";
import { Button, ModalCard } from "@vkontakte/vkui";
import { Icon56NotificationOutline } from "@vkontakte/icons";
import { LIGHT_BLUE } from "../consts/COLORS";
import {
  TextInterBold,
  TextInterMedium,
  TextInterRegular,
} from "../bricks/Fonts";

type Props = {
  bgApp: string;
  id: string;
  closeHandler: () => void;
  subscribeNoticification: () => void;
};

export const TurnNoticification = React.memo<Props>(
  ({ id, subscribeNoticification, bgApp, closeHandler }) => {
    return (
      <ModalCard
        id={id}
        onClose={closeHandler}
        icon={<Icon56NotificationOutline fill={LIGHT_BLUE} />}
        header={
          <div>
            <TextInterBold>Включить уведомления?</TextInterBold>
          </div>
        }
        subheader={
          <div>
            <TextInterRegular>
              <>
                Мы будем уведомлять вас об актуальном качестве воздуха раз в
                неделю, а также:
                <div style={{ marginTop: 10 }}>
                  - Если качество воздуха станет неприемлемым
                </div>
                <div style={{ marginTop: 5 }}>
                  - О резких скачках количества загрязнителей
                </div>
              </>
            </TextInterRegular>
          </div>
        }
        actions={
          <Button
            size="l"
            mode="primary"
            onClick={() => {
              subscribeNoticification();
              closeHandler();
            }}
            className="text__Inter-Medium"
          >
            <TextInterMedium>Включить</TextInterMedium>
          </Button>
        }
      />
    );
  }
);
