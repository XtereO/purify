import { AppState } from "../store";

export const getBgApp = (state: AppState) => {
  return state.initial.bgApp;
};
export const getPlatform = (state: AppState) => {
  return state.initial.platform;
};
export const getTheme = (state: AppState) => {
  return state.initial.theme;
};
