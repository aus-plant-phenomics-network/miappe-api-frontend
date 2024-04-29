import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { theme } from "./assets/theme.ts";
import { ThemeProvider } from "@ailiyah-ui/context";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider value={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
