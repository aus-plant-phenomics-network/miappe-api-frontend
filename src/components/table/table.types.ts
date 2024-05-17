import { SchemaType, FetchDataArrayType, FetchDataSuccessType } from "../types";

interface TableFields {
  fields: Array<string>;
}

type HeaderOwnProps = TableFields;

interface BodyOwnProps extends TableFields {
  fieldData: FetchDataArrayType;
}

interface TableOwnProps extends BodyOwnProps {
  schema: SchemaType;
}

interface BodyRowOwnProps extends TableFields {
  rowItem: FetchDataSuccessType;
}

interface BodyRowComponentOwnProps {
  href: string;
}

export type {
  HeaderOwnProps,
  BodyOwnProps,
  BodyRowOwnProps,
  BodyRowComponentOwnProps,
  TableOwnProps,
};
