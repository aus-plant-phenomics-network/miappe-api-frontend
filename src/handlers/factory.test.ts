import { createEchoServer, createErrorHandlers } from "../mock";
import { createHandlers, createLoaderAction } from "./factory";
import {
  AbstractDataType,
  AbstractFormDataType,
  AbstractSchemaType,
} from "./types";
import {
  describe,
  test,
  expect,
  beforeAll,
  afterEach,
  beforeEach,
  afterAll,
} from "vitest";

// Handler Tests
const TEST_DATE_STR = "2020-01-01";
const TEST_DATE = new Date(TEST_DATE_STR);
const TEST_URL = "http://test.com";
const ERROR_URL = "http://error.com";
const TEST_ID = "1";
interface TestDataType extends AbstractDataType {
  name: string;
  id?: string;
}

interface TestDataWithDateType extends TestDataType {
  submissionDate?: Date | null;
}

const TEST_OBJ: TestDataType = {
  name: "dummy",
};

const TEST_OBJ_WITH_ID: TestDataType = {
  ...TEST_OBJ,
  id: TEST_ID,
};

const server = createEchoServer<TestDataWithDateType>(TEST_URL, TEST_OBJ);

const handlers = createHandlers<TestDataType>(TEST_URL);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());

describe("Test createHandler", async () => {
  test("GET method returns test_obj", async () => {
    const result = await handlers.getAllData();
    expect(result).toEqual([TEST_OBJ]);
  });

  test("GET method with id returns test_obj with id", async () => {
    const result = await handlers.getDataById(TEST_ID);
    expect(result).toEqual(TEST_OBJ_WITH_ID);
  });

  test("POST method returns test_obj", async () => {
    const result = await handlers.createData(TEST_OBJ);
    expect(result).toEqual(TEST_OBJ);
  });

  test("PUT method returns test_obj", async () => {
    const result = await handlers.updateData(TEST_OBJ_WITH_ID, TEST_ID);
    expect(result).toEqual(TEST_OBJ_WITH_ID);
  });

  test("DELETE method returns nothing", async () => {
    const result = await handlers.deleteData(TEST_ID);
    expect(result.status).toBe(204);
  });
});

// ActionLoader Test

const SchemaWithDate: AbstractSchemaType<TestDataWithDateType> = {
  name: { type: "text", required: true },
  submissionDate: { type: "date", required: false },
  id: { type: "text", required: false },
};

const TEST_OBJ_WITH_DATE_STR: AbstractFormDataType<TestDataWithDateType> = {
  ...TEST_OBJ_WITH_ID,
  submissionDate: TEST_DATE_STR,
};

const TEST_OBJ_WITH_EMPTY_DATE_STR: AbstractFormDataType<TestDataWithDateType> =
  {
    ...TEST_OBJ_WITH_ID,
    submissionDate: "",
  };

const TEST_OBJ_WITH_DATE: AbstractFormDataType<TestDataWithDateType> = {
  ...TEST_OBJ_WITH_ID,
  submissionDate: TEST_DATE.toJSON(),
};

const TEST_OBJ_WITH_EMPTY_DATE: TestDataWithDateType = {
  ...TEST_OBJ_WITH_ID,
  submissionDate: null,
};

const createRequest = (testObj: AbstractFormDataType<TestDataWithDateType>) => {
  const data = new FormData();
  for (let [key, value] of Object.entries(testObj)) {
    data.append(key, value);
  }
  return new Request(TEST_URL, { body: data, method: "POST" });
};

const actionLoader = createLoaderAction<TestDataWithDateType, "id">(
  handlers,
  SchemaWithDate,
  "id"
);

