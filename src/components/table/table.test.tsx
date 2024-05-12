import { screen, render } from "@testing-library/react";
import { expect, test, describe, beforeEach } from "vitest";
import { Table } from "./table";
import React from "react";

beforeEach(() => {
  render(<Table />);
});

test("when rendered, TableRoot is in the document", () => {
  const component = document.querySelector(".TableRoot");
  expect(component).toBeInTheDocument();
});

test("when rendered, Table is in the document", () => {
  const component = document.querySelector(".Table");
  expect(component).toBeInTheDocument();
});
