import { AbstractDataType, AbstractSchemaType } from "../../handlers";

interface StudyType extends AbstractDataType {
  id?: string;
  title: string;
  description: string;
  startDate: string | Date;
  endDate: string | Date | null;
  objective: string;
  investigation: string;
}

type StudySchema = AbstractSchemaType<StudyType>;

export type { StudyType, StudySchema };
