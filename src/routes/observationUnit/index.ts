import { ObservationUnitSchema } from "./type";
import { createRoutes } from "../../factory";

const ObservationUnitRoutes = createRoutes(
  ObservationUnitSchema,
  "observationUnit",
  ["title", "location"],
);

export { ObservationUnitRoutes };
