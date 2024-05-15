import { SchemaElementType, BaseSchema } from "../../components";

class InstitutionType extends BaseSchema {
  institutionTypeId: SchemaElementType = {
    type: "select",
    required: false,
    labelKey: "InstitutionType",
    fetcherKey: "vocabulary",
  };
  parent: SchemaElementType = {
    type: "select",
    required: false,
    labelKey: "parentInstitution",
    fetcherKey: "institution",
    selfReferencing: true,
    selfReferencingRelationship: "parent",
  };
}

const InstitutionSchema = new InstitutionType();

export { InstitutionType, InstitutionSchema };
