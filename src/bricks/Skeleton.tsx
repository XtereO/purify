import React, { useContext } from "react";
import { ThemeContext } from "../contexts/theme";

type Props = {
  width: number;
  height: number;
  borderRadius?: number;
  className?: string;
  background?: string;
  children?: React.ReactNode;
};

export const Skeleton = React.memo<Props>(
  ({ width, height, background, borderRadius, className, children }) => {
    const theme = useContext(ThemeContext);
    return (
      <div
        className={className}
        style={{
          width,
          height,
          borderRadius: borderRadius ?? 25,
          margin: 5,
          background: background ?? theme.skeleton[100],
        }}
      >
        {children}
      </div>
    );
  }
);
