const SET_PLATFORM: "initialReducer/SET_PLATFORM" =
  "initialReducer/SET_PLATFORM";
const SET_BG_APP: "initialReducer/SET_BG_APP" = "initialReducer/SET_BG_APP";
const SET_ACTIVE_PANEL: "initialReducer/SET_ACTIVE_PANEL" =
  "initialReducer/SET_ACTIVE_PANEL";
const SET_ACTIVE_MODAL: "initialReducer/SET_ACTIVE_MODAL" =
  "initialReducer/SET_ACTIVE_MODAL";
const SET_THEME: "initialReducer/SET_THEME" = "initialReducer/SET_THEME";

type Platform = "mobile" | "pc";
type BgApp = "bg__app__light" | "bg__app__dark";
type Theme = "light" | "dark";

const initialState = {
  platform: "mobile" as Platform,
  bgApp: "bg__app__light" as BgApp,
  theme: "light" as Theme,
  activeModal: null as string | null,
  activePanel: "HOME" as string | null,
};
type InitialState = typeof initialState;

type Action =
  | SetBgApp
  | SetPlatform
  | SetActiveModal
  | SetActivePanel
  | SetTheme;

export const initialReducer = (
  state = initialState,
  action: Action
): InitialState => {
  switch (action.type) {
    case SET_PLATFORM:
    case SET_BG_APP:
    case SET_ACTIVE_MODAL:
    case SET_ACTIVE_PANEL:
    case SET_THEME:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

type SetTheme = {
  type: typeof SET_THEME;
  payload: {
    theme: Theme;
  };
};
export const setTheme = (theme: Theme): SetTheme => {
  return {
    type: SET_THEME,
    payload: {
      theme,
    },
  };
};

type SetActivePanel = {
  type: typeof SET_ACTIVE_PANEL;
  payload: {
    activePanel: string;
  };
};
export const setActivePanelState = (activePanel: string): SetActivePanel => {
  return {
    type: SET_ACTIVE_PANEL,
    payload: {
      activePanel,
    },
  };
};

type SetActiveModal = {
  type: typeof SET_ACTIVE_MODAL;
  payload: {
    activeModal: string;
  };
};
export const setActiveModalState = (activeModal: string): SetActiveModal => {
  return {
    type: SET_ACTIVE_MODAL,
    payload: {
      activeModal,
    },
  };
};

type SetPlatform = {
  type: typeof SET_PLATFORM;
  payload: {
    platform: Platform;
  };
};
export const setPlatform = (platform: Platform): SetPlatform => {
  return {
    type: SET_PLATFORM,
    payload: {
      platform,
    },
  };
};

type SetBgApp = {
  type: typeof SET_BG_APP;
  payload: {
    bgApp: BgApp;
  };
};
export const setBgApp = (bgApp: BgApp): SetBgApp => {
  return {
    type: SET_BG_APP,
    payload: {
      bgApp,
    },
  };
};
