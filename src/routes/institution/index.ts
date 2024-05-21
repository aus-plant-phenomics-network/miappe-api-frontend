import { InstitutionSchema } from "./type";
import { createRoutes } from "../../handlers/factory";

const InstitutionRoutes = createRoutes(InstitutionSchema, "institution");

export { InstitutionRoutes };
