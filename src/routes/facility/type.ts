import { SchemaElementType, BaseSchema } from "../../components";

class FacilityType extends BaseSchema {
  facilityTypeId: SchemaElementType = {
    type: "select",
    required: true,
    labelKey: "facilityType",
    fetcherKey: "vocabulary",
  };
  institutionId: SchemaElementType = {
    type: "select",
    labelKey: "institution",
    fetcherKey: "institution",
  };
  address: SchemaElementType = { type: "text" };
  city: SchemaElementType = { type: "text" };
  region: SchemaElementType = { type: "text" };
  country: SchemaElementType = { type: "text" };
  postcode: SchemaElementType = { type: "text" };
  latitude: SchemaElementType = { type: "text" };
  longitude: SchemaElementType = { type: "text" };
  altitude: SchemaElementType = { type: "text" };
  environmentId: SchemaElementType = {
    type: "select",
    fetcherKey: "environment",
    labelKey: "environment",
    multiple: true,
  };
}

const FacilitySchema = new FacilityType();

export { FacilityType, FacilitySchema };
