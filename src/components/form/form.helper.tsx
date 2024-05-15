import { theme } from "../../assets/theme";
import { BaseSchema } from "../helpers";
import { FetchDataType, SchemaElementType } from "../types";
import { createInputArray } from "./factory";
import * as Form from "./form";
import React from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@ailiyah-ui/context";
// import   { vi } from "vitest";

class TestSchema extends BaseSchema {
  studyId: SchemaElementType = { type: "select", required: true };
  releaseDate: SchemaElementType = { type: "date" };
  deviceTypeId: SchemaElementType = {
    type: "select",
    fetcherKey: "vocabulary",
    labelKey: "type",
  };
}

class StudySchema extends BaseSchema {}

class VocabularySchema extends BaseSchema {}

const FixtureData = {
  test: {
    id: "testId0",
    title: "First Test",
    description: "First Test Description",
    studyId: "studyId0",
    releaseDate: "2021-01-01T00:00:00Z",
    deviceTypeId: "vocabularyId0",
    createdAt: "2020-01-01T00:00:00",
    updatedAt: "2020-01-02T00:00:00",
  },
  study: [
    {
      id: "studyId0",
      title: "First Study",
      description: "First Study Description",
      createdAt: "2020-01-03T00:00:00",
      updatedAt: "2020-01-04T00:00:00",
    },
    {
      id: "studyId1",
      title: "Second Study",
      description: "Second Study Description",
      createdAt: "2020-01-05T00:00:00",
      updatedAt: "2020-01-06T00:00:00",
    },
  ],
  vocabulary: [
    {
      id: "vocabularyId0",
      title: "First Vocabulary",
      description: "First Vocabulary Description",
      createdAt: "2020-01-07T00:00:00",
      updatedAt: "2020-01-08T00:00:00",
    },
    {
      id: "vocabularyId1",
      title: "Second Vocabulary",
      description: "Second Vocabulary Description",
      createdAt: "2020-01-09T00:00:00",
      updatedAt: "2020-01-10T00:00:00",
    },
  ],
};

const schema = new TestSchema();

const TestComponent = ({
  schema,
  data,
}: {
  schema: BaseSchema;
  data: FetchDataType<BaseSchema>;
}) => {
  const components = createInputArray(schema, [], data);
  const routes = createMemoryRouter([
    {
      path: "/",
      element: <Form.FormComponent>{components}</Form.FormComponent>,
    },
    {
      path: "/study",
      loader: () => FixtureData.study,
    },
    {
      path: "/vocabulary",
      loader: () => FixtureData.vocabulary,
    },
  ]);
  return (
    <ThemeProvider value={theme}>
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
};

export { TestComponent, schema, FixtureData };
