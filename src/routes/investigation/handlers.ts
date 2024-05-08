import { createLoaderAction } from "../../handlers";
import { InvestigationType, InvestigationSchema } from "./investigation.types";

const INVESTIGATION_URL = "http://127.0.0.1:8000/investigation";

let schema: InvestigationSchema = (await import("./data.json")).default;

const LoaderAction = createLoaderAction<InvestigationType, "investigationId">(
  INVESTIGATION_URL,
  schema,
  "investigationId"
);

export { LoaderAction as InvestigationActions };
