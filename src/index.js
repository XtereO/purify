import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./bll/store";
import { fetchData, subscribeVkBridge } from "./utils/initialVkBridge";
import { toOffline, toOnline } from "./utils/internetConnection";
import wifiImage from './media/wifi_outline_56.svg'
import { retry } from "./utils/forImage";
 
// Init VK  Mini App
subscribeVkBridge()
bridge.send("VKWebAppInit").then(res=>{
  fetchData()
})

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
if (window.location.search.includes('vk_user_id=11437372')){
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
