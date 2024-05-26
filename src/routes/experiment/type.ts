import { SchemaElementType, BaseSchema } from "../../components";

class ExperimentType extends BaseSchema {
  studyId: SchemaElementType = {
    type: "select",
    fetcherKey: "study",
    labelKey: "study",
    required: true,
  };
  startDate: SchemaElementType = { type: "date", required: true };
  endDate: SchemaElementType = { type: "date" };
  objective: SchemaElementType = { type: "text", required: true };
  experimentTypeId: SchemaElementType = {
    type: "select",
    required: true,
    fetcherKey: "vocabulary",
    labelKey: "experimentType",
  };
  facilityId: SchemaElementType = {
    type: "select",
    fetcherKey: "facility",
    labelKey: "facility",
  };
  observationUnitLevelHierarchy: SchemaElementType = { type: "text" };
  observationUnitDescription: SchemaElementType = { type: "text" };
  culturalPractices: SchemaElementType = { type: "text" };
  mapOfExperimentDesign: SchemaElementType = { type: "text" };
  staffId: SchemaElementType = {
    type: "select",
    multiple: true,
    labelKey: "staff",
    fetcherKey: "staff",
  };
}

const ExperimentSchema = new ExperimentType();

export { ExperimentType, ExperimentSchema };
