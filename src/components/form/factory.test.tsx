import { createInputArray, FormComponent } from "./factory";
import { AbstractDataType, AbstractSchemaType } from "../../handlers";
import { expect, describe, test, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { getDefaultValue } from "./factory";

interface TestType extends AbstractDataType {
  firstName: string;
  secondName: string;
  thirdName?: Date | string;
}

type TestSchemaType = AbstractSchemaType<TestType>;

const Schema: TestSchemaType = {
  firstName: { type: "text", required: true, placeholder: "first item" },
  secondName: { type: "text", required: false, placeholder: "second item" },
  thirdName: { type: "date", required: true },
};

const TestInitData: TestType = {
  firstName: "Hoang",
  secondName: "Son",
  thirdName: "Le",
};

const TestInitDataPartial: TestType = {
  firstName: "Hoang",
  secondName: "Le",
};

describe("Test createInputArray", () => {
  describe("When using all fields", () => {
    let inputArray = createInputArray(Schema);
    test("Input array should have the same number of elements as Schema", () => {
      expect(inputArray.length).toBe(Object.keys(Schema).length);
    });
    test("First item should be input with type text and is required", () => {
      expect((inputArray[0] as React.ReactElement).props["type"]).toBe("text");
      expect((inputArray[0] as React.ReactElement).props["required"]).toBe(
        true
      );
      expect((inputArray[0] as React.ReactElement).props["placeholder"]).toBe(
        "first item"
      );
    });
    test("Second item should be input with type text and is not required", () => {
      expect((inputArray[1] as React.ReactElement).props["type"]).toBe("text");
      expect((inputArray[1] as React.ReactElement).props["required"]).toBe(
        false
      );
      expect((inputArray[1] as React.ReactElement).props["placeholder"]).toBe(
        "second item"
      );
    });
    test("Third item should be input with type date and is required", () => {
      expect((inputArray[2] as React.ReactElement).props["type"]).toBe("date");
      expect((inputArray[2] as React.ReactElement).props["required"]).toBe(
        true
      );
      expect(
        (inputArray[2] as React.ReactElement).props["placeholder"]
      ).toBeUndefined();
    });
  });
  describe("When omitting second field", () => {
    let inputArray = createInputArray(Schema, ["secondName"]);
    test("Input array should have the same number of elements as Schema", () => {
      expect(inputArray.length).toBe(Object.keys(Schema).length - 1);
    });
    test("First item should be input with type text and is required", () => {
      expect((inputArray[0] as React.ReactElement).props["type"]).toBe("text");
      expect((inputArray[0] as React.ReactElement).props["required"]).toBe(
        true
      );
      expect((inputArray[0] as React.ReactElement).props["placeholder"]).toBe(
        "first item"
      );
    });
    test("Second item should be input with type date and is required", () => {
      expect((inputArray[1] as React.ReactElement).props["type"]).toBe("date");
      expect((inputArray[1] as React.ReactElement).props["required"]).toBe(
        true
      );
      expect(
        (inputArray[1] as React.ReactElement).props["placeholder"]
      ).toBeUndefined();
    });
  });
  describe("When using all fields with initial data full", () => {
    let inputArray: Array<React.ReactNode>;
    beforeEach(() => {
      inputArray = createInputArray(Schema, [], TestInitData);
    });
    test("First item has correct props", () => {
      expect((inputArray[0] as React.ReactElement).props["type"]).toBe("text");
      expect((inputArray[0] as React.ReactElement).props["required"]).toBe(
        true
      );
      expect((inputArray[0] as React.ReactElement).props["placeholder"]).toBe(
        "first item"
      );
      expect((inputArray[0] as React.ReactElement).props["defaultValue"]).toBe(
        TestInitData.firstName
      );
    });
    test("Second item has correct props", () => {
      expect((inputArray[1] as React.ReactElement).props["type"]).toBe("text");
      expect((inputArray[1] as React.ReactElement).props["required"]).toBe(
        false
      );
      expect((inputArray[1] as React.ReactElement).props["placeholder"]).toBe(
        "second item"
      );
      expect((inputArray[1] as React.ReactElement).props["defaultValue"]).toBe(
        TestInitData.secondName
      );
    });
    test("Third item has correct props", () => {
      expect((inputArray[2] as React.ReactElement).props["type"]).toBe("date");
      expect((inputArray[2] as React.ReactElement).props["required"]).toBe(
        true
      );
      expect(
        (inputArray[2] as React.ReactElement).props["placeholder"]
      ).toBeUndefined();
      expect((inputArray[2] as React.ReactElement).props["defaultValue"]).toBe(
        TestInitData.thirdName
      );
    });
  });
  describe("When using all fields with initial data missing third name", () => {
    let inputArray: Array<React.ReactNode>;
    beforeEach(() => {
      inputArray = createInputArray(Schema, [], TestInitDataPartial);
    });
    test("First item has correct props", () => {
      expect((inputArray[0] as React.ReactElement).props["type"]).toBe("text");
      expect((inputArray[0] as React.ReactElement).props["required"]).toBe(
        true
      );
      expect((inputArray[0] as React.ReactElement).props["placeholder"]).toBe(
        "first item"
      );
      expect((inputArray[0] as React.ReactElement).props["defaultValue"]).toBe(
        TestInitDataPartial.firstName
      );
    });
    test("Second item has correct props", () => {
      expect((inputArray[1] as React.ReactElement).props["type"]).toBe("text");
      expect((inputArray[1] as React.ReactElement).props["required"]).toBe(
        false
      );
      expect((inputArray[1] as React.ReactElement).props["placeholder"]).toBe(
        "second item"
      );
      expect((inputArray[1] as React.ReactElement).props["defaultValue"]).toBe(
        TestInitDataPartial.secondName
      );
    });
    test("Third item has correct props", () => {
      expect((inputArray[2] as React.ReactElement).props["type"]).toBe("date");
      expect((inputArray[2] as React.ReactElement).props["required"]).toBe(
        true
      );
      expect(
        (inputArray[2] as React.ReactElement).props["placeholder"]
      ).toBeUndefined();
      expect((inputArray[2] as React.ReactElement).props["defaultValue"]).toBe(
        ""
      );
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
      const router = createBrowserRouter([
        {
          path: "/",
          element: <FormComponent>{inputArr}</FormComponent>,
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
      const router = createBrowserRouter([
        {
          path: "/",
          element: <FormComponent>{inputArr}</FormComponent>,
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
      const router = createBrowserRouter([
        {
          path: "/",
          element: <FormComponent>{inputArr}</FormComponent>,
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

describe("Test getDefaultValue", () => {
  test.each([
    ["text", undefined, ""],
    ["text", null, ""],
    ["datew", undefined, ""],
    ["datew", null, ""],
    ["text", "value", "value"],
    ["text", 123, "123"],
    ["date", "2021-11-11T00:00:00", "2021-11-11"],
  ])("given type: %s, input %s, expects %s", (type, inputValue, expValue) => {
    expect(getDefaultValue(type, inputValue)).toBe(expValue);
  });
});
