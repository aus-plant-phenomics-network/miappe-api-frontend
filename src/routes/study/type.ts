import { SchemaElementType, BaseSchema } from "../../components";

class StudyType extends BaseSchema {
  title: SchemaElementType = { type: "text", required: true };
  objective: SchemaElementType = { type: "text", required: true };
  startDate: SchemaElementType = { type: "date", required: true };
  endDate: SchemaElementType = { type: "date" };
  investigationId: SchemaElementType = {
    type: "select",
    required: true,
    fetcherKey: "investigation",
    labelKey: "investigation",
  };
}

const StudySchema = new StudyType();

export { StudyType, StudySchema };
