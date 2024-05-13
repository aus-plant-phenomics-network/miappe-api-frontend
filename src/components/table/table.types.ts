import React from "react";
import { SchemaType, FetchDataArrayType, FetchDataSuccessType } from "../types";

interface TableFields {
  fields: Array<string>;
}

type HeaderOwnProps = TableFields;

interface BodyOwnProps extends TableFields {
  fieldData: FetchDataArrayType<SchemaType>;
}

interface BodyRowOwnProps extends TableFields {
  rowItem: FetchDataSuccessType<SchemaType>;
}

interface BodyRowComponentOwnProps {
  href: string;
}

export type {
  HeaderOwnProps,
  BodyOwnProps,
  BodyRowOwnProps,
  BodyRowComponentOwnProps,
};
