import { screen, render } from "@testing-library/react";
import { expect, describe, test, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { TestSelectComponent, fetchData } from "./select.helpers";
import React from "react";
import { ThemeProvider } from "@ailiyah-ui/context";
import { theme } from "../../assets/theme";

const Action = {
  clickOnDropDown: async () => {
    await userEvent.click(document.querySelector(".SelectTrigger")!);
  },
  clickOnOption: (optionValue: string) => async () => {
    const component = screen.queryByText(`${optionValue}`)!;
    await userEvent.click(component);
  },
  clickSubmit: async () => {
    await userEvent.click(screen.getByText("Submit"));
  },
};

const Validator = {
  select: {
    valueIs: (value: string | string[]) => () => {
      expect(document.querySelector("select")?.value).toEqual(value);
    },
    isRendered: () => {
      expect(document.querySelector("select")).toBeInTheDocument();
      expect(document.querySelector("select")).not.toBeVisible();
    },
    hasNoChildren: () => {
      expect(document.querySelector("select")?.children.length).toBe(1);
    },
  },
  option: {
    isRendered: (optionValue: string) => () => {
      expect(screen.queryAllByText(optionValue)).not.toBeNull();
    },
    notInTheDocument: (optionValue: string) => () => {
      expect(screen.queryByText(optionValue)).toBeNull();
    },
  },
};

describe("Test Single No Fetched Data", () => {
  beforeEach(() => {
    render(
      <ThemeProvider value={theme}>
        <TestSelectComponent name="facility" required={true} multiple={false} />
      </ThemeProvider>,
    );
  });
  test("select is rendered", Validator.select.isRendered);
  test("select has no children", Validator.select.hasNoChildren);
});

describe("Test Single No Default Data", () => {
  const choice = fetchData![2].title as string;
  const choiceValue = fetchData![2].id as string;
  const name = "facility";
  const onSubmit = vi.fn(e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    expect(formData.get(name)).toEqual(choiceValue);
  });
  beforeEach(async () => {
    render(
      <ThemeProvider value={theme}>
        <TestSelectComponent
          name={name}
          required={true}
          fetchedData={fetchData}
          onSubmit={onSubmit}
          multiple={false}
        />
      </ThemeProvider>,
    );
  });
  test("Select was rendered", Validator.select.isRendered);
  for (const dataItem of fetchData!) {
    const optionValue = dataItem.title;
    test(`Options are not rendered: ${optionValue}`, () => {
      Validator.option.notInTheDocument(optionValue as string)();
    });
  }

  describe("When click on dropdown", () => {
    beforeEach(Action.clickOnDropDown);
    for (const dataItem of fetchData!) {
      const optionValue = dataItem.title;
      test(
        "Options are rendered: " + optionValue,
        Validator.option.isRendered(optionValue as string),
      );
    }
    describe(`When click on value: ${choice}`, async () => {
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
      <ThemeProvider value={theme}>
        <TestSelectComponent
          name={name}
          required={true}
          fetchedData={fetchData}
          onSubmit={onSubmit}
          multiple={false}
          defaultValue={defaultValue as string}
        />
      </ThemeProvider>,
    );
  });
  test("Select was rendered", Validator.select.isRendered);
  for (const dataItem of fetchData!) {
    const optionValue = dataItem.title;
    if (dataItem.id === defaultValue) {
      test(
        `Default option is visible ${optionValue}`,
        Validator.option.isRendered(optionValue as string),
      );
    } else {
      test(
        `Options are not rendered: ${optionValue}`,
        Validator.option.notInTheDocument(optionValue as string),
      );
    }
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
        "Options are rendered: " + optionValue,
        Validator.option.isRendered(optionValue as string),
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
