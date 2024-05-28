import { FacilitySchema } from "./type";
import { createRoutes } from "../../factory";

const FacilityRoutes = createRoutes(FacilitySchema, "facility");

export { FacilityRoutes };
