import React from "react";
import { Link as _Link, Form as _Form } from "react-router-dom";
import { styled } from "@ailiyah-ui/factory";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { createButton } from "@ailiyah-ui/button";
const Content = styled(Popover.Content);
import * as Popover from "@radix-ui/react-popover";
import { SchemaType } from "../components/types";
import { getTableDisplayKey } from "../components/helpers";

const Link = styled(_Link);
const Form = styled(_Form);
const SearchIcon = styled(MagnifyingGlassIcon);
const SearchButton = createButton(
  "Search Button",
  <SearchIcon themeName="Icons" />,
);

function NewItemButton({ title }: { title: string }) {
  return (
    <Link to={`/${title}/create`} themeName="WidgetNewButton">
      New Item
    </Link>
  );
}

function PageSearchForm() {
  return (
    <Form id="search-form" role="search" themeName="WidgetSearchForm">
      <SearchButton tooltipContent="Search" themeName="WidgetSearchButton" />
      <styled.input
        id="title"
        aria-label="Search title"
        placeholder="Search"
        type="search"
        name="title"
        themeName="WidgetSearchInput"
      />
    </Form>
  );
}

interface FieldSelection {
  [k: string]: boolean;
}

const FieldSelectionContent = ({
  fields,
  setFields,
  schema,
}: {
  fields: FieldSelection;
  setFields: React.Dispatch<React.SetStateAction<FieldSelection>>;
  schema: SchemaType;
}) => {
  return (
    <styled.div themeName="WidgetCheckBox">
      {fields &&
        Object.entries(fields).map(item => {
          const [key, value] = item;
          return (
            <styled.div key={key} themeName="WidgetCheckBoxItem">
              <styled.input
                themeName="WidgetCheckBoxInput"
                type="checkbox"
                checked={value}
                id={key}
                onChange={e =>
                  setFields(prevFields => {
                    return {
                      ...prevFields,
                      [key]: e.target.checked,
                    };
                  })
                }
              />
              <styled.label htmlFor={key} themeName="WidgetCheckBoxLabel">
                {getTableDisplayKey(schema[key], key)}
              </styled.label>
            </styled.div>
          );
        })}
    </styled.div>
  );
};

function SelectFieldsDropDown({
  fields,
  setFields,
  schema,
}: {
  fields: FieldSelection;
  setFields: React.Dispatch<React.SetStateAction<FieldSelection>>;
  schema: SchemaType;
}) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <styled.button themeName="WidgetNewButton">
          Columns
          <ChevronDownIcon />
        </styled.button>
      </Popover.Trigger>
      <Popover.Portal>
        <Content
          className="PopoverContent"
          themeName="WidgetPopoverContent"
          sideOffset={5}
          align="start"
          hideWhenDetached={true}
        >
          <FieldSelectionContent
            fields={fields}
            setFields={setFields}
            schema={schema}
          />
        </Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export { NewItemButton, PageSearchForm, SelectFieldsDropDown };

export type { FieldSelection };
