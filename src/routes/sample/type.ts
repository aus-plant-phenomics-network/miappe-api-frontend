import { SchemaElementType, BaseSchema } from "../../components";

class SampleType extends BaseSchema {
  observationUnitId: SchemaElementType = {
    type: "select",
    fetcherKey: "observationUnit",
    labelKey: "observationUnit",
  };
  plantStructuralDevelopmentStageId: SchemaElementType = {
    type: "select",
    fetcherKey: "vocabulary",
    labelKey: "plantStructuralDevelopmentStage",
  };
  plantAnatomicalEntityId: SchemaElementType = {
    type: "select",
    required: true,
    fetcherKey: "vocabulary",
    labelKey: "plantAnatomicalEntity",
  };
  collectionDate: SchemaElementType = {
    type: "date",
    required: true,
  };
}

const SampleSchema = new SampleType();

export { SampleType, SampleSchema };
