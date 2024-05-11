import { createInputArray } from "./form";
import { Schema, TestInitData, TestInitDataPartial } from "./form.helper";
import { expect, describe, test, beforeEach } from "vitest";
import React from "react";
import { getDefaultValue } from "./form";

describe("Test createInputArray", () => {
  describe("When using all fields", () => {
    let inputArray = createInputArray(Schema);
    test("Input array should have the same number of elements as Schema", () => {
      expect(inputArray.length).toBe(Object.keys(Schema).length);
    });
    test("First item should be input with type text and is required", () => {
      expect((inputArray[1] as React.ReactElement).props["type"]).toBe("text");
      expect((inputArray[1] as React.ReactElement).props["required"]).toBe(
        true
      );
      expect((inputArray[1] as React.ReactElement).props["placeholder"]).toBe(
        "first item"
      );
    });
    test("Second item should be input with type text and is not required", () => {
      expect((inputArray[2] as React.ReactElement).props["type"]).toBe("text");
      expect((inputArray[2] as React.ReactElement).props["required"]).toBe(
        false
      );
      expect((inputArray[2] as React.ReactElement).props["placeholder"]).toBe(
        "second item"
      );
    });
    test("Third item should be input with type date and is required", () => {
      expect((inputArray[3] as React.ReactElement).props["type"]).toBe("date");
      expect((inputArray[3] as React.ReactElement).props["required"]).toBe(
        true
      );
      expect(
        (inputArray[3] as React.ReactElement).props["placeholder"]
      ).toBeUndefined();
    });
  });
  describe("When omitting second field", () => {
    let inputArray = createInputArray(Schema, ["secondName"]);
    test("Input array should have the same number of elements as Schema", () => {
      expect(inputArray.length).toBe(Object.keys(Schema).length - 1);
    });
    test("First item should be input with type text and is required", () => {
      expect((inputArray[1] as React.ReactElement).props["type"]).toBe("text");
      expect((inputArray[1] as React.ReactElement).props["required"]).toBe(
        true
      );
      expect((inputArray[1] as React.ReactElement).props["placeholder"]).toBe(
        "first item"
      );
    });
    test("Second item should be input with type date and is required", () => {
      expect((inputArray[2] as React.ReactElement).props["type"]).toBe("date");
      expect((inputArray[2] as React.ReactElement).props["required"]).toBe(
        true
      );
      expect(
        (inputArray[2] as React.ReactElement).props["placeholder"]
      ).toBeUndefined();
    });
  });
  describe("When using all fields with initial data full", () => {
    let inputArray: Array<React.ReactNode>;
    beforeEach(() => {
      inputArray = createInputArray(Schema, [], TestInitData);
    });
    test("First item has correct props", () => {
      expect((inputArray[1] as React.ReactElement).props["type"]).toBe("text");
      expect((inputArray[1] as React.ReactElement).props["required"]).toBe(
        true
      );
      expect((inputArray[1] as React.ReactElement).props["placeholder"]).toBe(
        "first item"
      );
      expect((inputArray[1] as React.ReactElement).props["defaultValue"]).toBe(
        TestInitData.firstName
      );
    });
    test("Second item has correct props", () => {
      expect((inputArray[2] as React.ReactElement).props["type"]).toBe("text");
      expect((inputArray[2] as React.ReactElement).props["required"]).toBe(
        false
      );
      expect((inputArray[2] as React.ReactElement).props["placeholder"]).toBe(
        "second item"
      );
      expect((inputArray[2] as React.ReactElement).props["defaultValue"]).toBe(
        TestInitData.secondName
      );
    });
    test("Third item has correct props", () => {
      expect((inputArray[3] as React.ReactElement).props["type"]).toBe("date");
      expect((inputArray[3] as React.ReactElement).props["required"]).toBe(
        true
      );
      expect(
        (inputArray[3] as React.ReactElement).props["placeholder"]
      ).toBeUndefined();
      expect((inputArray[3] as React.ReactElement).props["defaultValue"]).toBe(
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
      expect((inputArray[1] as React.ReactElement).props["type"]).toBe("text");
      expect((inputArray[1] as React.ReactElement).props["required"]).toBe(
        true
      );
      expect((inputArray[1] as React.ReactElement).props["placeholder"]).toBe(
        "first item"
      );
      expect((inputArray[1] as React.ReactElement).props["defaultValue"]).toBe(
        TestInitDataPartial.firstName
      );
    });
    test("Second item has correct props", () => {
      expect((inputArray[2] as React.ReactElement).props["type"]).toBe("text");
      expect((inputArray[2] as React.ReactElement).props["required"]).toBe(
        false
      );
      expect((inputArray[2] as React.ReactElement).props["placeholder"]).toBe(
        "second item"
      );
      expect((inputArray[2] as React.ReactElement).props["defaultValue"]).toBe(
        TestInitDataPartial.secondName
      );
    });
    test("Third item has correct props", () => {
      expect((inputArray[3] as React.ReactElement).props["type"]).toBe("date");
      expect((inputArray[3] as React.ReactElement).props["required"]).toBe(
        true
      );
      expect(
        (inputArray[3] as React.ReactElement).props["placeholder"]
      ).toBeUndefined();
      expect((inputArray[3] as React.ReactElement).props["defaultValue"]).toBe(
        ""
      );
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
