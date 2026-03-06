import React from "react";
import ReactDom from "react-dom/client";
import "./tailwind.css";
import { Factor } from "./factor.js";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Factor />
  </React.StrictMode>,
);
