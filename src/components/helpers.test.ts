import { capitalise, toSnakeCase } from "./helpers";
import { describe, expect, test } from "vitest";

const capitaliseFixture = [
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
