import { SchemaElementType } from "../../components";
import { VariableSchema } from "../variable";

class EnvironmentType extends VariableSchema {
  setpoint: SchemaElementType = { type: "text" };
}

const EnvironmentSchema = new EnvironmentType();

export { EnvironmentType, EnvironmentSchema };
