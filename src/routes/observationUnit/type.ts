import { SchemaElementType, BaseSchema } from "../../components";

class ObservationUnitType extends BaseSchema {
  title: SchemaElementType = { type: "text", required: true };
  location: SchemaElementType = { type: "text" };
  facilityId: SchemaElementType = {
    type: "select",
    fetcherKey: "facility",
    labelKey: "facility",
    titleKey: "name",
  };
  observationUnitTypeId: SchemaElementType = {
    type: "select",
    fetcherKey: "vocabulary",
    labelKey: "observationUnitType",
    required: true,
  };
  biologicalMaterialId: SchemaElementType = {
    type: "select",
    fetcherKey: "biologicalMaterial",
    labelKey: "biologicalMaterial",
    required: true,
  };
  experimentalFactorId: SchemaElementType = {
    type: "select",
    fetcherKey: "experimentalFactor",
    labelKey: "experimentalFactor",
    multiple: true,
    required: true,
    titleKey: "title",
  };
  studyId: SchemaElementType = {
    type: "select",
    required: true,
    fetcherKey: "study",
    labelKey: "study",
    multiple: true,
  };
  parentId: SchemaElementType = {
    type: "select",
    fetcherKey: "observationUnit",
    labelKey: "parent",
    multiple: true,
  };
}

const ObservationUnitSchema = new ObservationUnitType();

export { ObservationUnitType, ObservationUnitSchema };
