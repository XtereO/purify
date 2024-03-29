import { ReactElement, memo } from "react";
import "./Tooltip.css";

type Props = {
  tooltipDescription: string;
  children: ReactElement<any, any>;
};

export const Tooltip = memo<Props>(({ tooltipDescription, children }) => {
  return (
    <div
      //@ts-ignore
      tooltip={tooltipDescription}
      tooltip-position={"bottom"}
      style={{ padding: 0, margin: 0 }}
    >
      {children}
    </div>
  );
});
