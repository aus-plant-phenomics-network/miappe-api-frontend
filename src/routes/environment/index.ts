import { EnvironmentSchema } from "./type";
import { createRoutes } from "../../factory";

const EnvironmentRoutes = createRoutes(EnvironmentSchema, "environment");

export { EnvironmentRoutes };
