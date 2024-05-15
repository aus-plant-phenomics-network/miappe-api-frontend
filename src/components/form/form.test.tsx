import { render, screen } from "@testing-library/react";
import { TestComponent, schema, FixtureData } from "./form.helper";
import React from "react";
import {
  getDefaultValue,
  getFormDisplayKey,
  getPlaceHolderValue,
} from "../helpers";
import { beforeEach, describe, expect, test } from "vitest";

const Action = {
  render: {
    POST: () => {
      render(<TestComponent schema={schema} data={null} />);
    },
    PUT: () => {
      render(<TestComponent schema={schema} data={FixtureData.test} />);
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
    isRenderedWithDefaultValue: () => {
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
  beforeEach(Action.render.POST);
  test("Labels are rendered correctly", Validator.label.isRendered);
  test(
    "Data are initially placeholders",
    Validator.data.isRenderedWithPlaceHolderValue,
  );
});

describe("Test PUT form", () => {
  beforeEach(Action.render.PUT);
  test("Labels are rendered correctly", Validator.label.isRendered);
  test("Data are test data value", Validator.data.isRenderedWithDefaultValue);
});
