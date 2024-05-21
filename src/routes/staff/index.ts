import { StaffSchema } from "./type";
import { createRoutes } from "../../handlers/factory";

const StaffRoutes = createRoutes(StaffSchema, "staff");

export { StaffRoutes };
