import { expect, test, describe, beforeAll } from "vitest";
import { SchemaElementType, SchemaType } from "../types";
import { BaseSchema } from "./form.helpers";
import { createInputArray } from "./factory";
import React from "react";

// Set up fixtures
type ExpLabel = {
  hidden?: boolean;
  value?: string;
};
type TestRecord = [string, SchemaElementType];

type TestFixture = {
  record: TestRecord;
  label: ExpLabel;
};

const TextRequired: TestFixture = {
  record: ["textRequired", { type: "text", required: true }],
  label: {
    value: "TextRequired*",
  },
};

const TextRequiredId: TestFixture = {
  record: ["textRequiredId", { type: "text", required: true }],
  label: {
    value: "TextRequiredId*",
  },
};

const TextNotRequired: TestFixture = {
  record: ["textNotRequired", { type: "text", required: false }],
  label: {
    value: "TextNotRequired",
  },
};

const TextNotRequiredId: TestFixture = {
  record: ["textNotRequiredId", { type: "text", required: false }],
  label: {
    value: "TextNotRequiredId",
  },
};

const TextRequiredHidden: TestFixture = {
  record: [
    "textRequiredHidden",
    { type: "text", hidden: true, required: true },
  ],
  label: {
    hidden: true,
  },
};

const TextRequiredHiddenLabel: TestFixture = {
  record: [
    "textRequiredHiddenLabel",
    {
      type: "text",
      hidden: true,
      required: true,
      labelKey: "textRequiredHiddenLabelKey",
    },
  ],
  label: {
    hidden: true,
  },
};

const TextNotRequiredHidden: TestFixture = {
  record: [
    "textNotRequiredHidden",
    { type: "text", hidden: true, required: false },
  ],
  label: { hidden: true },
};

const TextNotRequiredHiddenLabel: TestFixture = {
  record: [
    "textNotRequiredHiddenLabel",
    {
      type: "text",
      hidden: true,
      required: false,
      labelKey: "textNotRequiredHiddenLabelKey",
    },
  ],
  label: {
    hidden: true,
  },
};

const TextRequiredLabel: TestFixture = {
  record: [
    "textRequiredLabel",
    {
      type: "text",
      required: true,
      labelKey: "textRequiredLabelKey",
    },
  ],
  label: {
    value: "TextRequiredLabelKey*",
  },
};

const TextRequiredLabelId: TestFixture = {
  record: [
    "textRequiredLabelId",
    {
      type: "text",
      required: true,
      labelKey: "textRequiredLabelIdKey",
    },
  ],
  label: {
    value: "TextRequiredLabelIdKey*",
  },
};

const TextNotRequiredLabel: TestFixture = {
  record: [
    "textNotRequiredLabel",
    {
      type: "text",
      required: false,
      labelKey: "textNotRequiredLabelKey",
    },
  ],
  label: {
    value: "TextNotRequiredLabelKey",
  },
};

const TextNotRequiredLabelId: TestFixture = {
  record: [
    "textNotRequiredLabelId",
    {
      type: "text",
      required: false,
      labelKey: "textNotRequiredLabelIdKey",
    },
  ],
  label: {
    value: "TextNotRequiredLabelIdKey",
  },
};

const DateRequired: TestFixture = {
  record: ["dateRequired", { type: "date", required: true }],
  label: {
    value: "DateRequired*",
  },
};

const DateRequiredId: TestFixture = {
  record: ["dateRequiredId", { type: "date", required: true }],
  label: {
    value: "DateRequiredId*",
  },
};

const DateNotRequired: TestFixture = {
  record: ["dateNotRequired", { type: "date", required: false }],
  label: {
    value: "DateNotRequired",
  },
};

const DateNotRequiredId: TestFixture = {
  record: ["dateNotRequiredId", { type: "date", required: false }],
  label: {
    value: "DateNotRequiredId",
  },
};

const DateRequiredHidden: TestFixture = {
  record: [
    "dateRequiredHidden",
    { type: "date", hidden: true, required: true },
  ],
  label: {
    hidden: true,
  },
};

