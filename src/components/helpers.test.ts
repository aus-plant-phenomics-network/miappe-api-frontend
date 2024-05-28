import {
  getTableDisplayKey,
  getFetcherKey,
  getSubmissionValue,
  getDefaultValue,
  getHiddenValue,
  getFormDisplayKey,
  getRequired,
  getPlaceHolderValue,
  capitalise,
  BaseSchema,
  getMultipleValue,
  getTitleKey,
  parseFormData,
} from "./helpers";
import { describe, expect, test } from "vitest";
import { SchemaElementType } from "./types";

const getTitleKeyFixture = [
  {
    inputValue: "studyId",
    schema: { type: "select", titleKey: "name" },
    expValue: "name",
  },
  {
    inputValue: "studyId",
    schema: { type: "select" },
    expValue: "title",
  },
  {
    inputValue: "studyId",
    schema: { type: "select", titleKey: "title" },
    expValue: "title",
  },
];

describe.each(getTitleKeyFixture)(
  "given %o",
  ({ inputValue, schema, expValue }) => {
    test(`${inputValue} getMultiple returns ${expValue}`, () => {
      expect(getTitleKey(schema as SchemaElementType)).toEqual(expValue);
    });
  },
);

const getMultipleFixture = [
  {
    inputValue: "studyId",
    schema: { type: "select", multiple: true },
    expValue: true,
  },
  {
    inputValue: "studyId",
    schema: { type: "select", multiple: false },
    expValue: false,
  },
  {
    inputValue: "studyId",
    schema: { type: "select" },
    expValue: false,
  },
];

describe.each(getMultipleFixture)(
  "given %o",
  ({ inputValue, schema, expValue }) => {
    test(`${inputValue} getMultiple returns ${expValue}`, () => {
      expect(getMultipleValue(schema as SchemaElementType)).toEqual(expValue);
    });
  },
);
/**
 * ==================================================================================================================================================================
 * Test capitalise
 * ==================================================================================================================================================================
 */
const capitaliseFixture = [
  ["", ""],
  ["a", "A"],
  ["A", "A"],
  ["investigation", "Investigation"],
  ["Investigation", "Investigation"],
];

describe.each(capitaliseFixture)("given input %s", (inputValue, expValue) => {
  test(`capitalise returns ${expValue}`, () => {
    expect(capitalise(inputValue)).toEqual(expValue);
  });
});

/**
 * ==================================================================================================================================================================
 * Test Get Fetcher Key
 * ==================================================================================================================================================================
 */

const getFetcherKeyFixture = [
  {
    inputValue: "investigationId",
    schema: { type: "select" },
    expValue: "investigationId",
  },
  {
    inputValue: "investigation",
    schema: { type: "select" },
    expValue: "investigation",
  },
  {
    inputValue: "institutionType",
    schema: { fetcherKey: "vocabulary", type: "select" },
    expValue: "vocabulary",
  },
];

describe.each(getFetcherKeyFixture)(
  "given key %s, schema: %o",
  ({ inputValue, schema, expValue }) => {
    test(`getFetcherKey returns ${expValue}`, () => {
      expect(
        getFetcherKey(schema as SchemaElementType, inputValue as string),
      ).toEqual(expValue);
    });
  },
);

/**
 * ==================================================================================================================================================================
 * Test Get Submission Value
 * ==================================================================================================================================================================
 */

const getSubmissionValueFixture = [
  {
    inputValue: "",
    schema: { type: "select" },
    expValue: null,
  },
  { inputValue: "", schema: { type: "date" }, expValue: null },
  { inputValue: "", schema: { type: "text" }, expValue: null },

  {
    inputValue: "2021-01-01",
    schema: { type: "date" },
    expValue: new Date("2021-01-01"),
  },
  {
    inputValue: "2021-01-01",
    schema: { type: "select" },
    expValue: "2021-01-01",
  },
  {
    inputValue: "2021-01-01",
    schema: { type: "text" },
    expValue: "2021-01-01",
  },
];

describe.each(getSubmissionValueFixture)(
  "given key %s, schema: %o",
  ({ inputValue, schema, expValue }) => {
    test(`getSubmissionValue returns ${expValue}`, () => {
      expect(
        getSubmissionValue(schema as SchemaElementType, inputValue as string),
      ).toEqual(expValue);
    });
  },
);

/**
 * ==================================================================================================================================================================
 * Test Get Required
 * ==================================================================================================================================================================
 */
const getRequiredFixture = [
  /** Required: true => expects true */
  {
    inputValue: "investigation",
    schema: { type: "select", required: true },
    expValue: true,
  },

  /** Required not provided => expects false */
  {
    inputValue: "investigation",
    schema: { type: "select" },
    expValue: false,
  },

  /** Required provided and set to false => expects false */
  {
    inputValue: "investigation",
    schema: { type: "select", required: false },
    expValue: false,
  },
];

