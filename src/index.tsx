import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import 'react-perfect-scrollbar/dist/css/styles.css';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { store } from "./store/ConfigStore";
import { BrowserRouter } from "react-router-dom";
import "holderjs";

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
