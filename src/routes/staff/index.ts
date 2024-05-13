import { StaffSchema } from "./type";
import { createRoutes } from "../../factory/factory";

const StaffRoutes = createRoutes(StaffSchema, "staff");

export { StaffRoutes };
