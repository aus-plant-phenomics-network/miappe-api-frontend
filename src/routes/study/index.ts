import { StudySchema } from "./type";
import { createRoutes } from "../../factory/factory";

const StudyRoutes = createRoutes(StudySchema, "study");

export { StudyRoutes };
