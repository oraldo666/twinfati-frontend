import React from "react";
import App from "./App";
import * as ReactDOMClient from "react-dom/client";
import { store } from "./services/reducers/store";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
