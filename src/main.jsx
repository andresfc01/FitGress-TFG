import React from "react";
import { createRoot } from "react-dom/client";
import { Link, Router, Route } from "react-router-dom";
import Header from "./components/header/header";
import Plantillas from "./routes/plantillas/plantillas";
import Login from "./routes/login/login";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);
