import { expect } from "vitest";
import { screen } from "@testing-library/react";
import { Body, BodyRow, Header, Root } from "./table";
import React from "react";
import {
  FetchDataArrayType,
  FetchDataSuccessType,
  FetchDataType,
  SchemaElementType,
  SchemaType,
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
};

const dataWithSubmissionDate: FixtureType = {
  id: "1",
  title: "second_title",
  description: "second_description",
  submissionDate: "2020-01-01T00:00:00",
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
            <Header fields={fields} />
            <Body fieldData={fieldData} fields={fields} />
          </Root>
        ),
      },
    ]);
    return <RouterProvider router={routes} />;
  },
};

export { Components, schema, excludedKeys, fetchDataSuccess, fetchDataFailure };

export type { TestSchema, FixtureType };
