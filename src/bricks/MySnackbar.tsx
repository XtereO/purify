import React, { useContext } from "react";
import { Snackbar } from "@vkontakte/vkui";
import { ScoreLowIcon as SuccessIcon } from "../icons/ScoreLowIcon";
import { ScroeHighIcon as FailedIcon } from "../icons/ScoreHighIcon";
import { ThemeContext } from "../contexts/theme";

type Props = {
  resultOperation: boolean;
  text: string;
  closeHandler?: () => void;
};

export const MySnackbar = React.memo<Props>(
  ({ text, resultOperation, closeHandler }) => {
    const theme = useContext(ThemeContext);
    return (
      <Snackbar
        onClose={closeHandler ? closeHandler : () => {}}
        before={resultOperation ? <SuccessIcon /> : <FailedIcon />}
      >
        <div
          className={"text__SF-Pro-Rounded-Regular"}
          style={{ fontSize: 15, color: theme.primary }}
        >
          {text}
        </div>
      </Snackbar>
    );
  }
);
