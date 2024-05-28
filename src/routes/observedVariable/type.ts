import { SchemaElementType } from "../../components";
import { VariableSchema } from "../variable";

class ObservedVariableType extends VariableSchema {
  methodId: SchemaElementType = {
    type: "select",
    labelKey: "method",
    fetcherKey: "method",
  };
}

const ObservedVariableSchema = new ObservedVariableType();

export { ObservedVariableType, ObservedVariableSchema };
