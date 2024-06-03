import { SampleSchema } from "./type";
import { createRoutes } from "../../factory";

const SampleRoutes = createRoutes(SampleSchema, "sample", [
  "title",
  "description",
]);

export { SampleRoutes };
