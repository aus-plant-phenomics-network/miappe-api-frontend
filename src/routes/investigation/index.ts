import { InvestigationSchema } from "./type";
import { createRoutes } from "../../handlers/factory";

const InvestigationRoutes = createRoutes(InvestigationSchema, "investigation");

export { InvestigationRoutes };
