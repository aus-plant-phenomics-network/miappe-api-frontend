import { SchemaElementType, BaseSchema } from "../../components";

class SampleType extends BaseSchema {
  title: SchemaElementType = { type: "text", required: true };
  description: SchemaElementType = { type: "text" };
  collectionDate: SchemaElementType = { type: "date", required: true };
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
}

const SampleSchema = new SampleType();

export { SampleType, SampleSchema };
