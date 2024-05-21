import { DataFileSchema } from "./type";
import { createRoutes } from "../../handlers/factory";

const DataFileRoutes = createRoutes(DataFileSchema, "dataFile");

export { DataFileRoutes };
