import { DataFileSchema } from "./type";
import { createRoutes } from "../../factory";

const DataFileRoutes = createRoutes(DataFileSchema, "dataFile", [
  "dataFileLink",
  "dataFileDescription",
  "dataFileVersion",
]);

export { DataFileRoutes };
