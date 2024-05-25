import { DeviceSchema } from "./type";
import { createRoutes } from "../../factory";

const DeviceRoutes = createRoutes(DeviceSchema, "device");

export { DeviceRoutes };
