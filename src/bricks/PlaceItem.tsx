import { memo, useContext, useEffect, useMemo, useState } from "react";
import { ThemeContext } from "../contexts/theme";
import { isKrym } from "../utils/isKrym";
import { Badge } from "./Badge";

type Props = {
  city: string;
  country: string;
  value?: number;
  id: string;
  onClick: () => void;
};

export const PlaceItem = memo<Props>(
  ({ city, country, value, onClick, id }) => {
    const theme = useContext(ThemeContext);
    const bgBadge = useMemo(() => {
      if (typeof value === "number") {
        if (value >= 100) {
          return theme.danger;
        } else if (value >= 50) {
          return theme.okay;
        } else {
          return theme.good;
        }
      }
      return "";
    }, [value]);

    return (
      <div
        onClick={onClick}
        className="highlight_on_touch text__Inter-Regular"
        style={{
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: 4,
          paddingTop: 4,
          display: "grid",
          gridTemplateColumns: "1fr 50px",
        }}
      >
        <div>
          <div style={{ fontSize: 16, color: theme.gray[900] }}>{city}</div>
          <div style={{ marginTop: 6, fontSize: 15, color: theme.gray[700] }}>
            {isKrym(id) ? "Россия" : country}
          </div>
        </div>
        {value && (
          <div className="center__y">
            <Badge color={bgBadge} value={value === -1 ? 0 : value} />
          </div>
        )}
      </div>
    );
  }
);
