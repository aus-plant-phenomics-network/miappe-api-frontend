import { theme } from "../../assets/theme";
import { BaseSchema, parseFormData } from "../helpers";
import { FetchDataType, SchemaElementType } from "../types";
import { createInputArray } from "./factory";
import * as Form from "./form";
import React from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@ailiyah-ui/context";

class TestSchema extends BaseSchema {
  studyId: SchemaElementType = {
    type: "select",
    required: true,
    fetcherKey: "study",
    labelKey: "study",
    multiple: true,
  };
  releaseDate: SchemaElementType = { type: "date" };
  deviceTypeId: SchemaElementType = {
    type: "select",
    fetcherKey: "vocabulary",
    labelKey: "type",
  };
  testId: SchemaElementType = {
    type: "select",
    required: true,
    fetcherKey: "test",
    labelKey: "test",
    multiple: true,
  };
}

const FixtureData = {
  test: {
    id: "testId0",
    title: "First Test",
    description: "First Test Description",
    studyId: ["studyId1"],
    releaseDate: "2021-01-01T00:00:00Z",
    deviceTypeId: "vocabularyId0",
    createdAt: "2020-01-01T00:00:00",
    updatedAt: "2020-01-02T00:00:00",
    testId: ["testId1", "testId2"],
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
  testFixture: [
    {
      id: "testId0",
      title: "First Test",
      description: "First Test Description",
      studyId: ["studyId1"],
      releaseDate: "2021-01-01T00:00:00Z",
      deviceTypeId: "vocabularyId0",
      createdAt: "2020-01-01T00:00:00",
      updatedAt: "2020-01-02T00:00:00",
      testId: ["testId1", "testId2"],
    },
    {
      id: "testId1",
      title: "Second Test",
      description: "Second Test Description",
      studyId: ["studyId0"],
      releaseDate: "2021-01-01T00:00:00Z",
      deviceTypeId: "vocabularyId1",
      createdAt: "2020-01-01T00:00:00",
      updatedAt: "2020-01-02T00:00:00",
      testId: [],
    },
    {
      id: "testId2",
      title: "Third Test",
      description: "Third Test Description",
      studyId: ["studyId1"],
      releaseDate: "2021-01-01T00:00:00Z",
      deviceTypeId: "vocabularyId1",
      createdAt: "2020-01-01T00:00:00",
      updatedAt: "2020-01-02T00:00:00",
      testId: [],
    },
  ],
};

const schema = new TestSchema();

const TestComponent = ({
  schema,
  data,
  onSubmit = (e: React.FormEvent) => {
    alert("SubmitForm");
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    console.log(parseFormData(schema, formData));
  },
}: {
  schema: BaseSchema;
  data: FetchDataType;
  onSubmit?: (e: React.FormEvent) => void;
}) => {
  const components = createInputArray(schema, data);
  const routes = createMemoryRouter([
    {
      path: "/",
      element: (
        <Form.FormComponent onSubmit={onSubmit}>
          {components}
        </Form.FormComponent>
      ),
    },
    {
      path: "/study",
      loader: () => FixtureData.study,
    },
    {
      path: "/vocabulary",
      loader: () => FixtureData.vocabulary,
    },
    {
      path: "/test",
      loader: () => FixtureData.testFixture,
    },
  ]);
  return (
    <ThemeProvider value={theme}>
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
};

export { TestComponent, schema, FixtureData };
