import { SchemaElementType, BaseSchema } from "../../components";

class StudyType extends BaseSchema {
  objective: SchemaElementType = { type: "text", required: false };
  startDate: SchemaElementType = { type: "date", required: true };
  endDate: SchemaElementType = { type: "date", required: false };
  investigationId: SchemaElementType = {
    type: "select",
    required: true,
    fetcherKey: "investigation",
    labelKey: "investigation",
  };
}

const StudySchema = new StudyType();

export { StudyType, StudySchema };
