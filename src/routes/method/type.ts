import { SchemaElementType, BaseSchema } from "../../components";

class MethodType extends BaseSchema {
  methodTypeId: SchemaElementType = {
    type: "select",
    required: true,
    labelKey: "methodType",
    fetcherKey: "vocabulary",
  };
  deviceId: SchemaElementType = {
    type: "select",
    required: false,
    labelKey: "device",
    fetcherKey: "device",
  };
}

const MethodSchema = new MethodType();

export { MethodType, MethodSchema };
