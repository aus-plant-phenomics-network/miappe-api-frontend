import { SchemaElementType, BaseSchema } from "../../components";

class DataFileType extends BaseSchema {
  link: SchemaElementType = { type: "text", required: false };
  version: SchemaElementType = { type: "text", required: true };
  studyId: SchemaElementType = {
    type: "select",
    required: true,
    fetcherKey: "study",
    labelKey: "study",
  };
}

const DataFileSchema = new DataFileType();

export { DataFileType, DataFileSchema };
