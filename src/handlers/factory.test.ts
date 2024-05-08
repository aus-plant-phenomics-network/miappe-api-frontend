import { createEchoServer } from "../mock";
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
} from "vitest";

// Handler Tests
const TEST_DATE_STR = "2020-01-01";
const TEST_DATE = new Date(TEST_DATE_STR);
const TEST_URL = "http://test.com";
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

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());

const handlers = createHandlers<TestDataType>(TEST_URL);

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
    expect(result).toEqual({});
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
  TEST_URL,
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
    const result = await actionLoader.loaderAll();
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
});
