import React, { useContext } from "react";
import { ThemeContext } from "../contexts/theme";

export const MaskIcon = React.memo(() => {
  const theme = useContext(ThemeContext);
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 11.5L11.9144 11.0823C12.0993 11.0277 12.296 11.0277 12.4809 11.0823L13.8953 11.5M12.1976 21C6.76261 21 4.57922 17.3609 3.72486 14.4062C3.15111 12.4219 4.52147 10.558 6.48106 9.90483L10.6801 8.50515C11.6651 8.1768 12.7301 8.1768 13.7152 8.50515L17.9142 9.90483C19.8738 10.558 21.253 12.4217 20.693 14.4099C19.861 17.364 17.6998 21 12.1976 21Z"
        stroke={theme.accent.icon}
        strokeWidth="1.7a"
        strokeLinecap="round"
      />
      <path
        d="M20.5957 11.8042C22.5953 10.6045 24.1949 6.40547 21.7955 5.20575C20.0988 4.35741 18.5962 6.20551 17.5964 9.40477"
        stroke={theme.accent.icon}
        strokeWidth="1.7"
      />
      <path
        d="M4.40425 12.1983C2.40472 10.9986 0.805083 6.79958 3.20453 5.59986C4.90121 4.75152 6.40379 6.59962 7.40356 9.79888"
        stroke={theme.accent.icon}
        strokeWidth="1.7"
      />
    </svg>
  );
});
