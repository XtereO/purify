import { back, setActiveModal, setActivePanel } from "@blumjs/router";
import { ROUTES } from "../consts/ROUTES";

export const toOffline = (modal?: keyof typeof ROUTES) => () => {
  if (modal) {
    back({
      afterBackHandledCallback: () => {
        setActivePanel(ROUTES.OFFLINE);
      },
    });
  } else {
    setActivePanel(ROUTES.OFFLINE);
  }
};

export const toOnline = () => {
  setActivePanel(ROUTES.HOME);
};
