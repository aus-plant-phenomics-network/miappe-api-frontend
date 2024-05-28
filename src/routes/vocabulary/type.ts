import { SchemaElementType, BaseSchema } from "../../components";

class VocabularyType extends BaseSchema {
  title: SchemaElementType = { type: "text", required: true };
  relationshipType: SchemaElementType = { type: "text", required: false };
  accessionNumber: SchemaElementType = { type: "text", required: false };
  externalReference: SchemaElementType = { type: "text", required: false };
  namespace: SchemaElementType = { type: "text", required: false };
}

const VocabularySchema = new VocabularyType();

export { VocabularyType, VocabularySchema };
