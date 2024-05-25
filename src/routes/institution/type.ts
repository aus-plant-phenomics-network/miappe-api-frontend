import { SchemaElementType, BaseSchema } from "../../components";

class InstitutionType extends BaseSchema {
  institutionTypeId: SchemaElementType = {
    type: "select",
    required: false,
    labelKey: "InstitutionType",
    fetcherKey: "vocabulary",
  };
  parentId: SchemaElementType = {
    type: "select",
    required: false,
    labelKey: "parentInstitution",
    fetcherKey: "institution",
    multiple: true,
  };
}

const InstitutionSchema = new InstitutionType();

export { InstitutionType, InstitutionSchema };
