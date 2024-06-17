import React from "react";
import { Link, Form } from "react-router-dom";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Tooltip } from "../components/helper";
import * as Popover from "@radix-ui/react-popover";
import { SchemaType } from "../components/types";
import { getTableDisplayKey } from "../components/helpers";
import "./widget.css";

function NewItemButton({ title }: { title: string }) {
  return (
    <Link to={`/${title}/create`} className="WidgetNewButton">
      New Item
    </Link>
  );
}

function PageSearchForm() {
  return (
    <Form id="search-form" role="search" className="WidgetSearchForm">
      <Tooltip tooltipContent="Search">
        <button className="WidgetSearchButton">
          <MagnifyingGlassIcon className="Icons" />
        </button>
      </Tooltip>
      <input
        id="title"
        aria-label="Search title"
        placeholder="Search"
        type="search"
        name="title"
        className="WidgetSearchInput"
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
    <div className="WidgetCheckBox">
      {fields &&
        Object.entries(fields).map(item => {
          const [key, value] = item;
          return (
            <div key={key} className="WidgetCheckBoxItem">
              <input
                className="WidgetCheckBoxInput"
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
              <label htmlFor={key} className="WidgetCheckBoxLabel">
                {getTableDisplayKey(schema[key], key)}
              </label>
            </div>
          );
        })}
    </div>
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
        <button className="WidgetNewButton">
          Columns
          <ChevronDownIcon />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="WidgetPopoverContent PopoverContent"
          sideOffset={5}
          align="start"
          hideWhenDetached={true}
        >
          <FieldSelectionContent
            fields={fields}
            setFields={setFields}
            schema={schema}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export { NewItemButton, PageSearchForm, SelectFieldsDropDown };

export type { FieldSelection };
