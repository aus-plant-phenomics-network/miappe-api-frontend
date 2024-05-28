import { UnitSchema } from "./type";
import { createRoutes } from "../../factory";

const UnitRoutes = createRoutes(UnitSchema, "unit");

export { UnitRoutes };