describe("Test actionLoader with no redirect", async () => {
  let REQUEST_FULL_DATA: Request;
  let REQUEST_DATA_NO_DATE: Request;
  beforeEach(() => {
    REQUEST_FULL_DATA = createRequest(TEST_OBJ_WITH_DATE_STR);
    REQUEST_DATA_NO_DATE = createRequest(TEST_OBJ_WITH_EMPTY_DATE_STR);
  });
  test("test action get all returns testObj", async () => {
    const result = await actionLoader.loaderAll({ request: REQUEST_FULL_DATA });
    expect(result).toEqual([TEST_OBJ]);
  });
  test("test action get by id returns testObj", async () => {
    const result = await actionLoader.loaderById({ params: { id: TEST_ID } });
    expect(result).toEqual(TEST_OBJ_WITH_ID);
  });
  test("test create action with date string returns proper date obj", async () => {
    const result = await actionLoader.actionCreate({
      request: REQUEST_FULL_DATA,
      params: { id: TEST_ID },
    });
    expect(result).toEqual(TEST_OBJ_WITH_DATE);
  });
  test("test create action without date string returns null", async () => {
    const result = await actionLoader.actionCreate({
      request: REQUEST_DATA_NO_DATE,
      params: { id: TEST_ID },
    });
    expect(result).toEqual(TEST_OBJ_WITH_EMPTY_DATE);
  });
  test("test update action with date string returns proper date obj", async () => {
    const result = await actionLoader.actionUpdate({
      request: REQUEST_FULL_DATA,
      params: { id: TEST_ID },
    });
    expect(result).toEqual(TEST_OBJ_WITH_DATE);
  });
  test("test update action without date string returns null", async () => {
    const result = await actionLoader.actionUpdate({
      request: REQUEST_DATA_NO_DATE,
      params: { id: TEST_ID },
    });
    expect(result).toEqual(TEST_OBJ_WITH_EMPTY_DATE);
  });
  test("test delete action returns empty object", async () => {
    const result = await actionLoader.actionDelete({ params: { id: TEST_ID } });
    expect(result.status).toBe(204);
  });
});

const REDIRECT_STR = "/example";
const REDIRECT_FN = (...args: any[]) => {
  return REDIRECT_STR;
};

const actionLoaderWithRedirectString = createLoaderAction<
  TestDataWithDateType,
  "id"
>(handlers, SchemaWithDate, "id", REDIRECT_STR, REDIRECT_STR, REDIRECT_STR);

const actionLoaderWithRedirectFunction = createLoaderAction<
  TestDataWithDateType,
  "id"
>(handlers, SchemaWithDate, "id", REDIRECT_FN, REDIRECT_FN, REDIRECT_FN);

describe("Test actionLoader with redirect URL", async () => {
  let REQUEST_FULL_DATA: Request;
  beforeEach(() => {
    REQUEST_FULL_DATA = createRequest(TEST_OBJ_WITH_DATE_STR);
  });
  test("test action get all returns testObj", async () => {
    const result = await actionLoaderWithRedirectString.loaderAll({
      request: REQUEST_FULL_DATA,
    });
    expect(result).toEqual([TEST_OBJ]);
  });
  test("test action get by id returns testObj", async () => {
    const result = await actionLoaderWithRedirectString.loaderById({
      params: { id: TEST_ID },
    });
    expect(result).toEqual(TEST_OBJ_WITH_ID);
  });
  test("test create action returns redirect", async () => {
    const result = await actionLoaderWithRedirectString.actionCreate({
      request: REQUEST_FULL_DATA,
      params: { id: TEST_ID },
    });
    expect(result.status).toBe(302);
    let header = result.headers as Headers;
    expect(header.get("Location")).toBe(REDIRECT_STR);
  });
  test("test update action returns redirect", async () => {
    const result = await actionLoaderWithRedirectString.actionUpdate({
      request: REQUEST_FULL_DATA,
      params: { id: TEST_ID },
    });
    expect(result.status).toBe(302);
    let header = result.headers as Headers;
    expect(header.get("Location")).toBe(REDIRECT_STR);
  });
  test("test delete action returns redirect", async () => {
    const result = (await actionLoaderWithRedirectString.actionDelete({
      params: { id: TEST_ID },
    })) as Response;
    expect(result.status).toBe(302);
    let header = result.headers as Headers;
    expect(header.get("Location")).toBe(REDIRECT_STR);
  });
});

