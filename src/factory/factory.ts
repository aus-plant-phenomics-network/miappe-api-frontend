import { SchemaType } from "../components";
import { Page } from "../components/page";
import { Handler } from "../handlers";
import { RouteObject } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000/";

const createRoutes = <T extends SchemaType>(schema: T, title: string) => {
  const url = `${BASE_URL}/${title}`;
  const idKey = `${title}Id`;
  const handlers = new Handler(schema, url, idKey);
  const pages = new Page(title, schema, handlers);
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
