import { capitalise } from "./helpers";
import { describe, expect, test } from "vitest";

const testFixture = [
  ["firstName", "FirstName"],
  ["lastName", "LastName"],
];

describe.each(testFixture)("given %s", (inputValue, expValue) => {
  test(`returns ${expValue}`, () => {
    expect(capitalise(inputValue)).toBe(expValue);
  });
});
