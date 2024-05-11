import React from "react";
import { AbstractDataType, AbstractSchemaType } from "../../handlers";
import { InputField } from "../form/form";

const processDate = (value: string) => value.substring(0, 10);
const processText = (value: string | number) => value.toString();
const getDefaultValue = (
  type: string,
  value: string | number | undefined | null | Date
): string => {
  if (value) {
    switch (type) {
      case "date":
        return processDate(value as string);
      default:
        return processText(value as string);
    }
  }
  return "";
};

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
const createInputArray = <T extends AbstractDataType>(
  schema: AbstractSchemaType<T>,
  exclude: Array<String> = [],
  data?: T | null
): Array<React.ReactNode> => {
  return Object.entries(schema)
    .filter(([key, _]) => !exclude.includes(key))
    .map(([key, value], _) => {
      const schemaType = schema[key].type;
      const defaultDataValue = data ? data[key] : undefined;
      const hidden = key === "id";
      return (
        <InputField
          hidden={hidden}
          key={key}
          name={key}
          {...value}
          defaultValue={getDefaultValue(schemaType, defaultDataValue)}
        />
      );
    });
};

export { createInputArray, getDefaultValue };
