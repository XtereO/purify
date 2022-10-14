import React, { memo, useContext } from "react";
import { Cell } from "@vkontakte/vkui";
import { Badge } from "./Badge";
import { Icon12ErrorCircle } from "@vkontakte/icons";
import "./StationItem.css";
import { ThemeContext } from "../contexts/theme";
import { StationIcon } from "../icons/StationIcon";

type Props = {
  stationName: string;
  value: any;
  mode: "danger" | "okay" | "good";
  distance: number;
};

export const StationItem = memo<Props>(
  ({ value, mode, stationName, distance }) => {
    const theme = useContext(ThemeContext);
    return (
      <div style={{ fontSize: 16 }} className="w-100">
        <Cell
          disabled={true}
          after={
            <div>
              <Badge value={value} color={theme[mode]} />
            </div>
          }
        >
          <div className="d-flex">
            <div className="center__y" style={{ marginRight: 16 }}>
              <StationIcon />
            </div>
            <div>
              <div
                style={{
                  color: theme.gray[700],
                  fontSize: 16,
                  width: window.innerWidth - 182,
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {stationName}
              </div>
              <div className="text__gray">
                {distance > 10 && (
                  <div className="d-flex">
                    <div style={{ marginRight: 4 }} className="center__y">
                      <Icon12ErrorCircle fill={theme.gray[200]} />
                    </div>
                    <div className="break center__y">
                      <div
                        style={{
                          fontSize: 15,
                          color: theme.gray[300],
                          overflowWrap: "break-word",
                          width: window.innerWidth - 194,
                        }}
                      >
                        Может быть неточной
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Cell>
      </div>
    );
  }
);
