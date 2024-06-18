import React from "react";
import { NavLink } from "react-router-dom";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as Accordion from "@radix-ui/react-accordion";
import * as PNavBar from "./primitive";
import "./accordion.css";
import "./navbar.css";

interface FieldDefinition {
  [key: string]: string;
}

interface NavDefinition {
  [key: string]: FieldDefinition;
}

const defaultData: NavDefinition = (await import("../../assets/navItems.json"))
  .default;

const Content: React.FC<{ value: FieldDefinition; useLink: boolean }> =
  React.memo(({ value, useLink }) => {
    return value ? (
      Object.entries(value).map(entry => {
        const [name, link] = entry;
        return (
          <Accordion.Content className="NavBarAccordionContent" key={name}>
            {useLink ? (
              <NavLink to={link}>
                {({ isActive }) => {
                  const [state, setState] = React.useState(false);
                  const dataState = state || isActive ? "active" : "inactive";
                  return (
                    <p
                      data-state={dataState}
                      onMouseEnter={() => setState(true)}
                      onMouseLeave={() => setState(false)}
                      className="NavBarAccordionContentLink"
                    >
                      {name}
                    </p>
                  );
                }}
              </NavLink>
            ) : (
              <p data-state="inactive" className="NavBarAccordionContentLink">
                {name}
              </p>
            )}
          </Accordion.Content>
        );
      })
    ) : (
      <></>
    );
  });

const NavItems: React.FC<{
  entry: [string, FieldDefinition];
  useLink: boolean;
}> = React.memo(({ entry, useLink }) => {
  const [key, value] = entry;
  return (
    <Accordion.Item value={key} key={key} className="NavBarAccordionItem">
      <Accordion.Trigger className="NavBarAccordionTrigger">
        {key}
        <ChevronDownIcon data-rotate="180" className="Icons" />
      </Accordion.Trigger>
      <hr />
      <div className="NavBarAccordionContentContainer">
        <Content useLink={useLink} value={value} />
      </div>
    </Accordion.Item>
  );
});

const NavBar: React.FC<{
  useLink: boolean;
  parsedData?: NavDefinition | null;
}> = React.memo(({ useLink, parsedData = defaultData }) => {
  return (
    <PNavBar.Root className="NavBarRoot">
      <PNavBar.Trigger className="NavBarTrigger" />
      <PNavBar.Content className="NavBarContent">
        <div className="NavBarContentBody">
          <Accordion.Root type="multiple">
            {parsedData &&
              Object.entries(parsedData).map(entry => (
                <NavItems key={entry[0]} entry={entry} useLink={useLink} />
              ))}
          </Accordion.Root>
        </div>
      </PNavBar.Content>
    </PNavBar.Root>
  );
});

export { NavBar, defaultData };
export type { FieldDefinition, NavDefinition };
