import React, { memo, useContext, useEffect, useState } from "react";
import { Icon20Info } from "@vkontakte/icons";
import { Tooltip } from "./Tooltip";
import { ThemeContext } from "../contexts/theme";

type Props = {
  title: string;
  value: number;
  tooltipDescription: string;
  bar: string;
  aqi?: number;
};

export const PollutionItem = memo<Props>(
  ({ title, value, tooltipDescription, bar, aqi }) => {
    const theme = useContext(ThemeContext);
    const [isOpen, setOpen] = useState(false);
    const [isClosed, setClosed] = useState(false);

    const showTooltip = () => {
      setOpen(true);
    };
    useEffect(() => {
      if (isOpen) {
        setTimeout(() => {
          setClosed(true);
          setOpen(false);
          setClosed(false);
        }, 3000);
      }
      return () => {
        setClosed(true);
        setClosed(false);
      };
    }, [isOpen]);

    return (
      <div
        style={{
          paddingRight: 4,
          paddingLeft: 4,
        }}
        className="w-100 pollution__item"
      >
        <div
          style={{ fontSize: 16, overflow: "hidden", color: theme.gray[700] }}
        >
          {title}
        </div>
        <div className="center__y">
          <progress className={bar} value={aqi ? aqi : value} max={100} />
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <div
            style={{
              fontSize: 14,
              height: 20,
              overflow: "hidden",
              color: theme.gray[300],
            }}
          >
            {value} μm<sup>3</sup>
          </div>
          <div
            onClick={!isClosed ? showTooltip : () => {}}
            style={{ marginLeft: 3 }}
          >
            {!isClosed && (
              <Tooltip tooltipDescription={tooltipDescription}>
                <Icon20Info fill={theme.gray[200]} />
              </Tooltip>
            )}
            {isClosed && (
              <Tooltip tooltipDescription={tooltipDescription}>
                <Icon20Info fill={theme.gray[200]} />
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    );
  }
);
