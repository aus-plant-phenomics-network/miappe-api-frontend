import { Meta, StoryObj } from "@storybook/react";
import { SelectMultiple } from "./form";
import { FetchDataArrayType, SchemaType } from "../types";
import React from "react";
import { ThemeProvider } from "@ailiyah-ui/context";
import { theme } from "../../assets/theme";

const SelectMultipleForm = ({
  name,
  required,
  defaultValue,
  fetchedData,
}: {
  name: string;
  required: boolean;
  defaultValue: string[];
  fetchedData: FetchDataArrayType<SchemaType>;
}) => {
  return (
    <ThemeProvider value={theme}>
      <form
        onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          for (const pair of formData.entries()) {
            console.log(pair);
          }
        }}
      >
        <SelectMultiple
          name={name}
          required={required}
          fetchedData={fetchedData}
          defaultValue={defaultValue}
        />
        <button type="submit">Submit</button>
      </form>
    </ThemeProvider>
  );
};

const meta: Meta<typeof SelectMultipleForm> = {
  component: SelectMultipleForm,
  title: "Select Multiple",
};

export default meta;

type Story = StoryObj<typeof SelectMultipleForm>;

const fetchData: FetchDataArrayType<SchemaType> = [
  { id: "facility0", title: "firstFacility", description: "first facility" },
  { id: "facility1", title: "secondFacility", description: "second facility" },
  { id: "facility2", title: "thirdFacility", description: "third facility" },
  { id: "facility3", title: "fourthFacility", description: "fourth facility" },
];

const defaultValueEmpty: string[] = [];

const defaultValue: string[] = ["facility0", "facility1"];

const defaultValueAll: string[] = fetchData.map(item => item.id!);

const FIXTURE = {
  fetchData: fetchData,
  name: "facility",
  required: true,
};

export const Default: Story = {
  args: {
    fetchedData: fetchData,
    name: "facility",
    required: false,
    defaultValue: defaultValue,
  },
};
