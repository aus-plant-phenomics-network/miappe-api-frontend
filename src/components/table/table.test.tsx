import { screen, render } from "@testing-library/react";
import { expect, test, describe, beforeEach, vi } from "vitest";
import {
  TestSchema,
  schema,
  excludedKeys,
  Components,
  fetchDataSuccess,
  fetchDataFailure,
} from "./table.helpers";
import { Root } from "./table";
import React from "react";
import { FetchDataArrayType } from "../types";

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

describe("Test Render Root", () => {
  beforeEach(() => {
    render(<Root />);
  });

  test("when rendered, RootRoot is in the document", () => {
    const component = document.querySelector(".TableRoot");
    expect(component).toBeInTheDocument();
  });

  test("when rendered, Root is in the document", () => {
    const component = document.querySelector(".Table");
    expect(component).toBeInTheDocument();
  });
});

describe("Test Render Header", () => {
  describe("when rendering with all fields", () => {
    beforeEach(() => {
      const fields = Object.keys(schema);
      render(<Components.Header fields={fields} />);
    });
    test.each(Object.keys(schema))(
      "expect header with value %s to be visible",
      key => Validator.header.isRendered(key),
    );
    test("expect Action to be visible", () =>
      Validator.header.isRendered("Action"));
  });
  describe(`when rendering with excluded fields: ${excludedKeys}`, () => {
    beforeEach(() => {
      const fields = Object.keys(schema).filter(
        item => !excludedKeys.includes(item),
      );
      render(<Components.Header fields={fields} />);
    });
    describe.each(Object.keys(schema))("given header value: %s", key => {
      if (excludedKeys.includes(key)) {
        test("expect to not be rendered", () => {
          Validator.header.isNotRendered(key);
        });
      } else {
        test("expect to be rendered", () => Validator.header.isRendered(key));
      }
      test("expect Action to be visible", () =>
        Validator.header.isRendered("Action"));
    });
  });
});

describe("Test Render BodyRow with data", () => {
  describe("Rendering with all fields", () => {
    let fieldData: FetchDataArrayType<TestSchema> = fetchDataSuccess;
    let fields: string[] = Object.keys(schema);
    beforeEach(() => {
      render(<Components.Body fields={fields} fieldData={fieldData} />);
    });
    describe.each(fieldData!)("For each row", fieldItem => {
      for (const field of fields) {
        if (fieldItem[field] !== null) {
          test(`field ${field} with value ${fieldItem[field]} is rendered`, () => {
            Validator.bodyRow.data.isRendered(fieldItem[field]);
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

  describe(`Rendering with omitted field: ${excludedKeys}`, () => {
    let fieldData: FetchDataArrayType<TestSchema> = fetchDataSuccess;
    let fields: string[] = Object.keys(schema).filter(
      item => !excludedKeys.includes(item),
    );
    beforeEach(() => {
      render(<Components.Body fields={fields} fieldData={fieldData} />);
    });
    describe.each(fieldData!)("For each row", fieldItem => {
      for (const exField of excludedKeys) {
        test(`excluded field ${exField} are not rendered`, () => {
          Validator.bodyRow.data.isNotRendered(fieldItem[exField]);
        });
      }
      for (const field of fields) {
        if (fieldItem[field] !== null) {
          test(`field ${field} with value ${fieldItem[field]} is rendered`, () => {
            Validator.bodyRow.data.isRendered(fieldItem[field]);
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
});

describe("Test Render BodyRow with no data", () => {
  beforeEach(() => {
    render(
      <Components.Body
        fields={Object.keys(schema)}
        fieldData={fetchDataFailure}
      />,
    );
  });
  test("No data is rendered", () => {
    expect(document.querySelector(".TableBody")?.children.length).toBe(0);
  });
});