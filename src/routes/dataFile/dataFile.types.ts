import { AbstractDataType, AbstractSchemaType } from "../../handlers";

interface DataFileType extends AbstractDataType {
  id?: string;
  title: string;
  description: string;
  dataFileVersion: string;
  dataFileLink: string;
  studyId: string;
}

type DataFileSchema = AbstractSchemaType<DataFileType>;

export type { DataFileType, DataFileSchema };
