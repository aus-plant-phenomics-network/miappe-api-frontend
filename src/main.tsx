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
import {
  InvestigationCreate,
  InvestigationList,
  InvestigationActions,
  InvestigationUpdate,
} from "./routes/investigation";
import {
  StudyCreate,
  StudyList,
  StudyUpdate,
  StudyActions,
} from "./routes/study";

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
            path: "investigation",
            element: <InvestigationList />,
            loader: InvestigationActions.loaderAll,
          },
          {
            path: "investigation/create",
            element: <InvestigationCreate />,
            action: InvestigationActions.actionCreate,
          },
          {
            path: "/investigation/:investigationId/",
            element: <InvestigationUpdate />,
            loader: InvestigationActions.loaderById,
            action: InvestigationActions.actionUpdate,
          },
          {
            path: "/investigation/:investigationId/delete",
            element: <InvestigationUpdate />,
            loader: InvestigationActions.loaderById,
            action: InvestigationActions.actionDelete,
          },
          {
            path: "study",
            element: <StudyList />,
            loader: StudyActions.loaderAll,
          },
          {
            path: "study/create",
            element: <StudyCreate />,
            action: StudyActions.actionCreate,
          },
          {
            path: "/study/:studyId/",
            element: <StudyUpdate />,
            loader: StudyActions.loaderById,
            action: StudyActions.actionUpdate,
          },
          {
            path: "/study/:studyId/delete",
            element: <StudyUpdate />,
            loader: StudyActions.loaderById,
            action: StudyActions.actionDelete,
          },

          /* the rest of the routes */
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider value={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
