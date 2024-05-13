// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import { theme } from "./assets/theme";
// import { ThemeProvider } from "@ailiyah-ui/context";
// import { ErrorPage } from "./routes/error";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";
// import "@ailiyah-ui/utils/src/tailwind.css";
// import {
//   InvestigationCreate,
//   InvestigationList,
//   InvestigationActions,
//   InvestigationUpdate,
// } from "./routes/investigation";
// import {
//   StudyCreate,
//   StudyList,
//   StudyUpdate,
//   StudyActions,
// } from "./routes/study";
// import {
//   DataFileCreate,
//   DataFileList,
//   DataFileUpdate,
//   DataFileActions,
// } from "./routes/dataFile";
// import {
//   VocabularyCreate,
//   VocabularyList,
//   VocabularyActions,
//   VocabularyUpdate,
// } from "./routes/vocabulary";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         errorElement: <ErrorPage />,
//         children: [
//           {
//             path: "investigation",
//             element: <InvestigationList />,
//             loader: InvestigationActions.loaderAll,
//           },
//           {
//             path: "investigation/create",
//             element: <InvestigationCreate />,
//             action: InvestigationActions.actionCreate,
//           },
//           {
//             path: "/investigation/:investigationId/",
//             element: <InvestigationUpdate />,
//             loader: InvestigationActions.loaderById,
//             action: InvestigationActions.actionUpdate,
//           },
//           {
//             path: "/investigation/:investigationId/delete",
//             element: <InvestigationUpdate />,
//             loader: InvestigationActions.loaderById,
//             action: InvestigationActions.actionDelete,
//           },
//           {
//             path: "study",
//             element: <StudyList />,
//             loader: StudyActions.loaderAll,
//           },
//           {
//             path: "study/create",
//             element: <StudyCreate />,
//             action: StudyActions.actionCreate,
//           },
//           {
//             path: "/study/:studyId/",
//             element: <StudyUpdate />,
//             loader: StudyActions.loaderById,
//             action: StudyActions.actionUpdate,
//           },
//           {
//             path: "/study/:studyId/delete",
//             element: <StudyUpdate />,
//             loader: StudyActions.loaderById,
//             action: StudyActions.actionDelete,
//           },
//           {
//             path: "dataFile",
//             element: <DataFileList />,
//             loader: DataFileActions.loaderAll,
//           },
//           {
//             path: "dataFile/create",
//             element: <DataFileCreate />,
//             action: DataFileActions.actionCreate,
//           },
//           {
//             path: "/dataFile/:dataFileId/",
//             element: <DataFileUpdate />,
//             loader: DataFileActions.loaderById,
//             action: DataFileActions.actionUpdate,
//           },
//           {
//             path: "/dataFile/:dataFileId/delete",
//             element: <DataFileUpdate />,
//             loader: DataFileActions.loaderById,
//             action: DataFileActions.actionDelete,
//           },
//           {
//             path: "vocabulary",
//             element: <VocabularyList />,
//             loader: VocabularyActions.loaderAll,
//           },
//           {
//             path: "vocabulary/create",
//             element: <VocabularyCreate />,
//             action: VocabularyActions.actionCreate,
//           },
//           {
//             path: "/vocabulary/:vocabularyId/",
//             element: <VocabularyUpdate />,
//             loader: VocabularyActions.loaderById,
//             action: VocabularyActions.actionUpdate,
//           },
//           {
//             path: "/vocabulary/:vocabularyId/delete",
//             element: <VocabularyUpdate />,
//             loader: VocabularyActions.loaderById,
//             action: VocabularyActions.actionDelete,
//           },
//           /* the rest of the routes */
//         ],
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <ThemeProvider value={theme}>
//       <RouterProvider router={router} />
//     </ThemeProvider>
//   </React.StrictMode>,
// );
