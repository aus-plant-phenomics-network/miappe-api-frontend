import { Params, redirect } from "react-router-dom";
import { string2Date } from "../components";
import {
  AbstractDataType,
  AbstractFormDataType,
  AbstractSchemaType,
  HandlerType,
} from "./types";

const createHandlers = <T extends AbstractDataType>(
  url: string,
): HandlerType<T> => {
  const getAllData = async (title?: string | null): Promise<Array<T>> => {
    const response = await fetch(
      title ? url + "?" + new URLSearchParams({ title: title }) : url,
    );

    if (!response.ok) {
      console.error(response);
      throw response;
    }

    const result = await response.json();
    return result as unknown as Array<T>;
  };

  const getDataById = async (id: string): Promise<T> => {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      console.error(response);
      throw response;
    }

    const result = await response.json();
    return result as unknown as T;
  };

  const createData = async (data: T): Promise<T> => {
    console.log(data);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      // console.error(response);
      throw response;
    }

    const result = await response.json();
    return result as unknown as T;
  };

  const updateData = async (data: T, id: string): Promise<T> => {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error(response);
      throw response;
    }

    const result = await response.json();
    return result as unknown as T;
  };

  const deleteData = async (id: string) => {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error(response);
      throw response;
    }
    return response;
  };

  return {
    getAllData: getAllData,
    getDataById: getDataById,
    createData: createData,
    updateData: updateData,
    deleteData: deleteData,
  };
};

const createLoaderAction = <T extends AbstractDataType, Key extends string>(
  handlers: HandlerType<T>,
  schema: AbstractSchemaType<T>,
  idKey: Key,
  createRedirect?:
    | string
    | ((request: Request, params: Params<Key>, result: T) => string),
  updateRedirect?:
    | string
    | ((request: Request, params: Params<Key>, result: T) => string),
  deleteRedirect?: string | ((params: Params<Key>) => string),
) => {
  const parseData = async (request: Request): Promise<T> => {
    const formData = await request.formData();
    const formDataObj: AbstractFormDataType<T> = Object.fromEntries(
      formData.entries(),
    ) as AbstractFormDataType<T>;

    return Object.entries(formDataObj).reduce((acc, dataEntry) => {
      const [key, value] = dataEntry;
      if (key in schema) {
        if (schema[key].type === "date") {
          acc[key] = string2Date(value);
        } else {
          acc[key] = value;
        }
      } else {
        throw new Error("Key cannot be found in schema: " + key);
      }
      return acc;
    }, {} as any) as T;
  };
  const loaderAll = async ({
    request,
  }: {
    request: Request;
  }): Promise<T[] | null> => {
    try {
      const url = new URL(request.url);
      const title = url.searchParams.get("title");
      return await handlers.getAllData(title);
    } catch (error) {
      return null;
    }
  };
  const loaderById = async ({
    params,
  }: {
    params: Params<Key>;
  }): Promise<T | null> => {
    try {
      return await handlers.getDataById(params[idKey]!);
    } catch (error) {
      return null;
    }
  };
  const actionCreate = async ({
    request,
    params,
  }: {
    request: Request;
    params: Params<Key>;
  }) => {
    const submitData = await parseData(request);
    const result = await handlers.createData(submitData);
    if (createRedirect)
      return redirect(
        typeof createRedirect === "string"
          ? createRedirect
          : createRedirect(request, params, result),
      );
    return result;
  };
  const actionUpdate = async ({
    request,
    params,
  }: {
    request: Request;
    params: Params<Key>;
  }) => {
    const submitData = await parseData(request);
    const result = await handlers.updateData(submitData, params[idKey]!);
    if (updateRedirect)
      return redirect(
        typeof updateRedirect === "string"
          ? updateRedirect
          : updateRedirect(request, params, result),
      );
    return result;
  };
  const actionDelete = async ({ params }: { params: Params<Key> }) => {
    const result = await handlers.deleteData(params[idKey]!);
    if (deleteRedirect)
      return redirect(
        typeof deleteRedirect === "string"
          ? deleteRedirect
          : deleteRedirect(params),
      );
    return result;
  };
  return {
    handlers: handlers,
    loaderAll: loaderAll,
    loaderById: loaderById,
    actionCreate: actionCreate,
    actionUpdate: actionUpdate,
    actionDelete: actionDelete,
  };
};

export { createHandlers, createLoaderAction };
