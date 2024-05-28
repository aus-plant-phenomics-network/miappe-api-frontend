import { InvestigationSchema } from "./type";
import { createRoutes } from "../../factory";
const InvestigationRoutes = createRoutes(InvestigationSchema, "investigation", [
  "title",
  "description",
  "submissionDate",
]);

export { InvestigationRoutes };
