import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga4";

import "./index.css";
import App from "./App";

// Google Analytics Initialize
ReactGA.initialize("G-L8KLY89C3X");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);