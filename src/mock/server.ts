import { setupServer } from "msw/node";
import { createEchoHandlers } from "./handler";
import { AbstractDataType } from "../handlers";

const createEchoServer = <T extends AbstractDataType>(
  url: string,
  mockGetObj: T,
) => {
  const handlers = createEchoHandlers<T>(url, mockGetObj);
  return setupServer(...handlers);
};

export { createEchoServer };
