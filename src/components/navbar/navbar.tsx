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

const NavBar: React.FC<{
  useLink: boolean;
  parsedData?: NavDefinition | null;
}> = ({ useLink, parsedData = defaultData }) => {
  const Content = (value: FieldDefinition) =>
    Object.entries(value).map((entry) => {
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
    });

  const NavItems = (entry: [string, FieldDefinition]) => {
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
          {value && Content(value)}
        </styled.div>
      </Accordion.Item>
    );
  };

  return (
    <PNavBar.Root themeName="NavBarRoot">
      <PNavBar.Trigger themeName="NavBarTrigger" />
      <PNavBar.Content themeName="NavBarContent">
        <PNavBar.Body themeName="NavBarContentBody">
          <Accordion.Root type="multiple">
            {parsedData &&
              Object.entries(parsedData).map((entry) => NavItems(entry))}
          </Accordion.Root>
        </PNavBar.Body>
      </PNavBar.Content>
    </PNavBar.Root>
  );
};

export { NavBar, defaultData };
