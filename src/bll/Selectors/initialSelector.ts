import { AppState } from "../store";

export const getBgApp = (state: AppState) => {
  return state.initial.bgApp;
};
export const getPlatform = (state: AppState) => {
  return state.initial.platform;
};
export const getActivePanel = (state: AppState) => {
  return state.initial.activePanel;
};
export const getActiveModal = (state: AppState) => {
  return state.initial.activeModal;
};
export const getTheme = (state: AppState) => {
  return state.initial.theme;
};
