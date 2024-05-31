import { SchemaElementType } from "../../components";
import { VariableSchema } from "../variable";

class ObservedVariableType extends VariableSchema {
  title: SchemaElementType = {
    type: "text",
    required: true,
  };
  methodId: SchemaElementType = {
    type: "select",
    labelKey: "method",
    fetcherKey: "method",
    titleKey: "name",
  };
  traitReferenceId: SchemaElementType = {
    type: "select",
    labelKey: "traitReference",
    fetcherKey: "vocabulary",
  };
}

const ObservedVariableSchema = new ObservedVariableType();

export { ObservedVariableType, ObservedVariableSchema };
