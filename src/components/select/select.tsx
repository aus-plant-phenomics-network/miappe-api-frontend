import React from "react";
import { FetchDataArrayType } from "../types";
import { TailwindComponentProps, styled } from "@ailiyah-ui/factory";

interface SimpleSelectProps {
  name: string;
  required: boolean;
  defaultValue?: string;
  fetchedData: FetchDataArrayType;
}

const SimpleSelect = React.memo(
  React.forwardRef<
    HTMLSelectElement,
    SimpleSelectProps & Omit<TailwindComponentProps<"select">, "defaultValue">
  >((props, ref) => {
    const { name, required, defaultValue, fetchedData, ...rest } = props;
    return (
      <styled.select
        aria-label={`${name}-select`}
        ref={ref}
        {...rest}
        name={name}
        required={required}
        defaultValue={defaultValue}
      >
        {!defaultValue && (
          <option value="" hidden label="Select from dropdown" />
        )}
        {fetchedData &&
          fetchedData.length > 0 &&
          fetchedData.map(dataItem => (
            <option
              key={dataItem.id as string}
              value={dataItem.id as string}
              label={dataItem.title as string}
            />
          ))}
      </styled.select>
    );
  }),
);

export { SimpleSelect };

export type { SimpleSelectProps };
