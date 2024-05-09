import { createInputArray, createForm } from "./factory";
import { AbstractDataType, AbstractSchemaType } from "../../handlers";
import { expect, describe, test, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

interface TestType extends AbstractDataType {
  firstName: string;
  secondName: string;
  thirdName: Date;
}

type TestSchemaType = AbstractSchemaType<TestType>;

const Schema: TestSchemaType = {
  firstName: { type: "text", required: true, placeholder: "first item" },
  secondName: { type: "text", required: false, placeholder: "second item" },
  thirdName: { type: "date", required: true },
};

describe("Test createInputArray", () => {
  describe("When using all fields", () => {
    let inputArray = createInputArray(Schema);
    test("Input array should have the same number of elements as Schema", () => {
      expect(inputArray.length).toBe(Object.keys(Schema).length);
    });
    test("First item should be input with type text and is required", () => {
      expect(inputArray[0].props["type"]).toBe("text");
      expect(inputArray[0].props["required"]).toBe(true);
      expect(inputArray[0].props["placeholder"]).toBe("first item");
    });
    test("Second item should be input with type text and is not required", () => {
      expect(inputArray[1].props["type"]).toBe("text");
      expect(inputArray[1].props["required"]).toBe(false);
      expect(inputArray[1].props["placeholder"]).toBe("second item");
    });
    test("Third item should be input with type date and is required", () => {
      expect(inputArray[2].props["type"]).toBe("date");
      expect(inputArray[2].props["required"]).toBe(true);
      expect(inputArray[2].props["placeholder"]).toBeUndefined();
    });
  });
  describe("When omitting second field", () => {
    let inputArray = createInputArray(Schema, ["secondName"]);
    test("Input array should have the same number of elements as Schema", () => {
      expect(inputArray.length).toBe(Object.keys(Schema).length - 1);
    });
    test("First item should be input with type text and is required", () => {
      expect(inputArray[0].props["type"]).toBe("text");
      expect(inputArray[0].props["required"]).toBe(true);
      expect(inputArray[0].props["placeholder"]).toBe("first item");
    });
    test("Second item should be input with type date and is required", () => {
      expect(inputArray[1].props["type"]).toBe("date");
      expect(inputArray[1].props["required"]).toBe(true);
      expect(inputArray[1].props["placeholder"]).toBeUndefined();
    });
  });
});

const queryRenderedLabelGroup = (name: string) => {
  let input = document.querySelector(`input[name="${name}"]`);
  let label = document.querySelector(`label[for="${input!.id}"]`);
  return { input: input, label: label };
};

const queryInput = (name: string) => {
  return document.querySelector(`input[name="${name}"]`);
};

const testIsRendered = (name: string) => {
  return () => {
    let { input, label } = queryRenderedLabelGroup(name);
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  };
};

const testIsNotRendered = (name: string) => {
  return () => {
    let input = queryInput(name);
    expect(input).toBeNull();
  };
};

const Validator = {
  firstName: {
    isRendered: testIsRendered("firstName"),
    isNotRendered: testIsNotRendered("firstName"),
    isTypeText: () => {
      let input = queryInput("firstName");
      expect(input?.getAttribute("type")).toBe("text");
    },
    isRequired: () => {
      let input = queryInput("firstName");
      expect(input?.hasAttribute("required")).toBe(true);
    },
  },
  secondName: {
    isRendered: testIsRendered("secondName"),
    isNotRendered: testIsNotRendered("secondName"),
    isTypeText: () => {
      let input = queryInput("secondName");
      expect(input?.getAttribute("type")).toBe("text");
    },
    isNotRequired: () => {
      let input = queryInput("secondName");
      expect(input?.hasAttribute("required")).toBe(false);
    },
  },
  thirdName: {
    isRendered: testIsRendered("thirdName"),
    isNotRendered: testIsNotRendered("thirdName"),
    isTypeDate: () => {
      let input = queryInput("thirdName");
      expect(input?.getAttribute("type")).toBe("date");
    },
    isRequired: () => {
      let input = queryInput("thirdName");
      expect(input?.hasAttribute("required")).toBe(true);
    },
  },
  fourthName: {
    isRendered: () => {
      expect(queryInput("fourthName")).toBeInTheDocument();
    },
    isTypeSelect: () => {
      let input = queryInput("fourthName");
      expect(input!.getAttribute("type")).toBe("select");
    },
  },
};

describe("Test createForm", () => {
  describe("When using all fields", () => {
    beforeEach(() => {
      let inputArr = createInputArray(Schema);
      let Form = createForm(inputArr);
      const router = createBrowserRouter([
        {
          path: "/",
          element: <Form />,
        },
      ]);
      render(<RouterProvider router={router} />);
    });
    test("Label and input for first Item are rendered correctly", () => {
      Validator.firstName.isRendered();
      Validator.firstName.isRequired();
      Validator.firstName.isTypeText();
    });
    test("Label and input for second Item are rendered correctly", () => {
      screen.debug();
      Validator.secondName.isRendered();
      Validator.secondName.isNotRequired();
      Validator.secondName.isTypeText();
    });
    test("Label and input for third Item are rendered correctly", () => {
      Validator.thirdName.isRendered();
      Validator.thirdName.isRequired();
      Validator.thirdName.isTypeDate();
    });
  });
  describe("When omitting the second field", () => {
    beforeEach(() => {
      let inputArr = createInputArray(Schema, ["secondName"]);
      let Form = createForm(inputArr);
      const router = createBrowserRouter([
        {
          path: "/",
          element: <Form />,
        },
      ]);
      render(<RouterProvider router={router} />);
    });
    test("Label and input for first Item are rendered correctly", () => {
      Validator.firstName.isRendered();
      Validator.firstName.isRequired();
      Validator.firstName.isTypeText();
    });
    test("Label and input for second Item are not rendered", () => {
      screen.debug();
      Validator.secondName.isNotRendered();
    });
    test("Label and input for third Item are rendered correctly", () => {
      Validator.thirdName.isRendered();
      Validator.thirdName.isRequired();
      Validator.thirdName.isTypeDate();
    });
  });
  describe("When having extra select field", () => {
    beforeEach(() => {
      let inputArr = createInputArray(Schema);
      inputArr.push(<input type="select" name="fourthName" />);
      let Form = createForm(inputArr);
      const router = createBrowserRouter([
        {
          path: "/",
          element: <Form />,
        },
      ]);
      render(<RouterProvider router={router} />);
    });
    test("Label and input for first Item are rendered correctly", () => {
      Validator.firstName.isRendered();
      Validator.firstName.isRequired();
      Validator.firstName.isTypeText();
    });
    test("Label and input for second Item are rendered correctly", () => {
      screen.debug();
      Validator.secondName.isRendered();
      Validator.secondName.isNotRequired();
      Validator.secondName.isTypeText();
    });
    test("Label and input for third Item are rendered correctly", () => {
      Validator.thirdName.isRendered();
      Validator.thirdName.isRequired();
      Validator.thirdName.isTypeDate();
    });
    test("Label and input for fourth Item are rendered correctly", () => {
      Validator.fourthName.isRendered();
      Validator.fourthName.isTypeSelect();
    });
  });
});
