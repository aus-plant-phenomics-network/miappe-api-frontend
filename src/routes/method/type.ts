import { SchemaElementType, BaseSchema } from "../../components";

class MethodType extends BaseSchema {
  name: SchemaElementType = { type: "text", required: true };
  description: SchemaElementType = { type: "text" };
  methodReferenceId: SchemaElementType = {
    type: "select",
    required: true,
    labelKey: "methodReference",
    fetcherKey: "vocabulary",
  };
  deviceId: SchemaElementType = {
    type: "select",
    required: false,
    labelKey: "device",
    fetcherKey: "device",
    titleKey: "name",
  };
}

const MethodSchema = new MethodType();

export { MethodType, MethodSchema };