const DateRequiredHiddenLabel: TestFixture = {
  record: [
    "dateRequiredHiddenLabel",
    {
      type: "date",
      hidden: true,
      required: true,
      labelKey: "dateRequiredHiddenLabelKey",
    },
  ],
  label: {
    hidden: true,
  },
};

const DateNotRequiredHidden: TestFixture = {
  record: [
    "dateNotRequiredHidden",
    { type: "date", hidden: true, required: false },
  ],
  label: { hidden: true },
};

const DateNotRequiredHiddenLabel: TestFixture = {
  record: [
    "dateNotRequiredHiddenLabel",
    {
      type: "date",
      hidden: true,
      required: false,
      labelKey: "dateNotRequiredHiddenLabelKey",
    },
  ],
  label: {
    hidden: true,
  },
};

const DateRequiredLabel: TestFixture = {
  record: [
    "dateRequiredLabel",
    {
      type: "date",
      required: true,
      labelKey: "dateRequiredLabelKey",
    },
  ],
  label: {
    value: "DateRequiredLabelKey*",
  },
};

const DateRequiredLabelId: TestFixture = {
  record: [
    "dateRequiredLabelId",
    {
      type: "date",
      required: true,
      labelKey: "dateRequiredLabelIdKey",
    },
  ],
  label: {
    value: "DateRequiredLabelIdKey*",
  },
};

const DateNotRequiredLabel: TestFixture = {
  record: [
    "dateNotRequiredLabel",
    {
      type: "date",
      required: false,
      labelKey: "dateNotRequiredLabelKey",
    },
  ],
  label: {
    value: "DateNotRequiredLabelKey",
  },
};

const DateNotRequiredLabelId: TestFixture = {
  record: [
    "dateNotRequiredLabelId",
    {
      type: "date",
      required: false,
      labelKey: "dateNotRequiredLabelIdKey",
    },
  ],
  label: {
    value: "DateNotRequiredLabelIdKey",
  },
};

const FixtureArray = [
  TextRequired,
  TextRequiredId,
  TextNotRequired,
  TextNotRequiredId,
  TextRequiredHidden,
  TextRequiredHiddenLabel,
  TextNotRequiredHidden,
  TextNotRequiredHiddenLabel,
  TextRequiredLabel,
  TextRequiredLabelId,
  TextNotRequiredLabel,
  TextNotRequiredLabelId,
  DateRequired,
  DateRequiredId,
  DateNotRequired,
  DateNotRequiredId,
  DateRequiredHidden,
  DateRequiredHiddenLabel,
  DateNotRequiredHidden,
  DateNotRequiredHiddenLabel,
  DateRequiredLabel,
  DateRequiredLabelId,
  DateNotRequiredLabel,
  DateNotRequiredLabelId,
];

const TestLabelSchema: SchemaType = {
  ...BaseSchema,
  ...FixtureArray.reduce((acc, item) => {
    const [key, value] = item.record;
    acc[key] = value;
    return acc;
  }, {} as any),
};

describe("test createInputArray omiting BaseSchema items", () => {
  let array: React.ReactElement[];
  let arrayFixtureProp: Array<[React.ReactElement, TestFixture]> = [];
  array = createInputArray(TestLabelSchema, ["id", "title", "description"]);
  for (let i = 0; i < array.length; i++) {
    arrayFixtureProp.push([array[i], FixtureArray[i]]);
  }

  test(`expect array to have the same size as fixture`, () => {
    expect(array.map(item => item.props.name)).toEqual(
      FixtureArray.map(item => item.record[0]),
    );
  });
  describe.each(arrayFixtureProp)(
    "Given fixture and component",
    (arrayItem, fixtureItem) => {
      const props = arrayItem.props;
      const record = fixtureItem.record;
      test(`expect matching name - props: ${props.name}, fixture: ${record[0]}`, () => {
        expect(props.name).toBe(record[0]);
      });
      test(`expect matching type - props: ${props.type}, fixture: ${record[1].type}`, () => {
        expect(props.type).toBe(record[1].type);
      });
      test(`expect matching required - props: ${props.required}, fixture: ${record[1].required}`, () => {
        expect(props.required).toBe(record[1].required);
      });
    },
  );
});
