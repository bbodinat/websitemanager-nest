import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/nestjsx-crud";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    
    <App />
  </React.StrictMode>
);
