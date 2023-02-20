import React from "react";
import ReactDOM from "react-dom/client";
import "./boot.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "react-hook-theme";
import { Toggle } from "react-hook-theme";
import "react-hook-theme/dist/styles/style.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider
    options={{
      theme: "dark",
      save: true,
    }}
  >
    <App />
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
