import { FormComponent } from "./form";
import { describe, test, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { createInputArray } from "../factory/form";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { Schema, Validator } from "../factory/form.helper";

describe("Test Form Component", () => {
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
