import { StudySchema } from "./type";
import { createRoutes } from "../../handlers/factory";

const StudyRoutes = createRoutes(StudySchema, "study");

export { StudyRoutes };