describe.each(getRequiredFixture)(
  "given %o",
  ({ inputValue, schema, expValue }) => {
    test(`${inputValue} getRequired returns ${expValue}`, () => {
      expect(getRequired(schema as SchemaElementType)).toEqual(expValue);
    });
  },
);

/**
 * ==================================================================================================================================================================
 * Test Get Table and Form Display Value and placeholder Value
 * ==================================================================================================================================================================
 */

const getTableDisplayKeyFixture = [
  /** Empty key => returns empty  */
  {
    inputValue: "",
    schema: { type: "select" },
    expValue: "",
  },
  {
    inputValue: "",
    schema: { type: "date" },
    expValue: "",
  },
  {
    inputValue: "",
    schema: { type: "text" },
    expValue: "",
  },

  // Key not provided with no trailing Id => capitalised version
  {
    inputValue: "myInvestigation",
    schema: { type: "select" },
    expValue: "MyInvestigation",
  },
  {
    inputValue: "myInvestigation",
    schema: { type: "text" },
    expValue: "MyInvestigation",
  },
  {
    inputValue: "myInvestigation",
    schema: { type: "date" },
    expValue: "MyInvestigation",
  },

  // Key not provided with no trailing Id and already capitalised => return as is
  {
    inputValue: "MyInvestigation",
    schema: { type: "select" },
    expValue: "MyInvestigation",
  },
  {
    inputValue: "MyInvestigation",
    schema: { type: "text" },
    expValue: "MyInvestigation",
  },
  {
    inputValue: "MyInvestigation",
    schema: { type: "date" },
    expValue: "MyInvestigation",
  },

  //Label key provided and capitalised => return label key
  {
    inputValue: "myInvestigation",
    schema: { labelKey: "Project", type: "select" },
    expValue: "Project",
  },
  {
    inputValue: "myInvestigation",
    schema: { labelKey: "Project", type: "text" },
    expValue: "Project",
  },
  {
    inputValue: "myInvestigation",
    schema: { labelKey: "Project", type: "date" },
    expValue: "Project",
  },
  // Label key provided and uncapitalised => return capitalised label key
  {
    inputValue: "myInvestigation",
    schema: { labelKey: "project", type: "select" },
    expValue: "Project",
  },
  {
    inputValue: "myInvestigation",
    schema: { labelKey: "project", type: "text" },
    expValue: "Project",
  },
  {
    inputValue: "myInvestigation",
    schema: { labelKey: "project", type: "date" },
    expValue: "Project",
  },
  // Label key not provided with trailing id and uncapitalised => capitalised + remove id
  {
    inputValue: "investigationId",
    schema: { type: "select" },
    expValue: "InvestigationId",
  },
  {
    inputValue: "investigationId",
    schema: { type: "text" },
    expValue: "InvestigationId",
  },
  {
    inputValue: "investigationId",
    schema: { type: "date" },
    expValue: "InvestigationId",
  },
  // Label key not provided with trailing id and capitalised => remove id
  {
    inputValue: "InvestigationId",
    schema: { type: "select" },
    expValue: "InvestigationId",
  },
  {
    inputValue: "InvestigationId",
    schema: { type: "text" },
    expValue: "InvestigationId",
  },
  {
    inputValue: "InvestigationId",
    schema: { type: "date" },
    expValue: "InvestigationId",
  },
  // Capitalised label key provided with trailing id => use provided label key
  {
    inputValue: "investigationId",
    schema: { labelKey: "Project", type: "select" },
    expValue: "Project",
  },
  {
    inputValue: "investigationId",
    schema: { labelKey: "Project", type: "text" },
    expValue: "Project",
  },
  {
    inputValue: "investigationId",
    schema: { labelKey: "Project", type: "date" },
    expValue: "Project",
  },
  // Uncapitalised label key provided with trailing id => use capitalised provided label key
  {
    inputValue: "investigationId",
    schema: { labelKey: "project", type: "select" },
    expValue: "Project",
  },
  {
    inputValue: "investigationId",
    schema: { labelKey: "project", type: "text" },
    expValue: "Project",
  },
  {
    inputValue: "investigationId",
    schema: { labelKey: "project", type: "date" },
    expValue: "Project",
  },
];

describe.each(getTableDisplayKeyFixture)(
  "given key %s, schema: %o",
  ({ inputValue, schema, expValue }) => {
    test(`getTableDisplayKey returns ${expValue}`, () => {
      expect(
        getTableDisplayKey(schema as SchemaElementType, inputValue as string),
      ).toEqual(expValue);
    });
  },
);

const getFormDisplayKeyFixture = [
  // Required
  {
    inputValue: "investigationId",
    schema: { type: "select", required: true },
    expValue: "InvestigationId*",
  },
  // Non required
  {
    inputValue: "investigationId",
    schema: { type: "select" },
    expValue: "InvestigationId",
  },
];

