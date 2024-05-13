import {
  SchemaElementType,
  TypeLiterals,
  SchemaType,
  SubmissionElementType,
} from "./types";

/**
 * Get hidden prop value for an input/select element.
 *
 * If schema.hidden is provided, this value will be used. Otherwise,
 * returns true if key is id, false otherwise.
 *
 * @param schema - schema of given field
 * @param key - name prop of input/select
 * @returns - boolean results on whether the input/select element should be hidden
 */
const getHiddenValue = (schema: SchemaElementType, key: string): boolean => {
  if (schema.hidden !== null && schema.hidden !== undefined)
    return schema.hidden;
  return key === "id" ? true : false;
};

/**
 * Get defaultValue prop's value for an input or select element,
 * given value obtained from a remove server. This function is
 * used to set default value for a field in update form (PUT).
 *
 * If value type is date, extract only the date portion of the value
 *
 * @param schema - schema of given field. Used to determine the default value
 * @param value - value obtained from remote. Could be null
 * @returns value to be set as defaultValue prop for input/select
 */
const getDefaultValue = (
  schema: SchemaElementType,
  value: string | null | undefined,
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
const getTableDisplayKey = (schema: SchemaElementType, key: string): string => {
  if (schema.labelKey) return schema.labelKey;
  const capitalisedKey =
    key.length >= 1 ? key[0].toUpperCase() + key.slice(1) : key;
  return removeId(schema.type, capitalisedKey);
};

/**
 * Get fetcher key associated with select element. This fetcher key is used to get
 * the fetcher that loads data from corresponding route. For instance, a fetcher key
 * of `investigation` loads the fetched value from loader of `/investigation`.
 *
 * If provided in schema, schema.fetcherKey is returned. Otherwise remove the trailing
 * Id of the associated key (name prop of select element).
 *
 * The main use case of this is when fetcher key is different from param key or name prop of
 * the select element. For instance, in the backend, `Institution` has an attribute `institution_type`
 * that is an alias for `vocabulary`'s id. Hence key or name prop of schema should be `institutionType`
 * and schema.fetcherKey should be vocabulary (since vocabulary data is fetched from /vocabulary)
 *
 * @param schema - schema correspond to given key.
 * @param key - key of an entry in Schema. This is also the value of name prop of the select element
 * @returns - fetcherKey value
 */
const getFetcherKey = (schema: SchemaElementType, key: string): string => {
  if (schema.fetcherKey) return schema.fetcherKey;
  return removeId(schema.type, key);
};

/**
 * Utility method to remove trailing Id
 *
 * @param schema - provide type info. If type is not select, do nothing
 * @param key - key value
 * @returns - key with Id removed (if possible)
 */
const removeId = (type: TypeLiterals, key: string): string => {
  if (type === "select" && key.endsWith("Id"))
    return key.substring(0, key.length - 2);
  return key;
};

/**
 * Get associated submission value from FormData. By default, formData obtained via form submission
 * are string or File. Date type will not be serialised properly and will either not be accepted
 * by the backend or require processing in the backend which is not idea.
 *
 * This function simply returns the value as is if schema type is not date. Otherwise convert given
 * value to date if rawValue is not "".
 *
 * @param schema
 * @param rawValue
 * @returns
 */
const getSubmissionValue = (
  schema: SchemaElementType,
  rawValue: FormDataEntryValue,
): SubmissionElementType => {
  if (rawValue === "") return null;
  if (schema.type === "date" && typeof rawValue === "string")
    return new Date(rawValue);
  else return rawValue;
};

/**
 * ABC for schema type. This class can be extended to specify data schema.
 * This is to avoid having to define a schema.json file and a schema.type.ts
 * file with duplicated information
 */
class BaseSchema implements SchemaType {
  id: SchemaElementType = { type: "text", required: false, hidden: true };
  title: SchemaElementType = {
    type: "text",
    required: true,
    placeholder: "Enter Title",
  };
  description: SchemaElementType = {
    type: "text",
    required: false,
    placeholder: "Enter Description",
  };
  [k: string]: SchemaElementType;
}

export {
  getDefaultValue,
  getTableDisplayKey,
  getFetcherKey,
  getSubmissionValue,
  getHiddenValue,
  removeId,
  BaseSchema,
};
