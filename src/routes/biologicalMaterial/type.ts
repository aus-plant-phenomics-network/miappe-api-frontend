import { SchemaElementType } from "../../components";
import { VariableSchema } from "../variable";

class BiologicalMaterialType extends VariableSchema {
  title: SchemaElementType = { type: "text", required: true };
  organismId: SchemaElementType = {
    type: "select",
    fetcherKey: "vocabulary",
    labelKey: "organism",
    required: true,
  };
  genus: SchemaElementType = { type: "text", required: true };
  species: SchemaElementType = { type: "text", required: true };
  infraspecificName: SchemaElementType = { type: "text" };
  biologicalMaterialLatitude: SchemaElementType = { type: "text" };
  biologicalMaterialLongitude: SchemaElementType = { type: "text" };
  biologicalMaterialAltitude: SchemaElementType = { type: "text" };
  biologicalMaterialCoordinatesUncertainty: SchemaElementType = {
    type: "text",
  };
  biologicalMaterialPreprocessing: SchemaElementType = { type: "text" };
  materialSourceId: SchemaElementType = { type: "text" };
  materialSourceDoi: SchemaElementType = { type: "text" };
  materialSourceLatitude: SchemaElementType = { type: "text" };
  materialSourceLongitude: SchemaElementType = { type: "text" };
  materialSourceAltitude: SchemaElementType = { type: "text" };
  materialSourceCoordinatesUncertainty: SchemaElementType = { type: "text" };
  materialSourceDescription: SchemaElementType = { type: "text" };
}

const BiologicalMaterialSchema = new BiologicalMaterialType();

export { BiologicalMaterialType, BiologicalMaterialSchema };
