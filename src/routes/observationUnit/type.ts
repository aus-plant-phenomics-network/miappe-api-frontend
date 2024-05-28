import { SchemaElementType, BaseSchema } from "../../components";

class ObservationUnitType extends BaseSchema {
  studyId: SchemaElementType = {
    type: "select",
    labelKey: "study",
    fetcherKey: "study",
  };
  facilityId: SchemaElementType = {
    type: "select",
    labelKey: "facility",
    fetcherKey: "facility",
  };
  observationUnitTypeId: SchemaElementType = {
    type: "select",
    required: true,
    labelKey: "observationUnitType",
    fetcherKey: "vocabulary",
  };
  parentId: SchemaElementType = {
    type: "select",
    labelKey: "parentObservationUnit",
    fetcherKey: "observationUnit",
    multiple: true,
  };
  biologicalMaterialId: SchemaElementType = {
    type: "select",
    labelKey: "biologicalMaterial",
    fetcherKey: "biologicalMaterial",
  };
  factorSetting: SchemaElementType = { type: "text" };
}

const ObservationUnitSchema = new ObservationUnitType();

export { ObservationUnitType, ObservationUnitSchema };
