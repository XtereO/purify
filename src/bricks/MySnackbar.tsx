import React from "react";
import { Snackbar } from "@vkontakte/vkui";
//@ts-ignore
import success_img from "../media/score_low.svg";
//@ts-ignore
import failed_img from "../media/score_high.svg";

type Props = {
  resultOperation: boolean;
  text: string;
  closeHandler?: () => void;
};

export const MySnackbar = React.memo<Props>(
  ({ text, resultOperation, closeHandler }) => {
    return (
      <Snackbar
        onClose={closeHandler ? closeHandler : () => {}}
        before={<img src={resultOperation ? success_img : failed_img} />}
      >
        <div
          className={"text__SF-Pro-Rounded-Regular"}
          style={{ fontSize: 15 }}
        >
          {text}
        </div>
      </Snackbar>
    );
  }
);
