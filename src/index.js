import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./bll/store";
import { subscribeVkBridge } from "./utils/initialVkBridge";
import { toOffline, toOnline } from "./utils/internetConnection";
import wifiImage from './media/wifi_outline_56.svg'
import { retry } from "./utils/forImage";
 
// Init VK  Mini App
subscribeVkBridge()
bridge.send("VKWebAppInit");

//Check internet connection
window.addEventListener('offline',toOffline)
window.addEventListener('online',toOnline)


const AppContainer = () =>{
  return<Provider store = {store}>
    <App/>
  </Provider>
}
ReactDOM.render(<AppContainer />, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
