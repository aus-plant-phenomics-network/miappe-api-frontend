import { SchemaElementType, BaseSchema } from "../../components";

class DataFileType extends BaseSchema {
  dataFileLink: SchemaElementType = {
    type: "text",
    required: false,
    labelKey: "link",
  };
  dataFileVersion: SchemaElementType = {
    type: "text",
    required: true,
    labelKey: "version",
  };
  dataFileDescription: SchemaElementType = {
    type: "text",
    labelKey: "description",
  };
  studyId: SchemaElementType = {
    type: "select",
    required: true,
    fetcherKey: "study",
    labelKey: "study",
  };
}

const DataFileSchema = new DataFileType();

export { DataFileType, DataFileSchema };