describe("Test actionLoader with redirect Function", async () => {
  let REQUEST_FULL_DATA: Request;
  beforeEach(() => {
    REQUEST_FULL_DATA = createRequest(TEST_OBJ_WITH_DATE_STR);
  });
  test("test action get all returns testObj", async () => {
    const result = await actionLoaderWithRedirectFunction.loaderAll({
      request: REQUEST_FULL_DATA,
    });
    expect(result).toEqual([TEST_OBJ]);
  });
  test("test action get by id returns testObj", async () => {
    const result = await actionLoaderWithRedirectFunction.loaderById({
      params: { id: TEST_ID },
    });
    expect(result).toEqual(TEST_OBJ_WITH_ID);
  });
  test("test create action returns redirect", async () => {
    const result = await actionLoaderWithRedirectFunction.actionCreate({
      request: REQUEST_FULL_DATA,
      params: { id: TEST_ID },
    });
    expect(result.status).toBe(302);
    let header = result.headers as Headers;
    expect(header.get("Location")).toBe(REDIRECT_STR);
  });
  test("test update action returns redirect", async () => {
    const result = await actionLoaderWithRedirectFunction.actionUpdate({
      request: REQUEST_FULL_DATA,
      params: { id: TEST_ID },
    });
    expect(result.status).toBe(302);
    let header = result.headers as Headers;
    expect(header.get("Location")).toBe(REDIRECT_STR);
  });
  test("test delete action returns redirect", async () => {
    const result = (await actionLoaderWithRedirectFunction.actionDelete({
      params: { id: TEST_ID },
    })) as Response;
    expect(result.status).toBe(302);
    let header = result.headers as Headers;
    expect(header.get("Location")).toBe(REDIRECT_STR);
  });
});

// Test action with errorServer

const errorLoaderAction = createLoaderAction<TestDataWithDateType, "id">(
  handlers,
  SchemaWithDate,
  "id"
);
describe("Test actionLoader with no redirect using error server", async () => {
  let REQUEST_FULL_DATA: Request;
  let REQUEST_DATA_NO_DATE: Request;
  beforeEach(() => {
    REQUEST_FULL_DATA = createRequest(TEST_OBJ_WITH_DATE_STR);
    REQUEST_DATA_NO_DATE = createRequest(TEST_OBJ_WITH_EMPTY_DATE_STR);
    server.use(...createErrorHandlers(TEST_URL));
  });
  test("test action get all returns undefined", async () => {
    const result = await errorLoaderAction.loaderAll({
      request: REQUEST_FULL_DATA,
    });
    expect(result).toBeNull();
  });
  test("test action get by id returns undefined", async () => {
    const result = await errorLoaderAction.loaderById({
      params: { id: TEST_ID },
    });
    expect(result).toBeNull();
  });
  test("test create action with date string throws error", async () => {
    await expect(
      errorLoaderAction.actionCreate({
        request: REQUEST_FULL_DATA,
        params: { id: TEST_ID },
      })
    ).rejects.toThrowError();
  });
  test("test create action without date string throws error", async () => {
    await expect(
      errorLoaderAction.actionCreate({
        request: REQUEST_DATA_NO_DATE,
        params: { id: TEST_ID },
      })
    ).rejects.toThrowError();
  });
  test("test update action with date string throws error", async () => {
    await expect(
      errorLoaderAction.actionUpdate({
        request: REQUEST_FULL_DATA,
        params: { id: TEST_ID },
      })
    ).rejects.toThrowError();
  });
  test("test update action without date string throws error", async () => {
    await expect(
      errorLoaderAction.actionUpdate({
        request: REQUEST_DATA_NO_DATE,
        params: { id: TEST_ID },
      })
    ).rejects.toThrowError();
  });
  test("test delete action returns empty object", async () => {
    await expect(
      errorLoaderAction.actionDelete({
        params: { id: TEST_ID },
      })
    ).rejects.toThrow();
  });
});
