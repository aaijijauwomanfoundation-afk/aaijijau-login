import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Otp from "./Otp.jsx";
import Dashboard from "./Dashboard.jsx";

const path = window.location.pathname;

if (path === "/otp") {
  ReactDOM.createRoot(document.getElementById("root")).render(<Otp />);
} else if (path === "/dashboard") {
  ReactDOM.createRoot(document.getElementById("root")).render(<Dashboard />);
} else {
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
}
