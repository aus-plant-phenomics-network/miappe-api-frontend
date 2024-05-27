import { SchemaElementType, BaseSchema } from "../../components";

class InvestigationType extends BaseSchema {
  title: SchemaElementType = { type: "text", required: true };
  description: SchemaElementType = { type: "text" };
  submissionDate: SchemaElementType = { type: "date" };
  publicReleaseDate: SchemaElementType = { type: "date" };
  license: SchemaElementType = { type: "text" };
  publicationDoi: SchemaElementType = { type: "text" };
  website: SchemaElementType = { type: "text" };
  funding: SchemaElementType = { type: "text" };
}

const InvestigationSchema = new InvestigationType();

export { InvestigationType, InvestigationSchema };
