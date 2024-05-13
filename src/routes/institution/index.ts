import { InstitutionSchema } from "./type";
import { createRoutes } from "../../factory/factory";

const InstitutionRoutes = createRoutes(InstitutionSchema, "institution");

export { InstitutionRoutes };
