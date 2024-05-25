import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { theme } from "./assets/theme";
import { ThemeProvider } from "@ailiyah-ui/context";
import { ErrorPage } from "./routes/error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "@ailiyah-ui/utils/src/tailwind.css";
import { routes } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          ...routes,
          /* the rest of the routes */
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ThemeProvider value={theme}>
    <RouterProvider router={router} />
  </ThemeProvider>,
  // </React.StrictMode>,
);
