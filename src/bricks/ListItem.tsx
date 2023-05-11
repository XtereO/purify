import { memo, ReactElement, useContext } from "react";
import { ThemeContext } from "../contexts/theme";

type Props = {
  description: string | ReactElement<any, any>;
  className?: string;
  children?: ReactElement<any, any>;
  onClick?: () => void;
};

export const ListItem = memo<Props>(
  ({ description, onClick, className, children }) => {
    const theme = useContext(ThemeContext);
    return (
      <div
        onClick={onClick ? onClick : () => {}}
        style={{
          display: "flex",
          color: theme.gray[600],
          cursor: onClick ? "pointer" : "default"
        }}
      >
        <div
          className={className ?? "center__y"}
          style={{ paddingRight: 16, paddingLeft: 8 }}
        >
          {children}
        </div>
        <div className="center__y">{description}</div>
      </div>
    );
  }
);
