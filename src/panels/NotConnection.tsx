import { useState, memo } from "react";
import { FixedLayout, Group, Panel } from "@vkontakte/vkui";
import { MySnackbar } from "../bricks/MySnackbar";
import { toOnline } from "../utils/internetConnection";
import {
  TextInterRegular,
  TextInterSemibold,
  TextSFProRoundedRegular,
} from "../bricks/Fonts";

type Props = {
  id: string;
  image: string;
};

export const NotConnection = memo<Props>(({ id, image }) => {
  const [snackbar, setSnackbar] = useState<any>(null);
  const tryConnectHandler = () => {
    if (navigator.onLine) {
      toOnline();
    } else {
      setSnackbar(
        <MySnackbar
          text={"Не удалось подключиться"}
          resultOperation={false}
          closeHandler={() => setSnackbar(null)}
        />
      );
    }
  };

  return (
    <Panel id={id}>
      <Group>
        <div style={{ height: window.innerHeight }} className="center__y">
          <img src={image} />
          <div style={{ fontSize: 20 }}>
            <TextInterSemibold>Нет подключения</TextInterSemibold>
          </div>
          <div
            className="center__x"
            style={{ color: "#898989", fontSize: 16, marginTop: 8 }}
          >
            <TextInterRegular>
              Проверьте соединение и повторите
            </TextInterRegular>
          </div>
          <div className="center__x" style={{ color: "#898989", fontSize: 16 }}>
            <TextInterRegular>попытку</TextInterRegular>
          </div>
          <div style={{ marginTop: 24 }}>
            <button
              style={{
                borderRadius: 10,
                color: "#4475F1",
                background: "rgba(68, 117, 241, 0.1)",
                height: 36,
                width: 176,
                border: "none",
                fontSize: 15,
              }}
              className="center__y"
              onClick={tryConnectHandler}
            >
              <TextSFProRoundedRegular>
                Повторить попытку
              </TextSFProRoundedRegular>
            </button>
          </div>
        </div>
        <FixedLayout>{snackbar}</FixedLayout>
      </Group>
    </Panel>
  );
});
