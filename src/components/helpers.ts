import { SchemaElementType } from "./types";

/**
 * Get defaultValue prop's value for an input or select element,
 * given value obtained from a remove server. This function is
 * used to set default value for a field in update form (PUT).
 *
 * If value type is date, extract only the date portion of the value
 *
 * @param schema - schema of given field. Used to determine the default value
 * @param value - value obtained from remote. Could be undefined or null
 * @returns value to be set as defaultValue prop for input/select
 */
const getDefaultValue = (
  schema: SchemaElementType,
  value: string | undefined | null,
): string => {
  if (value) {
    switch (schema.type) {
      case "date":
        return value.substring(0, 10);
      default:
        return value;
    }
  }
  return "";
};

/**
 * Get the string to be display as label for input/select element. If
 * provided in schema, the schema value will be used. Otherwise, capitalise
 * the key associated with the schema and return it, or additionally remove
 * the trailing Id if schema type is select.
 *
 * The main use case of this is when label key is different from submission key
 * (the key param or the name of corresponding input/select). For instance, `Study`
 * references `Investigation` with `investigation_id` attribute in the backend.
 * Key or input name is thus set as `investigationId`. If labelKey is not provided,
 * the label value will be `investigation`
 *
 * @param schema - schema correspond to given key.
 * @param key - key of an entry in Schema
 * @returns string display value of label
 */
const getLabelKey = (schema: SchemaElementType, key: string): string => {
  if (schema.labelKey) return schema.labelKey;
  const processedKey =
    key.length >= 1 ? key[0].toUpperCase() + key.slice(1) : key;
  return removeId(schema, processedKey);
};

const getFetcherKey = (schema: SchemaElementType, key: string): string => {
  if (schema.fetcherKey) return schema.fetcherKey;
  return removeId(schema, key);
};

const removeId = (schema: SchemaElementType, key: string): string => {
  if (schema.type === "select" && key.endsWith("Id"))
    return key.substring(0, key.length - 2);
  return key;
};

const getSubmissionValue = (
  schema: SchemaElementType,
  rawValue: FormDataEntryValue,
): string | Date | File => {
  if (schema.type === "date" && typeof rawValue === "string")
    return new Date(rawValue);
  else return rawValue;
};

export { getDefaultValue, getLabelKey, getFetcherKey, getSubmissionValue };
