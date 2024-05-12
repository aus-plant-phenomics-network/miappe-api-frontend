import React from "react";
import { DataType, AbstractSchemaType } from "../../handlers";
import { InputField } from "../form/form";



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
const createInputArray = <T extends DataType>(
  schema: AbstractSchemaType<T>,
  exclude: Array<string> = [],
  data?: T | null,
): Array<React.ReactNode> => {
  return Object.entries(schema)
    .filter(key => !exclude.includes(key[0]))
    .map(([key, value]) => {
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
