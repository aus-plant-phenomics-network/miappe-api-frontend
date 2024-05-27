import { BaseSchema, SchemaElementType } from "../components";

class VariableSchema extends BaseSchema {
  timeInterval: SchemaElementType = { type: "text" };
  sampleInterval: SchemaElementType = { type: "text" };
  deviceId: SchemaElementType = {
    type: "select",
    labelKey: "device",
    fetcherKey: "device",
  };
  unitId: SchemaElementType = {
    type: "select",
    labelKey: "unit",
    fetcherKey: "unit",
  };
}

export { VariableSchema };
