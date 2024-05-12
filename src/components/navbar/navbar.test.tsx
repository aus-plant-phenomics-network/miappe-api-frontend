import { expect, describe, test, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavBarStoryComponent, NavBarWithRouter } from "./navbar.helpers";
import { theme } from "../../assets/theme";
import React from "react";
import { ActionFactory } from "./navbar.helpers";
import userEvent from "@testing-library/user-event";
import { NavDefinition } from "./navbar.types";
import { defaultData } from "./navbar";

const data: NavDefinition = (await import("../../assets/navItems.json"))
  .default;

const keys = Object.keys(data);

const Action = ActionFactory(userEvent);

const Validate = {
  NavBarContent: {
    isRendered: async () => {
      expect(document.querySelector(".NavBarContent")).not.toBeNull();
      expect(document.querySelector(".NavBarContent")).toBeVisible();
    },
    isExpanded: async () => {
      const component = document.querySelector(".NavBarContent");
      if (component?.hasAttribute("style")) {
        expect(component?.getAttribute("style")).toBe("");
      } else {
        expect(component?.getAttribute("style")).toBeNull();
      }
    },
    isCollapsed: async () => {
      expect(document.querySelector(".NavBarContent")).toHaveStyle(
        "width: 0px"
      );
    },
  },
  Accordion: {
    isRendered: async () => {
      expect(document.querySelector(".NavBarAccordionItem")).not.toBeNull();
      expect(document.querySelector(".NavBarAccordionItem")).toBeVisible();
    },
    isNotRendered: async () => {
      expect(document.querySelector(".NavBarAccordionItem")).toBeNull();
    },
    keysAreVisible: async () => {
      keys.forEach((item) => expect(screen.getByText(item)).toBeVisible());
    },
    itemsUnderKeysAreVisible: async (key: string) => {
      const value = Object.keys(data[key]);
      value.forEach((item) => expect(screen.getByText(item)).toBeVisible());
    },
    headersAreLink: () => {
      expect(() => screen.getAllByRole("link")).not.toThrow();
    },
    itemsUnderKeysAreNotInTheDocument: async (key: string) => {
      const value = Object.keys(data[key]);
      value.forEach((item) => expect(screen.queryByText(item)).toBeNull());
    },
  },
};

describe("Given parsedData, when first rendered", () => {
  beforeEach(() => {
    render(
      <NavBarStoryComponent themeValue={theme} parsedData={defaultData} />
    );
  });
  test("NavBarContent is rendered", Validate.NavBarContent.isRendered);
  test("NavBarContent is expanded", Validate.NavBarContent.isExpanded);
  test("Accordion labels are visible", Validate.Accordion.keysAreVisible);
  test("No Item is visible", async () =>
    keys.forEach((item) =>
      Validate.Accordion.itemsUnderKeysAreNotInTheDocument(item)
    ));
  describe("when clicking on trigger to collapse", () => {
    beforeEach(Action.clickExpandCollapseButton);
    test("NavBarContent is collapsed", Validate.NavBarContent.isCollapsed);
    describe("when clicking on trigger to expand", () => {
      beforeEach(Action.clickExpandCollapseButton);
      test("NavBarContent is expanded", Validate.NavBarContent.isExpanded);
    });
  });
  describe("when clicking on the first label", () => {
    beforeEach(async () => await Action.clickAccordionItem(keys[0]));
    test(`Accordion items under ${keys[0]} are visible`, async () =>
      Validate.Accordion.itemsUnderKeysAreVisible(keys[0]));
    test("Accordion items under others are not visible", async () => {
      keys
        .filter((item) => item !== keys[0])
        .forEach((item) =>
          Validate.Accordion.itemsUnderKeysAreNotInTheDocument(item)
        );
    });
    describe("when clicking on the first label again", () => {
      beforeEach(async () => await Action.clickAccordionItem(keys[0]));
      test(`Accordion items under ${keys[0]} are invisible`, async () =>
        Validate.Accordion.itemsUnderKeysAreNotInTheDocument(keys[0]));
      test("Accordion items under others are not visible", async () => {
        keys
          .filter((item) => item !== keys[0])
          .forEach((item) =>
            Validate.Accordion.itemsUnderKeysAreNotInTheDocument(item)
          );
      });
    });
    describe("when clicking on the second label", () => {
      beforeEach(async () => await Action.clickAccordionItem(keys[1]));
      test(`Accordion items under ${keys[0]} are visible`, async () =>
        Validate.Accordion.itemsUnderKeysAreVisible(keys[0]));
      test(`Accordion items under ${keys[1]} are visible`, async () =>
        Validate.Accordion.itemsUnderKeysAreVisible(keys[1]));
      test("Accordion items under others are not visible", async () => {
        keys
          .filter((item) => item !== keys[0] && item !== keys[1])
          .forEach((item) =>
            Validate.Accordion.itemsUnderKeysAreNotInTheDocument(item)
          );
      });
      describe("when clicking on the second label again", () => {
        beforeEach(async () => await Action.clickAccordionItem(keys[1]));
        test(`Accordion items under ${keys[0]} are visible`, async () =>
          Validate.Accordion.itemsUnderKeysAreVisible(keys[0]));
        test(`Accordion items under ${keys[1]} are invisible`, async () =>
          Validate.Accordion.itemsUnderKeysAreNotInTheDocument(keys[1]));
        test("Accordion items under others are not visible", async () => {
          keys
            .filter((item) => item !== keys[0] && item !== keys[1])
            .forEach((item) =>
              Validate.Accordion.itemsUnderKeysAreNotInTheDocument(item)
            );
        });
      });
    });
  });
});

describe("Given no parsedData, when first rendered", () => {
  beforeEach(() => {
    render(<NavBarStoryComponent themeValue={theme} parsedData={null} />);
  });
  test("NavBarContent is rendered", Validate.NavBarContent.isRendered);
  test("NavBarContent is expanded", Validate.NavBarContent.isExpanded);
  test("NavBarAccordion is not in the document", () => {
    Validate.Accordion.isNotRendered();
  });
});

describe("Given router context", () => {
  beforeEach(() => {
    render(<NavBarWithRouter />);
  });
  test("NavBarContent is rendered", Validate.NavBarContent.isRendered);
  test("NavBarContent is expanded", Validate.NavBarContent.isExpanded);
  test("Accordion labels are visible", Validate.Accordion.keysAreVisible);
  test("No Item is visible", async () =>
    keys.forEach((item) =>
      Validate.Accordion.itemsUnderKeysAreNotInTheDocument(item)
    ));
  describe("when clicking on the first label", () => {
    beforeEach(async () => await Action.clickAccordionItem(keys[0]));
    test(`Accordion items under ${keys[0]} are visible`, async () =>
      Validate.Accordion.itemsUnderKeysAreVisible(keys[0]));
    test("Accordion items under others are not visible", async () => {
      keys
        .filter((item) => item !== keys[0])
        .forEach((item) =>
          Validate.Accordion.itemsUnderKeysAreNotInTheDocument(item)
        );
    });
    test("Accordion items are link", async () => {
      Validate.Accordion.headersAreLink();
    });
  });
});
