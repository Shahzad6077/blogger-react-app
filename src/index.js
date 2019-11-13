import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import WaitingPage from "./components/WaitingPage";
import * as serviceWorker from "./serviceWorker";
import { store } from "./Store/store";

const AppComp = props => (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(<AppComp />, document.getElementById("root"));
});
ReactDOM.render(<WaitingPage />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
