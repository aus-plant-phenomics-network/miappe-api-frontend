import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { theme } from "./assets/theme.ts";
import { ThemeProvider } from "@ailiyah-ui/context";
import ErrorPage from "./routes/error.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "@ailiyah-ui/utils/src/tailwind.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "investigation/",
            element: <App/>,
          },
          /* the rest of the routes */
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider value={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
