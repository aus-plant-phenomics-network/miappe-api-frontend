import { FetchDataArrayType } from "../types";
import React from "react";
import * as Select from "./select";

const fetchData: FetchDataArrayType = [
  { id: "facility0", title: "firstFacility", description: "first facility" },
  { id: "facility1", title: "secondFacility", description: "second facility" },
  { id: "facility2", title: "thirdFacility", description: "third facility" },
  { id: "facility3", title: "fourthFacility", description: "fourth facility" },
];

interface SelectTestProps {
  name: string;
  required: boolean;
  onSubmit: (e: React.FormEvent) => void;
  fetchedData: FetchDataArrayType;
  multiple?: boolean;
  defaultValue?: string | string[];
}

const TestSelectComponent: React.FC<SelectTestProps> = ({
  onSubmit,
  fetchedData,
  defaultValue,
  multiple,
  name,
  required,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-x-4 w-1/2">
      <Select.Root
        name={name}
        required={required}
        multiple={multiple}
        placeholder="Select from dropdown"
        defaultValue={defaultValue}
      >
        <Select.Trigger>
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            sideOffset={5}
            align="start"
            hideWhenDetached={true}
            twWidth="w-[var(--radix-popover-trigger-width)]"
          >
            {fetchedData &&
              fetchedData.map(dataItem => (
                <Select.Item
                  themeName="SelectItem"
                  key={dataItem.id as string}
                  selectValue={dataItem.id as string}
                  textValue={dataItem.title as string}
                />
              ))}
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <button type="submit" className="border-w-2 p-4 bg-neutral-500">
        Submit
      </button>
    </form>
  );
};

export { fetchData, TestSelectComponent };
