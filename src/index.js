import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./Redux/RootReducer";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: RootReducer,
});

const rootEl = document.getElementById("root");
let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
    rootEl
  );
};

if (module.hot) {
  module.hot.accept("./App", () => setTimeout(render));
}
render();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.register();