describe.each(getFormDisplayKeyFixture)(
  "given key %s, schema: %o",
  ({ inputValue, schema, expValue }) => {
    test(`getFormDisplayKey returns ${expValue}`, () => {
      expect(
        getFormDisplayKey(schema as SchemaElementType, inputValue as string),
      ).toEqual(expValue);
    });
  },
);

const getPlaceholderFixture = [
  // With Id uncapitalised
  {
    inputValue: "investigationId",
    schema: { type: "select" },
    expValue: "Enter InvestigationId",
  },
  // With Id and capitalised
  {
    inputValue: "InvestigationId",
    schema: { type: "select" },
    expValue: "Enter InvestigationId",
  },
  // Without Id and uncapitalised
  {
    inputValue: "investigation",
    schema: { type: "select" },
    expValue: "Enter Investigation",
  },
  // Without Id and capitalised
  {
    inputValue: "Investigation",
    schema: { type: "select" },
    expValue: "Enter Investigation",
  },
  // With provided placeholder
  {
    inputValue: "Investigation",
    schema: { type: "select", placeholder: "Please Enter Investigation" },
    expValue: "Please Enter Investigation",
  },
];

describe.each(getPlaceholderFixture)(
  "given key %s, schema: %o",
  ({ inputValue, schema, expValue }) => {
    test(`getPlaceHolderValue returns ${expValue}`, () => {
      expect(
        getPlaceHolderValue(schema as SchemaElementType, inputValue as string),
      ).toEqual(expValue);
    });
  },
);
/**
 * ==================================================================================================================================================================
 * Test Get Default Value
 * ==================================================================================================================================================================
 */

const getDefaultValueFixture = [
  /** Valid date string given with type being date => returns as ISO date  */
  {
    inputValue: "2021-11-11T00:00:00",
    schema: { type: "date" },
    expValue: "2021-11-11",
  },

  /** Valid date string given with type not being date => returns raw string */
  {
    inputValue: "2021-11-11T00:00:00",
    schema: { type: "text" },
    expValue: "2021-11-11T00:00:00",
  },
  {
    inputValue: "2021-11-11T00:00:00",
    schema: { type: "select" },
    expValue: "2021-11-11T00:00:00",
  },

  /** Empty string given => return empty string */
  {
    inputValue: "",
    schema: { type: "date" },
    expValue: "",
  },
  {
    inputValue: "",
    schema: { type: "text" },
    expValue: "",
  },
  {
    inputValue: "",
    schema: { type: "select" },
    expValue: "",
  },

  /** Null value given => return null */
  {
    inputValue: null,
    schema: { type: "date" },
    expValue: "",
  },
  {
    inputValue: null,
    schema: { type: "text" },
    expValue: "",
  },
  {
    inputValue: null,
    schema: { type: "select" },
    expValue: "",
  },
];

describe.each(getDefaultValueFixture)(
  "given key %s",
  ({ inputValue, schema, expValue }) => {
    test(`getDefaultValue returns "${expValue}"`, () => {
      expect(
        getDefaultValue(schema as SchemaElementType, inputValue as string),
      ).toEqual(expValue);
    });
  },
);

/**
 * ==================================================================================================================================================================
 * Test Get Hidden Value
 * ==================================================================================================================================================================
 */

const getHiddenValueFixture = [
  /** Id with no hidden value => expect to be true */
  {
    inputValue: "id",
    schema: { type: "text" },
    expValue: false,
  },
  {
    inputValue: "id",
    schema: { type: "text", hidden: true },
    expValue: true,
  },
  {
    inputValue: "id",
    schema: { type: "text", hidden: false },
    expValue: false,
  },
];

describe.each(getHiddenValueFixture)(
  "given %o",
  ({ inputValue, schema, expValue }) => {
    test(`getHiddenValue returns ${expValue} for ${inputValue}`, () => {
      expect(getHiddenValue(schema as SchemaElementType)).toEqual(expValue);
    });
  },
);

/**
 * ==================================================================================================================================================================
 * Test BaseSchema
 * ==================================================================================================================================================================
 */
describe("Test BaseSchema default value", () => {
  const schema = new BaseSchema();
  test("id is text, hidden and  not required by default", () => {
    expect(schema.id.type).toBe("text");
    expect(getHiddenValue(schema.id)).toBeTruthy();
    expect(getRequired(schema.id)).toBeFalsy();
  });
  test("createdAt, updatedAt are date, hidden and not required", () => {
    expect(schema.createdAt.type).toBe("date");
    expect(schema.updatedAt.type).toBe("date");

    expect(getHiddenValue(schema.createdAt)).toBeTruthy();
    expect(getHiddenValue(schema.updatedAt)).toBeTruthy();

    expect(getRequired(schema.createdAt)).not.toBeTruthy();
    expect(getRequired(schema.updatedAt)).not.toBeTruthy();
  });
});

