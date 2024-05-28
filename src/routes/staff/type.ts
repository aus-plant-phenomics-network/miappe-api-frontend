import { SchemaElementType, BaseSchema } from "../../components";

class StaffType extends BaseSchema {
  name: SchemaElementType = { type: "text", labelKey: "name" };
  role: SchemaElementType = { type: "text", labelKey: "role" };
  email: SchemaElementType = { type: "text", required: false };
  phone: SchemaElementType = { type: "text", required: false };
  orcid: SchemaElementType = { type: "text", required: false };
  institutionId: SchemaElementType = {
    type: "select",
    required: false,
    labelKey: "affiliation",
    fetcherKey: "institution",
    multiple: true,
  };
}

const StaffSchema = new StaffType();

export { StaffType, StaffSchema };
