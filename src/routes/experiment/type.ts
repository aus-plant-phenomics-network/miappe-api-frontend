import { SchemaElementType, BaseSchema } from "../../components";

class ExperimentType extends BaseSchema {
  title: SchemaElementType = { type: "text", required: true };
  objective: SchemaElementType = { type: "text" };
  startDate: SchemaElementType = { type: "date" };
  endDate: SchemaElementType = { type: "date" };
  observationUnitLevelHierarchy: SchemaElementType = { type: "text" };
  observationUnitLevelDescription: SchemaElementType = { type: "text" };
  culturalPractices: SchemaElementType = { type: "text" };
  mapOfExperimentalDesign: SchemaElementType = { type: "text" };
  descriptionOfExperimentalDesign: SchemaElementType = {
    type: "text",
    labelKey: "description",
  };
  experimentTypeId: SchemaElementType = {
    type: "select",
    required: true,
    fetcherKey: "vocabulary",
    labelKey: "experimentType",
  };
  studyId: SchemaElementType = {
    type: "select",
    fetcherKey: "study",
    labelKey: "study",
    required: true,
  };
  facilityId: SchemaElementType = {
    type: "select",
    fetcherKey: "facility",
    labelKey: "facility",
    multiple: true,
    titleKey: "name",
  };
  staffId: SchemaElementType = {
    type: "select",
    multiple: true,
    labelKey: "staff",
    fetcherKey: "staff",
    titleKey: "name",
  };
}

const ExperimentSchema = new ExperimentType();

export { ExperimentType, ExperimentSchema };
