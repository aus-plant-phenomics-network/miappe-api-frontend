import React from "react";
import { InputField } from "./form";
import { SchemaType, FetchDataType } from "../types";
import {
  getDefaultValue,
  getFetcherKey,
  getFormDisplayKey,
  getHiddenValue,
  getMultipleValue,
  getTitleKey,
  getPlaceHolderValue,
  getRequired,
} from "../helpers";

/**
 * Convenient factory method to create a list of input fields from input data - Data that contains fields that
 * do not require external data fetch. Note that other more complex fields can be appended to this array for
 * form rendering
 *
 * @params - schema - input schema
 * @params - data - data to initialise field value
 * @returns Array<InputField>
 */

const createInputArray = (
  schema: SchemaType,
  data?: FetchDataType,
): Array<React.ReactElement> => {
  const excludeId = data?.id as string;
  return Object.entries(schema)
    .filter(([key]) => key !== "_constructor-name_")
    .map(([key, schema]) => {
      const type = schema.type;
      const required = getRequired(schema);
      const placeholder = getPlaceHolderValue(schema, key);
      const hidden = getHiddenValue(schema);
      const defaultValue = getDefaultValue(schema, data?.[key] as string);
      const fetcherKey = getFetcherKey(schema, key);
      const labelKey = getFormDisplayKey(schema, key);
      const multiple = getMultipleValue(schema);
      const titleKey = getTitleKey(schema);
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
          titleKey={titleKey}
          multiple={multiple}
          excludeId={excludeId}
        />
      );
    });
};

export { createInputArray };
