import { EventSchema } from "./type";
import { createRoutes } from "../../factory";

const EventRoutes = createRoutes(EventSchema, "event", [
  "title",
  "description",
]);

export { EventRoutes };
