import * as React from "react";
import { NavBar as _NavBar } from "ailiyah-ui/src/components/themed";
import data from "../assets/navItems.json";
import { Accordion } from "ailiyah-ui/src/components/primitives";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { styled } from "ailiyah-ui/src/components/context";

interface FieldDefinition {
  [key: string]: string;
}

interface NavDefinition {
  [key: string]: FieldDefinition;
}

const parsedData: NavDefinition = data;

const NavBar: React.FC<{}> = () => {
  const Content = (value: FieldDefinition) =>
    Object.entries(value).map((entry) => {
      const [name, link] = entry;
      return (
        <Accordion.Content themeName="NavBarAccordionContent" key={name}>
          {name}
        </Accordion.Content>
      );
    });

  const NavItems = (entry) => {
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
        {value ? Content(value) : <></>}
        </styled.div>
      </Accordion.Item>
    );
  };

  return (
    <_NavBar.Root>
      <_NavBar.Trigger />
      <_NavBar.Content>
        <_NavBar.Body twOther="scrollbar-thin">
          <Accordion.Root type="multiple">
            {parsedData ? (
              Object.entries(parsedData).map((entry) => NavItems(entry))
            ) : (
              <></>
            )}
          </Accordion.Root>
        </_NavBar.Body>
      </_NavBar.Content>
    </_NavBar.Root>
  );
};

export { NavBar };
