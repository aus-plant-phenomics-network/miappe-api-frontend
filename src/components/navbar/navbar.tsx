import React from "react";
import { Themed as PNavBar } from "@ailiyah-ui/navbar";
import { Accordion } from "@ailiyah-ui/accordion";
import { styled } from "@ailiyah-ui/factory";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { NavLink } from "react-router-dom";
import { NavDefinition, FieldDefinition } from "./navbar.types";

const StyledLink = styled(NavLink);
const defaultData: NavDefinition = (await import("../../assets/navItems.json"))
  .default;

const Content: React.FC<{ value: FieldDefinition; useLink: boolean }> =
  React.memo(({ value, useLink }) => {
    return value ? (
      Object.entries(value).map(entry => {
        const [name, link] = entry;
        return (
          <Accordion.Content themeName="NavBarAccordionContent" key={name}>
            {useLink ? (
              <StyledLink to={link}>
                {({ isActive }) => {
                  const [state, setState] = React.useState(false);
                  const dataState = state || isActive ? "active" : "inactive";
                  return (
                    <styled.p
                      data-state={dataState}
                      onMouseEnter={() => setState(true)}
                      onMouseLeave={() => setState(false)}
                      themeName="NavBarAccordionContentLink"
                    >
                      {name}
                    </styled.p>
                  );
                }}
              </StyledLink>
            ) : (
              <styled.p
                data-state="inactive"
                themeName="NavBarAccordionContentLink"
              >
                {name}
              </styled.p>
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
  const Icon = styled(ChevronDownIcon);
  return (
    <Accordion.Item value={key} key={key} themeName="NavBarAccordionItem">
      <Accordion.Trigger themeName="NavBarAccordionTrigger">
        {key}
        <Icon data-rotate="180" themeName="Icons" />
      </Accordion.Trigger>
      <hr />
      <styled.div themeName="NavBarAccordionContentContainer">
        <Content useLink={useLink} value={value} />
      </styled.div>
    </Accordion.Item>
  );
});

const NavBar: React.FC<{
  useLink: boolean;
  parsedData?: NavDefinition | null;
}> = React.memo(({ useLink, parsedData = defaultData }) => {
  return (
    <PNavBar.Root themeName="NavBarRoot">
      <PNavBar.Trigger themeName="NavBarTrigger" />
      <PNavBar.Content themeName="NavBarContent">
        <PNavBar.Body themeName="NavBarContentBody">
          <Accordion.Root type="multiple">
            {parsedData &&
              Object.entries(parsedData).map(entry => (
                <NavItems key={entry[0]} entry={entry} useLink={useLink} />
              ))}
          </Accordion.Root>
        </PNavBar.Body>
      </PNavBar.Content>
    </PNavBar.Root>
  );
});

export { NavBar, defaultData };
