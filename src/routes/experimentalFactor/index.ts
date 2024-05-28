import { ExperimentalFactorSchema } from "./type";
import { createRoutes } from "../../factory";

const ExperimentalFactorRoutes = createRoutes(
  ExperimentalFactorSchema,
  "experimentalFactor",
);

export { ExperimentalFactorRoutes };
