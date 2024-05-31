import { SchemaElementType, BaseSchema } from "../../components";

class DeviceType extends BaseSchema {
  name: SchemaElementType = {type: "text", required: true};
  deviceTypeId: SchemaElementType = {
    type: "select",
    required: true,
    labelKey: "deviceType",
    fetcherKey: "vocabulary",
  };
  brand: SchemaElementType = { type: "text" };
  serialNumber: SchemaElementType = { type: "text" };
  constructorModel: SchemaElementType = { type: "text" };
  startupDate: SchemaElementType = { type: "date" };
  removalDate: SchemaElementType = { type: "date" };
}

const DeviceSchema = new DeviceType();

export { DeviceType, DeviceSchema };
