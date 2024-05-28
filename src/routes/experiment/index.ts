import { ExperimentSchema } from "./type";
import { createRoutes } from "../../factory";

const ExperimentRoutes = createRoutes(ExperimentSchema, "experiment");

export { ExperimentRoutes };
