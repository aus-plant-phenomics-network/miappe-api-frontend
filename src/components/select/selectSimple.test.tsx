import { screen, render } from "@testing-library/react";
import { expect, describe, test, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { SimpleSelectTestComponent, fetchData } from "./select.helpers";
import React from "react";
import { BaseSchema, parseFormData } from "../helpers";

const Action = {
  clickOnDropDown: async () => {
    await userEvent.click(document.querySelector("select")!);
  },
  clickOnOption: (optionValue: string) => async () => {
    const component = document.querySelector(`[label="${optionValue}"]`)!;
    (component as HTMLOptionElement).selected = true;
  },
  clickSubmit: async () => {
    await userEvent.click(screen.getByText("Submit"));
  },
};

const Validator = {
  select: {
    valueIs: (value: string) => () => {
      expect(document.querySelector("select")?.value).toEqual(value);
    },
    isRendered: () => {
      expect(document.querySelector("select")).toBeInTheDocument();
      expect(document.querySelector("select")).toBeVisible();
    },
    hasNoChildren: () => {
      expect(document.querySelector("select")?.children.length).toBe(1);
    },
  },
  option: {
    isRendered: (optionValue: string) => () => {
      expect(
        document.querySelector(`[label="${optionValue}"]`),
      ).toBeInTheDocument();
    },
    isVisible: (optionValue: string) => () => {
      expect(document.querySelector(`[label="${optionValue}"]`)).toBeVisible();
    },
    isHidden: (optionValue: string) => () => {
      expect(
        document.querySelector(`[label="${optionValue}"]`),
      ).not.toBeVisible();
    },
  },
};

describe("Test simmple select no data", () => {
  beforeEach(() => {
    render(
      <SimpleSelectTestComponent
        name="facility"
        required={true}
        fetchedData={null}
        onSubmit={e => e.preventDefault()}
      />,
    );
  });
  test("select is rendered", Validator.select.isRendered);
  test("select has no children", Validator.select.hasNoChildren);
});

describe("Test simple select with data no label", () => {
  const choice = fetchData![2].title as string;
  const choiceValue = fetchData![2].id as string;
  const name = "facility";
  const onSubmit = vi.fn(e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    expect(formData.get(name)).toEqual(choiceValue);
  });
  beforeEach(() => {
    render(
      <SimpleSelectTestComponent
        name={name}
        required={true}
        fetchedData={fetchData}
        onSubmit={onSubmit}
      />,
    );
  });
  test("Select was rendered", Validator.select.isRendered);
  for (const dataItem of fetchData!) {
    const optionValue = dataItem.title;
    test(
      "Options are rendered",
      Validator.option.isRendered(optionValue as string),
    );
  }

  describe("When click on dropdown", () => {
    beforeEach(Action.clickOnDropDown);
    for (const dataItem of fetchData!) {
      const optionValue = dataItem.title;
      test(
        "Options are visible: " + optionValue,
        Validator.option.isVisible(optionValue as string),
      );
    }
    describe(`When click on value: ${choice}`, () => {
      beforeEach(Action.clickOnOption(choice));
      test(
        "Select value matches choice",
        Validator.select.valueIs(choiceValue),
      );
      test("submitted value is correct", async () => {
        await Action.clickSubmit();
        expect(onSubmit).toBeCalled();
      });
    });
  });
});

describe("Test simple select with data and label", () => {
  const choice = fetchData![2].title as string;
  const choiceValue = fetchData![2].id as string;
  const name = "facility";
  const onSubmit = vi.fn(e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    expect(formData.get(name)).toEqual(choiceValue);
  });
  const defaultValue = fetchData![0].id;
  beforeEach(() => {
    render(
      <SimpleSelectTestComponent
        name={name}
        required={true}
        fetchedData={fetchData}
        onSubmit={onSubmit}
        defaultValue={defaultValue as string}
      />,
    );
  });
  test("Select was rendered", Validator.select.isRendered);
  for (const dataItem of fetchData!) {
    const optionValue = dataItem.title;
    test(
      "Options are rendered",
      Validator.option.isRendered(optionValue as string),
    );
  }
  test(
    "Default value is correct",
    Validator.select.valueIs(defaultValue as string),
  );

  describe("When click on dropdown", () => {
    beforeEach(Action.clickOnDropDown);
    for (const dataItem of fetchData!) {
      const optionValue = dataItem.title;
      test(
        "Options are visible: " + optionValue,
        Validator.option.isVisible(optionValue as string),
      );
    }
    describe(`When click on value: ${choice}`, () => {
      beforeEach(Action.clickOnOption(choice));
      test(
        "Select value matches choice",
        Validator.select.valueIs(choiceValue),
      );
      test("submitted value is correct", async () => {
        await Action.clickSubmit();
        expect(onSubmit).toBeCalled();
      });
    });
  });
});
