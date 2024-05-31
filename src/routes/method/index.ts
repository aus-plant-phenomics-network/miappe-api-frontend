import { MethodSchema } from "./type";
import { createRoutes } from "../../factory";

const MethodRoutes = createRoutes(MethodSchema, "method", [
  "name",
  "description",
]);

export { MethodRoutes };
