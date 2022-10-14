import React from "react";

const light = {
  primary: "#000",
  bgApp: "#F5F5F5",
  banner: {
    color: "rgba(0, 0, 0, 0.5)",
    avatar: "rgba(255, 255, 255, 0.35)",
  },
  gray: {
    [100]: "rgba(203, 203, 203, 1)",
    [200]: "rgba(193, 193, 193, 1)",
    [300]: "rgba(160, 160, 160, 1)",
    [500]: "rgba(137, 137, 137, 1)",
    [600]: "rgba(111, 111, 111, 1)",
    [700]: "rgba(96, 96, 96, 1)",
    [900]: "rgba(69, 69, 69, 1)",
  },
  accent: {
    default: "rgba(68, 117, 241, 1)",
    icon: "rgba(28, 121, 234, 1)",
  },
  btnBlue: {
    color: "#4475F1",
    background: "rgba(68, 117, 241, 0.1)",
  },
  good: "rgba(44, 211, 81, 1)",
  okay: "rgba(255, 181, 69, 1)",
  danger: "rgba(255, 75, 75, 1)",
  tooltip: {
    background: "rgba(49, 49, 49, 0.85)",
    color: "rgba(255, 255, 255, 1)",
  },
  skeleton: {
    [100]: "rgba(235, 235, 235, 1)",
    [200]: "rgba(224, 224, 224, 1)",
  },
  card: {
    header: "rgba(129, 140, 153, 1)",
    background: "#FEFEFE",
  },
};

const dark: typeof light = {
  primary: "#fff",
  bgApp: "#373737",
  banner: {
    color: "rgba(0, 0, 0, 0.5)",
    avatar: "rgba(255, 255, 255, 0.35)",
  },
  gray: {
    [100]: "rgba(150, 150, 150, 1)",
    [200]: "rgba(179, 179, 179, 1)",
    [300]: "rgba(187, 187, 187, 1)",
    [500]: "rgba(214, 214, 214, 1)",
    [600]: "rgba(241, 241, 241, 1)",
    [700]: "rgba(241, 241, 241, 1)",
    [900]: "rgba(255, 255, 255, 1)",
  },
  accent: {
    default: "rgba(62, 149, 255, 1)",
    icon: "rgba(37, 135, 255, 1)",
  },
  btnBlue: {
    color: "#4475F1",
    background: "rgba(68, 117, 241, 0.1)",
  },
  good: "rgba(44, 211, 81, 1)",
  okay: "rgba(255, 181, 69, 1)",
  danger: "rgba(255, 75, 75, 1)",
  tooltip: {
    background: "rgba(49, 49, 49, 0.85)",
    color: "rgba(255, 255, 255, 1)",
  },
  skeleton: {
    [100]: "rgba(235, 235, 235, 1)",
    [200]: "rgba(224, 224, 224, 1)",
  },
  card: {
    header: "rgba(157, 157, 157, 1)",
    background: "#4F4F4F",
  },
};

export const theme = {
  light,
  dark,
};

export const ThemeContext = React.createContext(theme.light);
