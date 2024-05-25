import { BaseSchema, SchemaElementType } from "../components";

class VariableSchema extends BaseSchema {
  timeInterval: SchemaElementType = { type: "text" };
  sampleInterval: SchemaElementType = { type: "text" };
  deviceTypeId: SchemaElementType = {
    type: "select",
    labelKey: "device",
    fetcherKey: "device",
  };
  unitTypeId: SchemaElementType = {
    type: "select",
    labelKey: "unit",
    fetcherKey: "unit",
  };
  variableTypeId: SchemaElementType = {
    type: "select",
    labelKey: "variableType",
    fetcherKey: "vocabulary",
  };
}

export { VariableSchema };
