import { InvestigationType } from "./investigation.types";
import { InvestigationSchema } from "./investigation.types";
import { createPages } from "../../components/factory/page";

let schema: InvestigationSchema = (await import("./data.json")).default;

const [InvestigationList, InvestigationCreate, InvestigationUpdate] =
  createPages<InvestigationType>("investigation", schema, [
    "title",
    "description",
    "submissionDate",
  ]);

export { InvestigationCreate, InvestigationList, InvestigationUpdate };
