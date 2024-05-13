import { SchemaElementType, BaseSchema } from "../../components";

class InvestigationType extends BaseSchema {
  submissionDate: SchemaElementType = { type: "date", required: false };
  publicReleaseDate: SchemaElementType = { type: "date", required: false };
  license: SchemaElementType = { type: "text", required: false };
  publicationDoi: SchemaElementType = { type: "text", required: false };
  website: SchemaElementType = { type: "text", required: false };
  funding: SchemaElementType = { type: "text", required: false };
}

const InvestigationSchema = new InvestigationType();

export { InvestigationType, InvestigationSchema };
