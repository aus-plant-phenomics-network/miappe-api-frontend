import { FetchDataArrayType, SchemaElementType } from "../types";
import React from "react";
import * as Select from "./select";
import { BaseSchema, parseFormData } from "../helpers";
import "./select.css";

const fetchData: FetchDataArrayType = [
  { id: "facility0", title: "firstFacility", description: "first facility" },
  { id: "facility1", title: "secondFacility", description: "second facility" },
  { id: "facility2", title: "thirdFacility", description: "third facility" },
  { id: "facility3", title: "fourthFacility", description: "fourth facility" },
  { id: "facility4", title: "fifthFacility", description: "fifth facility" },
  { id: "facility5", title: "sixthFacility", description: "sixth facility" },
  {
    id: "facility6",
    title: "seventhFacility",
    description: "seventh facility",
  },
  { id: "facility7", title: "eighthFacility", description: "eighth facility" },
  { id: "facility8", title: "ninthFacility", description: "ninth facility" },
  { id: "facility9", title: "tenthFacility", description: "tenth facility" },
];

interface SelectTestProps {
  required: boolean;
  onSubmit?: (e: React.FormEvent) => void;
  fetchedData?: FetchDataArrayType;
  multiple?: boolean;
  defaultValue?: string | string[];
  excludeId?: string;
}

const TestSelectComponent: React.FC<SelectTestProps> = ({
  fetchedData,
  defaultValue,
  multiple,
  required,
  onSubmit,
  excludeId,
}) => {
  const name = "facility";
  class TestSchema extends BaseSchema {
    facility: SchemaElementType = {
      type: "select",
      required: true,
      multiple: multiple,
    };
  }

  const schema = new TestSchema();
  const submit = onSubmit
    ? onSubmit
    : (e: React.FormEvent) => {
        e.preventDefault();
        alert("SubmitForm");
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        console.log(parseFormData(schema, formData));
      };

  const defaultValueMap = fetchedData?.reduce((acc, dataItem) => {
    acc.set(dataItem.id as string, dataItem.title as string);
    return acc;
  }, new Map<string, string>());
  return (
    <form
      onSubmit={submit}
      style={{ display: "flex", columnGap: "1rem", width: "50%" }}
    >
      <Select.Root
        name={name}
        required={required}
        multiple={multiple}
        placeholder="Select from dropdown"
        defaultValue={defaultValue}
        defaultValueMap={defaultValueMap}
        excludeId={excludeId}
        className="SelectRoot"
      >
        <Select.Trigger className="SelectTrigger">
          <Select.Value className="SelectValue" />
          <Select.Icon className="SelectIcon" />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            sideOffset={5}
            align="start"
            hideWhenDetached={true}
            className="SelectContent"
            style={{ width: "var(--radix-popover-trigger-width)" }}
          >
            <Select.Search className="SelectSearch" />
            <div className="SelectItemContainer">
              {fetchedData &&
                fetchedData.map(dataItem => (
                  <Select.Item
                    className="SelectItem"
                    key={dataItem.id as string}
                    selectValue={dataItem.id as string}
                    displayValue={dataItem.title as string}
                  />
                ))}
            </div>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <button
        type="submit"
        style={{
          padding: "1rem",
          backgroundColor: "var(--neutral-500)",
          borderWidth: "2px",
        }}
      >
        Submit
      </button>
    </form>
  );
};

export { fetchData, TestSelectComponent };
