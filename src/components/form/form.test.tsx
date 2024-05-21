import { render, screen } from "@testing-library/react";
import { TestComponent, schema, FixtureData } from "./form.helper";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import {
  getDefaultValue,
  getFormDisplayKey,
  getPlaceHolderValue,
  parseFormData,
} from "../helpers";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FetchDataSuccessType, SubmissionFormType } from "../types";

const Action = {
  render: {
    POST: (onSubmit?: (e: React.FormEvent<Element>) => void) => {
      render(<TestComponent schema={schema} data={null} onSubmit={onSubmit} />);
    },
    PUT: (onSubmit?: (e: React.FormEvent<Element>) => void) => {
      render(
        <TestComponent
          schema={schema}
          data={FixtureData.test}
          onSubmit={onSubmit}
        />,
      );
    },
  },
  clickOnSubmit: async () => {
    await userEvent.click(screen.queryByText("Submit")!);
  },
  clickOnDropDown: {
    study: async () => {
      const component = Array.from(
        document.querySelectorAll(".SelectTrigger"),
      )[0];
      await userEvent.click(component);
    },
    type: async () => {
      const component = Array.from(
        document.querySelectorAll(".SelectTrigger"),
      )[1];
      await userEvent.click(component);
    },
    test: async () => {
      const component = Array.from(
        document.querySelectorAll(".SelectTrigger"),
      )[2];
      await userEvent.click(component);
    },
  },
};

const Validator = {
  label: {
    isRendered: () => {
      for (const item of Object.entries(schema).filter(
        schemaItem => !["id", "createdAt", "updatedAt"].includes(schemaItem[0]),
      )) {
        const [key, schemaValue] = item;
        expect(
          screen.queryByText(getFormDisplayKey(schemaValue, key)),
        ).not.toBeNull();
        expect(
          screen.queryByText(getFormDisplayKey(schemaValue, key)),
        ).toBeInTheDocument();
        expect(
          screen.queryByText(getFormDisplayKey(schemaValue, key)),
        ).toBeVisible();
      }
      expect(
        screen.queryByText(getFormDisplayKey(schema.id, "id")),
      ).not.toBeVisible();
    },
  },
  selectOptions: {
    study: async () => {
      const StudyData = FixtureData.study;
      await Action.clickOnDropDown.study();

      for (const study of StudyData) {
        const element = Array.from(screen.queryAllByText(study.title)).filter(
          item => item.tagName === "LABEL",
        )[0];
        expect(element).toBeInTheDocument();
        expect(element.className.includes("hidden")).toBeFalsy();
      }
    },
    vocabulary: async () => {
      const VocabularyData = FixtureData.vocabulary;
      await Action.clickOnDropDown.type();
      for (const vocab of VocabularyData) {
        const element = Array.from(screen.queryAllByText(vocab.title)).filter(
          item => item.tagName === "LABEL",
        )[0];
        expect(element).toBeInTheDocument();
        expect(element.className.includes("hidden")).toBeFalsy();
      }
    },
    testAllVisible: async () => {
      const TestData = FixtureData.testFixture;
      await Action.clickOnDropDown.test();
      for (const test of TestData) {
        const element = Array.from(screen.queryAllByText(test.title)).filter(
          item => item.tagName === "LABEL",
        )[0];
        expect(element).toBeInTheDocument();
        expect(element.className.includes("hidden")).toBeFalsy();
      }
    },
    testExcludePUTId: async () => {
      const TestData = FixtureData.testFixture;
      await Action.clickOnDropDown.test();
      for (const test of TestData) {
        const element = Array.from(screen.queryAllByText(test.title)).filter(
          item => item.tagName === "LABEL",
        )[0];
        expect(element).toBeInTheDocument();
        if (test.id === FixtureData.test.id) {
          expect(element.className.includes("hidden")).toBeTruthy();
        } else {
          expect(element.className.includes("hidden")).toBeFalsy();
        }
      }
    },
  },
  data: {
    isRenderedWithPlaceHolderValue: () => {
      for (const item of Object.entries(schema).filter(
        schemaItem =>
          !["id", "createdAt", "updatedAt"].includes(schemaItem[0]) &&
          schemaItem[1].type === "text",
      )) {
        const [key, schemaValue] = item;
        const component = document.querySelector(`input[name="${key}"]`);
        expect(component).not.toBeNull();
        expect(component?.getAttribute("placeholder")).toEqual(
          getPlaceHolderValue(schemaValue, key),
        );
      }
    },
    isRenderedWithDefaultInputValue: () => {
      for (const item of Object.entries(schema).filter(
        schemaItem =>
          !["id", "createdAt", "updatedAt"].includes(schemaItem[0]) &&
          schemaItem[1].type === "text",
      )) {
        const [key, schemaValue] = item;
        const component = document.querySelector(`input[name="${key}"]`);
        expect(component).not.toBeNull();

        expect(component?.getAttribute("value")).toEqual(
          // @ts-expect-error test was not annotated to be of SchemaType so this can be ignored until Fixture data is refactored
          getDefaultValue(schemaValue, FixtureData.test[key]),
        );
      }
    },
  },
};

describe("Test POST form", () => {
  let submissionValue: SubmissionFormType = {};
  const onSubmit = vi.fn(e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    submissionValue = parseFormData(schema, formData);
  });
  beforeEach(() => {
    Action.render.POST(onSubmit);
  });
  test("Labels are rendered correctly", Validator.label.isRendered);
  test("Study options are rendered correctly", Validator.selectOptions.study);
  test(
    "Vocabulary options are rendered correctly",
    Validator.selectOptions.vocabulary,
  );
  test(
    "Test options are rendered correctly",
    Validator.selectOptions.testAllVisible,
  );
  test(
    "Data are initially placeholders",
    Validator.data.isRenderedWithPlaceHolderValue,
  );
});

describe("Test PUT form", () => {
  let submissionValue: SubmissionFormType = {};
  const onSubmit = vi.fn(e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    submissionValue = parseFormData(schema, formData);
  });
  beforeEach(() => {
    Action.render.PUT(onSubmit);
  });
  test("Labels are rendered correctly", Validator.label.isRendered);
  test("Labels are rendered correctly", Validator.label.isRendered);
  test("Study options are rendered correctly", Validator.selectOptions.study);
  test(
    "Vocabulary options are rendered correctly",
    Validator.selectOptions.vocabulary,
  );
  test(
    "Test options are rendered correctly",
    Validator.selectOptions.testExcludePUTId,
  );
  test(
    "Data are test data value",
    Validator.data.isRenderedWithDefaultInputValue,
  );
  test("Submit data shows default value", async () => {
    await Action.clickOnSubmit();
    expect(onSubmit).toBeCalled();
    for (const pair of Object.entries(submissionValue)) {
      const [key, value] = pair;
      if (key === "createdAt" || key === "updatedAt" || key === "releaseDate") {
        expect(value).toEqual(new Date(FixtureData.test[key]));
      } else {
        expect(value).toEqual((FixtureData.test as FetchDataSuccessType)[key]);
      }
    }
  });
});
