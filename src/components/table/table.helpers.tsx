import { Body, Header, Root, Table } from "./table";
import React from "react";
import {
  FetchDataArrayType,
  FetchDataSuccessType,
  SchemaElementType,
} from "../types";
import { BaseSchema } from "../helpers";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

class TestSchema extends BaseSchema {
  submissionDate: SchemaElementType = { type: "date", required: false };
}

type FixtureType = FetchDataSuccessType<TestSchema>;

const schema = new TestSchema();
const excludedKeys = ["description"];

const dataWithNoSubmissionDate: FixtureType = {
  id: "0",
  title: "first_title",
  description: "first_description",
  submissionDate: null,
  createdAt: "2020-01-01T00:00:01",
  updatedAt: "2020-02-01T00:00:02",
};

const dataWithSubmissionDate: FixtureType = {
  id: "1",
  title: "second_title",
  description: "second_description",
  submissionDate: "2020-01-05T00:00:00",
  createdAt: "2020-01-03T00:00:03",
  updatedAt: "2020-01-04T00:00:04",
};

const fetchDataFailure: FetchDataArrayType<TestSchema> = null;

const fetchDataSuccess: FetchDataArrayType<TestSchema> = [
  dataWithNoSubmissionDate,
  dataWithSubmissionDate,
];

const Components = {
  Header: ({ fields }: { fields: string[] }) => (
    <Root>
      <Header fields={fields} />
    </Root>
  ),
  Body: ({
    fields,
    fieldData,
  }: {
    fields: string[];
    fieldData: FetchDataArrayType<TestSchema>;
  }) => {
    const routes = createMemoryRouter([
      {
        path: "/",
        element: (
          <Root>
            <Body fieldData={fieldData} fields={fields} />
          </Root>
        ),
      },
    ]);
    return <RouterProvider router={routes} />;
  },
  Table: ({
    schema,
    fields,
    fieldData,
  }: {
    schema: TestSchema;
    fields: string[];
    fieldData: FetchDataArrayType<TestSchema>;
  }) => {
    const routes = createMemoryRouter([
      {
        path: "/",
        element: (
          <Table schema={schema} fields={fields} fieldData={fieldData} />
        ),
      },
    ]);
    return <RouterProvider router={routes} />;
  },
};

export { Components, schema, excludedKeys, fetchDataSuccess, fetchDataFailure };

export type { TestSchema, FixtureType };
