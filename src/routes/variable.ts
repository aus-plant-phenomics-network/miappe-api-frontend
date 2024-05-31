import { BaseSchema, SchemaElementType } from "../components";

class VariableSchema extends BaseSchema {
  description: SchemaElementType = { type: "text" };
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
    titleKey: "name",
  };
  studyId: SchemaElementType = {
    type: "select",
    labelKey: "study",
    fetcherKey: "study",
    multiple: true,
  };
}

export { VariableSchema };
