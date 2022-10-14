import { Card } from "@vkontakte/vkui";
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/theme";

type Props = {
  children?: React.ReactNode;
  style?: object;
  className?: string;
};

export const CustomizedCard = React.memo<Props>(
  ({ children, style, className }) => {
    const theme = useContext(ThemeContext);
    return (
      <Card
        style={{
          background: theme.card.background,
          borderRadius: 20,
          border: "none",
          boxShadow: "none",
          padding: "16px 8px",
          ...style,
        }}
        className={className}
      >
        {children}
      </Card>
    );
  }
);
