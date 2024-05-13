import { InvestigationSchema } from "./type";
import { createRoutes } from "../../factory/factory";

const InvestigationRoutes = createRoutes(InvestigationSchema, "investigation");

export { InvestigationRoutes };
