import { SchemaElementType } from "../../components";
import { VariableSchema } from "../variable";

class EnvironmentType extends VariableSchema {
  parameter: SchemaElementType = { type: "text", required: true };
  setpoint: SchemaElementType = { type: "text" };
}

const EnvironmentSchema_ = new EnvironmentType();
const EnvironmentSchema: EnvironmentType = Object.assign(
  {
    parameter: { type: "text", required: true },
    setpoint: { type: "text" },
  },
  EnvironmentSchema_,
);

export { EnvironmentType, EnvironmentSchema };
