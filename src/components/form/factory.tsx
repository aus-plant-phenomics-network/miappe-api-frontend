import React from "react";
import { InputField } from "./form";
import { SchemaType, FetchDataType } from "../types";
import {
  getDefaultValue,
  getFetcherKey,
  getHiddenValue,
  getLabelKey,
} from "../helpers";

/**
 * Convenient factory method to create a list of input fields from input data - Data that contains fields that
 * do not require external data fetch. Note that other more complex fields can be appended to this array for
 * form rendering
 *
 * @params - schema - input schema
 * @params - exclude - input fields to exclude from creation
 * @params - data - data to initialise field value
 * @returns Array<InputField>
 */
const createInputArray = <T extends SchemaType>(
  schema: T,
  exclude: Array<string> = [],
  data?: FetchDataType<T>,
): Array<React.ReactElement> => {
  return (
    Object.entries(schema)
      // Remove schema entries that are in exclude
      .filter(key => !exclude.includes(key[0]))
      .map(([key, schema]) => {
        const type = schema.type;
        const required = schema.required;
        const placeholder = schema.placeholder ? schema.placeholder : "";
        const hidden = getHiddenValue(schema, key);
        const defaultValue = getDefaultValue(schema, data?.[key]);
        const fetcherKey = getFetcherKey(schema, key);
        const labelKey = getLabelKey(schema, key);
        return (
          <InputField
            key={key}
            name={key}
            type={type}
            required={required}
            placeholder={placeholder}
            hidden={hidden}
            defaultValue={defaultValue}
            fetcherKey={fetcherKey}
            labelKey={labelKey}
          />
        );
      })
  );
};

export { createInputArray };
