import { ObservedVariableSchema } from "./type";
import { createRoutes } from "../../factory";

const ObservedVariableRoutes = createRoutes(
  ObservedVariableSchema,
  "observedVariable",
);

export { ObservedVariableRoutes };
