import { SchemaElementType, BaseSchema } from "../../components";

class FacilityType extends BaseSchema {
  name: SchemaElementType = { type: "text", required: true };
  description: SchemaElementType = { type: "text" };
  facilityTypeId: SchemaElementType = {
    type: "select",
    labelKey: "facilityType",
    fetcherKey: "vocabulary",
  };
  institutionId: SchemaElementType = {
    type: "select",
    labelKey: "institution",
    fetcherKey: "institution",
    titleKey: "name",
  };
  address: SchemaElementType = { type: "text" };
  city: SchemaElementType = { type: "text" };
  region: SchemaElementType = { type: "text" };
  country: SchemaElementType = { type: "text" };
  postcode: SchemaElementType = { type: "text" };
  latitude: SchemaElementType = { type: "text" };
  longitude: SchemaElementType = { type: "text" };
  altitude: SchemaElementType = { type: "text" };
}

const FacilitySchema = new FacilityType();

export { FacilityType, FacilitySchema };
