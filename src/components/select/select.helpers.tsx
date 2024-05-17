import { FetchDataArrayType } from "../types";
import { SimpleSelect, SimpleSelectProps } from "./select";
import React from "react";

const fetchData: FetchDataArrayType = [
  { id: "facility0", title: "firstFacility", description: "first facility" },
  { id: "facility1", title: "secondFacility", description: "second facility" },
  { id: "facility2", title: "thirdFacility", description: "third facility" },
  { id: "facility3", title: "fourthFacility", description: "fourth facility" },
];

interface SimpleSelectTestProps extends SimpleSelectProps {
  onSubmit: (e: React.FormEvent) => void;
}

const SimpleSelectTestComponent: React.FC<SimpleSelectTestProps> = ({
  onSubmit,
  ...rest
}) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-x-4 w-1/2">
      <SimpleSelect {...rest} themeName="FormSelect" />
      <button type="submit" className="border-w-2 p-4 bg-neutral-500">
        Submit
      </button>
    </form>
  );
};

export { fetchData, SimpleSelectTestComponent };
