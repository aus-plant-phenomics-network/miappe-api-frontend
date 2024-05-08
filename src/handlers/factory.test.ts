import { createEchoServer } from "../mock";
import { createHandlers } from "./factory";
import { AbstractDataType, AbstractSchemaType } from "./types";
import { describe, test, expect, beforeAll, afterEach } from "vitest";

// Setup fixtures
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

const SchemaWithDate: AbstractSchemaType<TestDataWithDateType> = {
  name: { type: "text", required: true },
  submissionDate: { type: "date", required: false },
  id: { type: "text", required: false },
};

const TEST_OBJ: TestDataType = {
  name: "dummy",
};

const TEST_OBJ_WITH_ID: TestDataType = {
  ...TEST_OBJ,
  id: TEST_ID,
};

const server = createEchoServer<TestDataType>(TEST_URL, TEST_OBJ);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());

const handlers = createHandlers<TestDataType>(TEST_URL);

describe("Test createHandler", async () => {
  test("GET method returns test_obj", async () => {
    const result = await handlers.getAllData();
    expect(result).toEqual(TEST_OBJ);
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
