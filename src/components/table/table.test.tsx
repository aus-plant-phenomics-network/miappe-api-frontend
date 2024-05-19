import { screen, render } from "@testing-library/react";
import { expect, test, describe, beforeEach } from "vitest";
import {
  TestSchema,
  schema,
  Components,
  fetchDataSuccess,
  fetchDataFailure,
} from "./table.helpers";
import React from "react";
import { getDefaultValue, getTableDisplayKey } from "../helpers";

const Validator = {
  header: {
    isNotRendered: (name: keyof TestSchema) => {
      const component = screen.queryByText(name);
      expect(component).toBeNull();
    },
    isRendered: (name: keyof TestSchema) => {
      const component = screen.getByText(name);
      expect(component).toBeInTheDocument();
      expect(component).toBeVisible();
    },
  },
  bodyRow: {
    data: {
      isRendered: (text: string | null) => {
        const component = screen.queryByText(text ? text : "");
        expect(component).toBeVisible();
      },
      isNotRendered: (text: string | null) => {
        const component = screen.queryByText(text ? text : "");
        expect(component).toBeNull();
      },
    },
    component: {
      isRendered: () => {
        expect(document.querySelector("a")).toBeInTheDocument();
        expect(document.querySelector("a")).toBeInTheDocument();
      },
      hasCorrectLinkHRef: (id: string) => {
        expect(document.querySelector("a")!.href.endsWith(id)).toBeTruthy;
      },
    },
  },
};

describe("Test Render Table with data", () => {
  const fieldData = fetchDataSuccess;
  const fields = Object.keys(schema);
  beforeEach(() => {
    render(
      <Components.Table
        schema={schema}
        fields={fields}
        fieldData={fieldData}
      />,
    );
  });
  test.each(Object.keys(schema))(
    "expect header with value %s to be visible",
    key => Validator.header.isRendered(getTableDisplayKey(schema[key], key)),
  );
  test("expect Action to be visible", () =>
    Validator.header.isRendered("Action"));
  describe.each(fieldData!)("For each row", fieldItem => {
    for (const field of fields) {
      if (fieldItem[field] !== null) {
        test(`field ${field} with value ${getDefaultValue(schema[field], fieldItem[field])} is rendered`, () => {
          Validator.bodyRow.data.isRendered(
            getDefaultValue(schema[field], fieldItem[field]),
          );
        });
      }
    }
    test("Components are rendered", () => {
      Validator.bodyRow.component.isRendered();
    });
    test("Components have correct HRef", () => {
      Validator.bodyRow.component.hasCorrectLinkHRef(fieldItem.id!);
    });
  });
});

describe("Test Render Table with no data", () => {
  const fieldData = fetchDataFailure;
  const fields = Object.keys(schema);
  beforeEach(() => {
    render(
      <Components.Table
        schema={schema}
        fields={fields}
        fieldData={fieldData}
      />,
    );
  });
  test.each(Object.keys(schema))(
    "expect header with value %s to be visible",
    key => Validator.header.isRendered(getTableDisplayKey(schema[key], key)),
  );
  test("expect Action to be visible", () =>
    Validator.header.isRendered("Action"));
  test("No table data is rendered", () => {
    expect(document.querySelector(".TableBody")?.children.length).toBe(0);
  });
});
