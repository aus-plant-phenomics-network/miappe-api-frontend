type TypeLiterals = "text" | "select" | "date";

interface SchemaElementType {
  /** Type of form entry element */
  type: TypeLiterals;
  /** Whether users are required to fill form value */
  required?: boolean;
  /** Place holder value or guide */
  placeholder?: string;
  /** Key to be used for fetcher - for id related key only */
  fetcherKey?: string;
  /** Key to be displayed as label for form data */
  labelKey?: string;
  /** Whether select is single or multiple */
  multiple?: boolean;
  /** Whether to display form value */
  hidden?: boolean;
}

interface SchemaType {
  id: SchemaElementType;
  [k: string]: SchemaElementType;
}

type FetchDataSuccessType = {
  [k: string]: string | null | string[];
};

type FetchDataType = FetchDataSuccessType | null;

type FetchDataArrayType = Array<FetchDataSuccessType> | null;

type SubmissionElementType = string | string[] | Date | File | null;

type SubmissionFormType = {
  [k: string]: SubmissionElementType;
};

export type {
  SchemaElementType,
  TypeLiterals,
  SchemaType,
  FetchDataType,
  FetchDataSuccessType,
  FetchDataArrayType,
  SubmissionElementType,
  SubmissionFormType,
};
