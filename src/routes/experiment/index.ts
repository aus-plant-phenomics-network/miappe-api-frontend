import { ExperimentSchema } from "./type";
import { createRoutes } from "../../factory";

const ExperimentRoutes = createRoutes(ExperimentSchema, "experiment", [
  "title",
  "objective",
]);

export { ExperimentRoutes };
