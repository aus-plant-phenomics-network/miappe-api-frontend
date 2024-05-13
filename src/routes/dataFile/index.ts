import { DataFileSchema } from "./type";
import { createRoutes } from "../../factory/factory";

const DataFileRoutes = createRoutes(DataFileSchema, "dataFile");

export { DataFileRoutes };
