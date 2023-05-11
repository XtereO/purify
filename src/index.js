import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import "@vkontakte/vkui/dist/vkui.css";
import { Provider } from "react-redux";
import { store } from "./bll/store";
import { fetchData, subscribeVkBridge } from "./utils/initialVkBridge";

// Init VK  Mini App
subscribeVkBridge();
bridge
  .send("VKWebAppInit")
  .then(({ result }) => {
    console.log("bridge inited", result);
    if (result) {
      fetchData();
    }
  })
  .catch((e) => console.log("init err", e));

const AppContainer = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
ReactDOM.render(<AppContainer />, document.getElementById("root"));
//import("./eruda").then(({ default: eruda }) => {}); //runtime download
