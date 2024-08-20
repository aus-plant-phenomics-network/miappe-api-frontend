import { screen, render } from "@testing-library/react";
import { expect, describe, test, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { TestSelectComponent, fetchData } from "./select.helpers";
import React from "react";
import { BaseSchema, parseFormData } from "../helpers";
import { SchemaElementType, SubmissionFormType } from "../types";
import { enableMapSet } from "immer";

enableMapSet();

const Action = {
  clickOnDropDown: async () => {
    await userEvent.click(document.querySelector(".SelectTrigger")!);
  },
  clickOnOption: (optionValue: string) => async () => {
    const component = screen
      .queryAllByText(`${optionValue}`)
      .filter(item => item.tagName === "LABEL")[0];
    await userEvent.click(component!);
  },
  clickOnValue: (optionValue: string) => async () => {
    const component = Array.from(
      document.querySelectorAll("span.SelectValueItem"),
    ).filter(item => item.textContent === optionValue);
    expect(component.length).toBeGreaterThan(0);
    await userEvent.click(component![0]!);
  },
  clickSubmit: async () => {
    await userEvent.click(screen.getByText("Submit"));
  },
  typeOnSearch: (value: string) => async () => {
    await userEvent.type(document.querySelector(".SelectSearch")!, value);
  },
};

const Validator = {
  search: {
    isRendered: () => {
      expect(document.querySelector(".SelectSearch")).not.toBeNull();
    },
  },
  select: {
    valueIs: (value: string | string[]) => () => {
      expect(document.querySelector("select")).not.toBeNull();
      expect(document.querySelector("select")!.value).toEqual(value);
    },
    isRendered: () => {
      expect(document.querySelector("select")).toBeInTheDocument();
      expect(document.querySelector("select")).not.toBeVisible();
    },
    hasNoChildren: () => {
      expect(document.querySelector("select")?.children.length).toBe(0);
    },
  },
  option: {
    isRendered: (optionValue: string) => () => {
      const component = screen.queryAllByText(optionValue);
      expect(component).not.toBeNull();
    },
    isInvisible: (optionValue: string) => () => {
      const component = screen.queryAllByText(optionValue);
      expect(component).not.toBeNull();
      expect(component[0]).not.toBeVisible();
    },
    notInTheDocument: (optionValue: string) => () => {
      expect(screen.queryByText(optionValue)).toBeNull();
    },
  },
};

describe("Test Single No Fetched Data", () => {
  beforeEach(() => {
    render(<TestSelectComponent required={true} multiple={false} />);
  });
  test("select is rendered", Validator.select.isRendered);
  test("select has no children", Validator.select.hasNoChildren);
});

describe("Test Single No Default Data", () => {
  const choice = fetchData![2]!.title as string;
  const choiceValue = fetchData![2]!.id as string;
  const name = "facility";
  const onSubmit = vi.fn(e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    expect(formData.get(name)).toEqual(choiceValue);
  });
  beforeEach(async () => {
    render(
      <TestSelectComponent
        required={true}
        fetchedData={fetchData}
        onSubmit={onSubmit}
        multiple={false}
      />,
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
  const choice = fetchData![2]!.title as string;
  const choiceValue = fetchData![2]!.id as string;
  const name = "facility";
  const onSubmit = vi.fn(e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    expect(formData.get(name)).toEqual(choiceValue);
  });
  const defaultValue = fetchData![0]!.id;
  beforeEach(() => {
    render(
      <TestSelectComponent
        required={true}
        fetchedData={fetchData}
        onSubmit={onSubmit}
        multiple={false}
        defaultValue={defaultValue as string}
      />,
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

describe("Test simple select no default data exclude first Id", () => {
  const excludeId = fetchData![0]!.id as string;
  const onSubmit = vi.fn(e => {
    e.preventDefault();
  });
  beforeEach(async () => {
    render(
      <TestSelectComponent
        required={true}
        fetchedData={fetchData}
        onSubmit={onSubmit}
        multiple={false}
        excludeId={excludeId}
      />,
    );
  });
  test("Select was rendered", Validator.select.isRendered);
  describe("When click on dropdown", () => {
    beforeEach(Action.clickOnDropDown);
    for (const dataItem of fetchData!) {
      const optionValue = dataItem.title;
      if (dataItem.id === excludeId) {
        test(
          `Option ${optionValue} is not invisible`,
          Validator.option.isInvisible(optionValue as string),
        );
      } else {
        test(
          "Options are rendered: " + optionValue,
          Validator.option.isRendered(optionValue as string),
        );
      }
    }
  });
});

describe("Test simple select with data and label and exclude Id", () => {
  const choice = fetchData![2]!.title as string;
  const choiceValue = fetchData![2]!.id as string;
  const name = "facility";
  const onSubmit = vi.fn(e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    expect(formData.get(name)).toEqual(choiceValue);
  });
  const defaultValue = fetchData![0]!.id;
  const excludeId = fetchData![1]!.id as string;
  beforeEach(() => {
    render(
      <TestSelectComponent
        required={true}
        fetchedData={fetchData}
        onSubmit={onSubmit}
        multiple={false}
        defaultValue={defaultValue as string}
        excludeId={excludeId}
      />,
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
      if (dataItem.id === excludeId) {
        test(
          "Option is invisible: " + optionValue,
          Validator.option.isInvisible(optionValue as string),
        );
      } else {
        test(
          "Options are rendered: " + optionValue,
          Validator.option.isRendered(optionValue as string),
        );
      }
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

describe("Test simple select with data and label and exclude Id where exclude Id is default data", () => {
  const choice = fetchData![2]!.title as string;
  const choiceValue = fetchData![2]!.id as string;
  const name = "facility";
  const onSubmit = vi.fn(e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    expect(formData.get(name)).toEqual(choiceValue);
  });
  const defaultValue = fetchData![0]!.id;
  const excludeId = defaultValue as string;
  beforeEach(() => {
    render(
      <TestSelectComponent
        required={true}
        fetchedData={fetchData}
        onSubmit={onSubmit}
        multiple={false}
        defaultValue={defaultValue as string}
        excludeId={excludeId}
      />,
    );
  });
  test("Select was rendered", Validator.select.isRendered);
  for (const dataItem of fetchData!) {
    const optionValue = dataItem.title;
    if (dataItem.id === defaultValue) {
      test(
        `Options are not rendered: ${optionValue}`,
        Validator.option.notInTheDocument(optionValue as string),
      );
    }
  }
  test("Default value is correct", Validator.select.valueIs(""));

  describe("When click on dropdown", () => {
    beforeEach(Action.clickOnDropDown);
    for (const dataItem of fetchData!) {
      const optionValue = dataItem.title;
      if (dataItem.id === excludeId) {
        test(
          "Option is invisible: " + optionValue,
          Validator.option.isInvisible(optionValue as string),
        );
      } else {
        test(
          "Options are rendered: " + optionValue,
          Validator.option.isRendered(optionValue as string),
        );
      }
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

class TestSchema extends BaseSchema {
  facility: SchemaElementType = { type: "select", multiple: true };
}

describe("Test Multiple No Fetched Data", () => {
  beforeEach(() => {
    render(<TestSelectComponent required={true} multiple={true} />);
  });
  test("select is rendered", Validator.select.isRendered);
  test("select has no children", Validator.select.hasNoChildren);
});

describe("Test Multiple No Default Data", () => {
  const firstChoice = fetchData![2]!.title as string;
  const firstChoiceValue = fetchData![2]!.id as string;
  const secondChoice = fetchData![3]!.title as string;
  const secondChoiceValue = fetchData![3]!.id as string;
  const name = "facility";
  let submissionValue: SubmissionFormType;
  const onSubmit = vi.fn(e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    submissionValue = parseFormData(new TestSchema(), formData);
  });
  beforeEach(async () => {
    render(
      <TestSelectComponent
        required={true}
        fetchedData={fetchData}
        onSubmit={onSubmit}
        multiple={true}
      />,
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
    describe(`When click on value: ${firstChoice}`, async () => {
      beforeEach(Action.clickOnOption(firstChoice));
      test(
        "Select value matches choice",
        Validator.select.valueIs(firstChoiceValue),
      );
      test("submitted value is firstChoiceValue", async () => {
        await Action.clickSubmit();
        expect(onSubmit).toBeCalled();
        expect(submissionValue[name]).toEqual([firstChoiceValue]);
      });
      describe(`When reclicking on the same value: ${firstChoice}`, async () => {
        beforeEach(Action.clickOnOption(firstChoice));
        test("Select value matches choice", Validator.select.valueIs(""));
        test("submitted value is firstChoiceValue", async () => {
          await Action.clickSubmit();
          expect(onSubmit).toBeCalled();
          expect(submissionValue[name]).toEqual([firstChoiceValue]);
        });
      });
      describe(`When click on a different value: ${secondChoice}`, async () => {
        beforeEach(Action.clickOnOption(secondChoice));
        test("submitted value is firstChoiceValue", async () => {
          await Action.clickSubmit();
          expect(onSubmit).toBeCalled();
          expect(submissionValue[name]).toEqual([
            firstChoiceValue,
            secondChoiceValue,
          ]);
        });
      });
    });
  });
});

describe("Test Multiple With Default Data", () => {
  const defaultChoices = [
    fetchData![0]!.title as string,
    fetchData![1]!.title as string,
  ];
  const defaultValue = [
    fetchData![0]!.id as string,
    fetchData![1]!.id as string,
  ];
  const firstChoice = fetchData![2]!.title as string;
  const firstChoiceValue = fetchData![2]!.id as string;
  const secondChoice = fetchData![3]!.title as string;
  const secondChoiceValue = fetchData![3]!.id as string;
  const name = "facility";
  let submissionValue: SubmissionFormType;
  const onSubmit = vi.fn(e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    submissionValue = parseFormData(new TestSchema(), formData);
  });
  beforeEach(async () => {
    render(
      <TestSelectComponent
        required={true}
        fetchedData={fetchData}
        onSubmit={onSubmit}
        multiple={true}
        defaultValue={defaultValue}
      />,
    );
  });
  test("Select was rendered", Validator.select.isRendered);
  for (const dataItem of fetchData!) {
    const optionValue = dataItem.title;
    if (!defaultValue.includes(dataItem.id as string)) {
      test(`Options are not rendered: ${optionValue}`, () => {
        Validator.option.notInTheDocument(optionValue as string)();
      });
    } else
      test(
        `Label can be found: ${optionValue}`,
        Validator.option.isRendered(optionValue as string),
      );
  }
  test("submitted value is defaultValue", async () => {
    await Action.clickSubmit();
    expect(onSubmit).toBeCalled();
    expect(submissionValue[name]).toEqual(defaultValue);
  });
  describe("when click on a display value", () => {
    test("submitted value consists of the remaining value", async () => {
      await Action.clickOnValue(defaultChoices![0]!)();
      await Action.clickSubmit();
      expect(onSubmit).toBeCalled();
      expect(submissionValue[name]).toEqual([defaultValue[1]]);
    });
  });

  describe("When click on dropdown", () => {
    beforeEach(Action.clickOnDropDown);
    for (const dataItem of fetchData!) {
      const optionValue = dataItem.title;
      test(
        "Options are rendered: " + optionValue,
        Validator.option.isRendered(optionValue as string),
      );
    }
    describe(`When click on value: ${firstChoice}`, async () => {
      beforeEach(Action.clickOnOption(firstChoice));
      test("submitted value matches", async () => {
        await Action.clickSubmit();
        expect(onSubmit).toBeCalled();
        expect(submissionValue[name]).toEqual([
          ...defaultValue,
          firstChoiceValue,
        ]);
      });
      describe(`When reclicking on the same value: ${firstChoice}`, async () => {
        beforeEach(Action.clickOnOption(firstChoice));
        test("submitted value is firstChoiceValue", async () => {
          await Action.clickSubmit();
          expect(onSubmit).toBeCalled();
          expect(submissionValue[name]).toEqual(defaultValue);
        });
      });
      describe(`When click on a different value: ${secondChoice}`, async () => {
        beforeEach(Action.clickOnOption(secondChoice));
        test("submitted value is firstChoiceValue", async () => {
          await Action.clickSubmit();
          expect(onSubmit).toBeCalled();
          expect(submissionValue[name]).toEqual([
            ...defaultValue,
            firstChoiceValue,
            secondChoiceValue,
          ]);
        });
      });
      describe(`When clicking on defaultValues: ${defaultValue}`, () => {
        beforeEach(async () => {
          defaultChoices.forEach(
            async item => await Action.clickOnOption(item)(),
          );
        });
        test("submitted value matches", async () => {
          await Action.clickSubmit();
          expect(onSubmit).toBeCalled();
          expect(submissionValue[name]).toEqual([firstChoiceValue]);
        });
      });
    });
  });
});

describe("Test Multiple No Default Data with exclude id", () => {
  const excludeId = fetchData![0]!.id as string;
  const onSubmit = vi.fn(e => {
    e.preventDefault();
  });
  beforeEach(async () => {
    render(
      <TestSelectComponent
        required={true}
        fetchedData={fetchData}
        onSubmit={onSubmit}
        multiple={true}
        excludeId={excludeId}
      />,
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
      if (dataItem.id === excludeId) {
        test(
          `Option ${optionValue} is not invisible`,
          Validator.option.isInvisible(optionValue as string),
        );
      } else {
        test(
          "Options are rendered: " + optionValue,
          Validator.option.isRendered(optionValue as string),
        );
      }
    }
  });
});

describe("Test Multiple With Default Data one value with clashing exclude id", () => {
  const excludeId = fetchData![0]!.id as string;
  const defaultValue = [excludeId];
  const onSubmit = vi.fn(e => {
    e.preventDefault();
  });
  beforeEach(async () => {
    render(
      <TestSelectComponent
        required={true}
        fetchedData={fetchData}
        onSubmit={onSubmit}
        multiple={true}
        excludeId={excludeId}
        defaultValue={defaultValue}
      />,
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
      if (dataItem.id === excludeId) {
        test(
          `Option ${optionValue} is not invisible`,
          Validator.option.isInvisible(optionValue as string),
        );
      } else {
        test(
          "Options are rendered: " + optionValue,
          Validator.option.isRendered(optionValue as string),
        );
      }
    }
  });
});

describe("Test Multiple With Default Data multiple values with clashing exclude id", () => {
  const excludeId = fetchData![0]!.id as string;
  const defaultValue = [
    fetchData![0]!.id as string,
    fetchData![1]!.id as string,
  ];
  const defaultValueExcl = defaultValue.filter(item => item !== excludeId);

  const name = "facility";
  let submissionValue: SubmissionFormType;
  const onSubmit = vi.fn(e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    submissionValue = parseFormData(new TestSchema(), formData);
  });
  beforeEach(async () => {
    render(
      <TestSelectComponent
        required={true}
        fetchedData={fetchData}
        onSubmit={onSubmit}
        multiple={true}
        defaultValue={defaultValue}
        excludeId={excludeId}
      />,
    );
  });
  test("Select was rendered", Validator.select.isRendered);
  for (const dataItem of fetchData!) {
    const optionValue = dataItem.title;
    if (
      !defaultValue.includes(dataItem.id as string) ||
      dataItem.id === excludeId
    ) {
      test(`Options are not rendered: ${optionValue}`, () => {
        Validator.option.notInTheDocument(optionValue as string)();
      });
    } else
      test(
        `Label can be found: ${optionValue}`,
        Validator.option.isRendered(optionValue as string),
      );
  }
  test("submitted value is defaultValue after removing excluded id ", async () => {
    await Action.clickSubmit();
    expect(onSubmit).toBeCalled();
    expect(submissionValue[name]).toEqual(defaultValueExcl);
  });
  describe("When click on dropdown", () => {
    beforeEach(Action.clickOnDropDown);
    for (const dataItem of fetchData!) {
      const optionValue = dataItem.title;
      if (dataItem.id === excludeId) {
        test(
          `Option ${optionValue} is not invisible`,
          Validator.option.isInvisible(optionValue as string),
        );
      } else {
        test(
          "Options are rendered: " + optionValue,
          Validator.option.isRendered(optionValue as string),
        );
      }
    }
  });
});

describe("Test Search Feature", () => {
  const choiceValue = fetchData![2]!.id as string;
  const name = "facility";
  const onSubmit = vi.fn(e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    expect(formData.get(name)).toEqual(choiceValue);
  });
  beforeEach(async () => {
    render(
      <TestSelectComponent
        required={true}
        fetchedData={fetchData}
        onSubmit={onSubmit}
        multiple={false}
      />,
    );
    await Action.clickOnDropDown();
  });
  test("Search is rendered", Validator.search.isRendered);
  describe("When typing in `first`", () => {
    beforeEach(Action.typeOnSearch("first"));
    for (const dataItem of fetchData!) {
      const optionValue = dataItem.title;
      if (!(optionValue as string).includes("first")) {
        test(`Options are rendered but invisible: ${optionValue}`, () => {
          Validator.option.isInvisible(optionValue as string)();
        });
      } else
        test(
          `Label can be found: ${optionValue}`,
          Validator.option.isRendered(optionValue as string),
        );
    }
  });
});
