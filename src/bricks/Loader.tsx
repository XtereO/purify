import React from "react";
//@ts-ignore
import loader from "../media/loader.gif";

export const Loader = React.memo(() => {
  return <img className="w-100" src={loader} />;
});