/**
 * ==================================================================================================================================================================
 * Test Extended Schema
 * ==================================================================================================================================================================
 */
describe("Test Extended Schema", () => {
  class ExtendedSchema extends BaseSchema {
    studyId: SchemaElementType = {
      type: "select",
      required: true,
      fetcherKey: "study",
      labelKey: "study",
    };
    releaseDate: SchemaElementType = { type: "date" };
    deviceTypeId: SchemaElementType = {
      type: "select",
      fetcherKey: "vocabulary",
      labelKey: "type",
    };
  }
  const schema = new ExtendedSchema();

  test("studyId is select, required, not hidden, FormKey is Study*, TableKey is Study, fetcherKey is study, placeholder is Enter Study", () => {
    expect(schema.studyId.type).toBe("select");
    expect(getRequired(schema.studyId)).toBeTruthy();
    expect(getHiddenValue(schema.studyId)).toBeFalsy();
    expect(getFormDisplayKey(schema.studyId, "studyId")).toBe("Study*");
    expect(getTableDisplayKey(schema.studyId, "studyId")).toBe("Study");
    expect(getPlaceHolderValue(schema.studyId, "studyId")).toBe("Enter Study");
    expect(getFetcherKey(schema.studyId, "studyId")).toBe("study");
  });

  test("deviceTypeId is select, not required, not hidden, FormKey is Type, TableKey is Type, fetcherKey is vocabulary, placeholder is Enter Type", () => {
    expect(schema.deviceTypeId.type).toBe("select");
    expect(getRequired(schema.deviceTypeId)).not.toBeTruthy();
    expect(getHiddenValue(schema.deviceTypeId)).toBeFalsy();
    expect(getFormDisplayKey(schema.deviceTypeId, "deviceTypeId")).toBe("Type");
    expect(getTableDisplayKey(schema.deviceTypeId, "deviceTypeId")).toBe(
      "Type",
    );
    expect(getPlaceHolderValue(schema.deviceTypeId, "deviceTypeId")).toBe(
      "Enter Type",
    );
    expect(getFetcherKey(schema.deviceTypeId, "deviceTypeId")).toBe(
      "vocabulary",
    );
  });

  test("releaseDate is date, not required, not hidden, FormKey is ReleaseDate, TableKey is ReleaseDate, placeholder is Enter ReleaseDate", () => {
    expect(schema.releaseDate.type).toBe("date");
    expect(getRequired(schema.releaseDate)).not.toBeTruthy();
    expect(getHiddenValue(schema.releaseDate)).toBeFalsy();
    expect(getFormDisplayKey(schema.releaseDate, "releaseDate")).toBe(
      "ReleaseDate",
    );
    expect(getTableDisplayKey(schema.releaseDate, "releaseDate")).toBe(
      "ReleaseDate",
    );
    expect(getPlaceHolderValue(schema.releaseDate, "releaseDate")).toBe(
      "Enter ReleaseDate",
    );
  });
});

/**
 * ==================================================================================================================================================================
 * Test parseFormData
 * ==================================================================================================================================================================
 */

class ExtendedSchema extends BaseSchema {
  stringField: SchemaElementType = { type: "text" };
  dateField: SchemaElementType = { type: "date" };
  stringArrField: SchemaElementType = { type: "select", multiple: true };
  nullTextField: SchemaElementType = { type: "text" };
  nullDateField: SchemaElementType = { type: "date" };
  nullSelectField: SchemaElementType = { type: "select" };
  nullSelectMultipleField: SchemaElementType = {
    type: "select",
    multiple: true,
  };
}

const Fixture = {
  stringField: "stringField",
  dateField: "2021-01-01",
  stringArrField: ["first", "second"],
  nullTextField: "",
  nullDateField: "",
  nullSelectField: "",
  nullSelectMultipleField: "",
  keyNotInSchema: "value",
};

const extendedSchema = new ExtendedSchema();

describe("Test parse formData method", () => {
  const formData = new FormData();
  Object.entries(Fixture).forEach(item => {
    const [k, v] = item;
    if (Array.isArray(v)) {
      v.forEach(vItem => formData.append(k, vItem));
    } else {
      formData.append(k, v);
    }
  });
  const parsedData = parseFormData(extendedSchema, formData);
  for (const key of Object.keys(extendedSchema)) {
    test(`Key ${key} should return the correct value`, () => {
      if (key.startsWith("null")) {
        expect(parsedData[key]).toBeNull();
      }
    });
    test("Key not in schema is not in final parsed value", () => {
      expect("keyNotInSchema" in parsedData).toBeFalsy();
    });
  }
});
