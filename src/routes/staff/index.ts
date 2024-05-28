import { StaffSchema } from "./type";
import { createRoutes } from "../../factory";

const StaffRoutes = createRoutes(StaffSchema, "staff", [
  "name",
  "role",
  "orcid",
]);

export { StaffRoutes };
