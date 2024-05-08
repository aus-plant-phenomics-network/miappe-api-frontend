import { createLoaderAction } from "../../handlers";
import { InvestigationType, InvestigationSchema } from "./investigation.types";

const INVESTIGATION_URL = "http://127.0.0.1:8000/investigation";

const schema: InvestigationSchema = require("./data.json");

const LoaderAction = createLoaderAction<InvestigationType, "investigationId">(
  INVESTIGATION_URL,
  schema,
  "investigationId"
);

export { LoaderAction as InvestigationActions };
