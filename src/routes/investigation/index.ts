import { InvestigationSchema } from "./type";
import { createRoutes } from "../../factory";
const InvestigationRoutes = createRoutes(InvestigationSchema, "investigation");

export { InvestigationRoutes };
