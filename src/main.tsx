import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ErrorPage } from "./routes/error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import "./index.css";

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
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
