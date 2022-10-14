import React from "react";

type Props = {
  value: any;
  color: string;
  style?: any;
};

export const Badge = React.memo<Props>(({ value, color, style }) => {
  return (
    <span {...style} className={"badge"} style={{ background: color }}>
      {value}
    </span>
  );
});
