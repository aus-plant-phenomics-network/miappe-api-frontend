import { StaffSchema } from "./type";
import { createRoutes } from "../../factory";

const StaffRoutes = createRoutes(StaffSchema, "staff");

export { StaffRoutes };
