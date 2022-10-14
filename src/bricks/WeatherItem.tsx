import React, { memo, useContext, useMemo } from "react";
import { Cell } from "@vkontakte/vkui";
import { Badge } from "./Badge";
import { getDayOfWeek } from "../utils/getDayOfWeek";
import { Icon24ErrorCircle } from "@vkontakte/icons";
import { ThemeContext } from "../contexts/theme";

type Props = {
  day: number;
  value: any;
  mode: "danger" | "okay" | "good";
};

export const WeatherItem = memo<Props>(({ day, value, mode }) => {
  const theme = useContext(ThemeContext);
  const dayOfWeek = useMemo(() => getDayOfWeek(day), [day]);
  return (
    <div className="w-100">
      <Cell
        disabled={true}
        after={
          <div>
            <Badge value={value} color={theme[mode]} />
          </div>
        }
        before={mode === "danger" && <Icon24ErrorCircle fill={theme.danger} />}
      >
        <div>
          <div
            style={{ fontSize: 16, color: theme.gray[700] }}
            className="center__y"
          >
            {dayOfWeek}
          </div>
        </div>
      </Cell>
    </div>
  );
});
