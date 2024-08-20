import { SchemaType } from "../components";
import { Handler } from ".";
import { RouteObject } from "react-router-dom";
import { Page } from "./page";

const BASE_URL = "/api";

const createRoutes = (
  schema: SchemaType,
  title: string,
  defaultColumns: string[],
) => {
  const url = `${BASE_URL}/${title}`;
  const idKey = `${title}Id`;
  const handlers = new Handler(schema, url, idKey);
  const pages = new Page(title, schema, defaultColumns, handlers);
  const DetailPage = pages.getDetailsPage();
  const CreatePage = pages.getCreatePage();
  const UpdatePage = pages.getUpdatePage();

  const routes: RouteObject[] = [
    {
      path: `/${title}`,
      loader: handlers.loaderAll,
      element: DetailPage,
    },
    {
      path: `/${title}/create`,
      action: handlers.actionCreate,
      element: CreatePage,
    },
    {
      path: `/${title}/:${idKey}`,
      loader: handlers.loaderById,
      action: handlers.actionUpdate,
      element: UpdatePage,
    },
    {
      path: `/${title}/:${idKey}/delete`,
      action: handlers.actionDelete,
    },
  ];
  return routes;
};

export { createRoutes };
