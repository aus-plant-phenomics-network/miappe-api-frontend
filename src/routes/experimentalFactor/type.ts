import { SchemaElementType } from "../../components";
import { VariableSchema } from "../variable";

class ExperimentalFactorType extends VariableSchema {
  factorValues: SchemaElementType = { type: "text" };
}

const ExperimentalFactorSchema = new ExperimentalFactorType();

export { ExperimentalFactorType, ExperimentalFactorSchema };
