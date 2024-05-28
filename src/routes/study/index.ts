import { StudySchema } from "./type";
import { createRoutes } from "../../factory";

const StudyRoutes = createRoutes(StudySchema, "study", [
  "title",
  "objective",
  "startDate",
]);

export { StudyRoutes };
