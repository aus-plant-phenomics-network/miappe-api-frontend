import { AbstractDataType, AbstractSchemaType } from "../../handlers";

interface InvestigationType extends AbstractDataType {
  id?: string;
  title: string;
  description: string;
  submissionDate: Date | null;
  publicReleaseDate: Date | null;
  license: string;
  publicationDoi: string;
  website: string;
  funding: string;
}

type InvestigationSchema = AbstractSchemaType<InvestigationType>;

export type { InvestigationType, InvestigationSchema };
