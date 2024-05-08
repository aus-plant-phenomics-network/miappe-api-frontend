import { capitalise, string2Date, toSnakeCase } from "./helpers";
import { describe, expect, test } from "vitest";

const capitaliseFixture = [
  ["", ""],
  ["a", "A"],
  [" ", ""],
  ["A ", "A"],
  ["first name ", "FirstName"],
  ["firstName", "FirstName"],
  ["lastName", "LastName"],
  ["first name", "FirstName"],
  ["last name", "LastName"],
];

describe.each(capitaliseFixture)("given %s", (inputValue, expValue) => {
  test(`capitalise returns ${expValue}`, () => {
    expect(capitalise(inputValue)).toBe(expValue);
  });
});

const snakeCaseFixture = [
  ["first name", "first_name"],
  ["public release date", "public_release_date"],
];

describe.each(snakeCaseFixture)("given %s", (inputValue, expValue) => {
  test(`toSnakeCase returns ${expValue}`, () => {
    expect(toSnakeCase(inputValue)).toBe(expValue);
  });
});

const string2DateFixture: Array<[string | null | undefined, Date | null]> = [
  ["", null],
  ["a", null],
  ["2011-02-04", new Date("2011-02-04")],
  [null, null],
  [undefined, null],
];

describe.each(string2DateFixture)("given %s", (inputValue, expValue) => {
  test(`string2Date returns ${expValue}`, () => {
    if (expValue === null) {
      expect(string2Date(inputValue)).toBeNull();
    } else {
      expect(string2Date(inputValue)).toEqual(expValue);
    }
  });
});
