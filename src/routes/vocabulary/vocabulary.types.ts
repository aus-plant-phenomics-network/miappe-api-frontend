import { AbstractDataType, AbstractSchemaType } from "../../handlers";

interface VocabularyType extends AbstractDataType {
  id?: string;
  title: string;
  description: string;
  relationshipType: string;
  externalReference: string;
  namespace: string;
}

type VocabularySchema = AbstractSchemaType<VocabularyType>;

export type { VocabularyType, VocabularySchema };
