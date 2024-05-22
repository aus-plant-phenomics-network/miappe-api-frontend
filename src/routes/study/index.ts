import { StudySchema } from "./type";
import { createRoutes } from "../../factory";

const StudyRoutes = createRoutes(StudySchema, "study");

export { StudyRoutes };
