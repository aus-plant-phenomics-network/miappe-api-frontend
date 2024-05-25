import { SchemaElementType } from "../../components";
import { VariableSchema } from "../variable";

class BiologicalMaterialType extends VariableSchema {
  biologicalLocation: SchemaElementType = { type: "text" };
  materialSourceId: SchemaElementType = { type: "text" };
  materialSourceDoi: SchemaElementType = { type: "text" };
  materialSourceLocation: SchemaElementType = { type: "text" };
  materialSourceDescription: SchemaElementType = { type: "text" };
  preprocessingMethod: SchemaElementType = {
    type: "select",
    fetcherKey: "method",
  };
}

const BiologicalMaterialSchema = new BiologicalMaterialType();

export { BiologicalMaterialType, BiologicalMaterialSchema };
