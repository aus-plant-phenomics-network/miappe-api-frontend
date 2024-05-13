type TypeLiterals = "text" | "select" | "date";
type RelationshipLiterals = "parent" | "children";

interface SchemaElementType {
  /** Type of form entry element */
  type: TypeLiterals;
  /** Whether users are required to fill form value */
  required: boolean;
  /** Place holder value or guide */
  placeholder?: string;
  /** Key to be used for fetcher - for id related key only */
  fetcherKey?: string;
  /** Key to be displayed as label for form data */
  labelKey?: string;
  /** Whether data should be hidden */
  hidden?: boolean;
  /** Whether this is a self-referencing field */
  selfReferencing?: boolean;
  /** Only holds for self-referencing fields - relationship between the form entry and the current entry */
  selfReferencingRelationship?: RelationshipLiterals;
}

interface SchemaType {
  id: SchemaElementType;
  title: SchemaElementType;
  description: SchemaElementType;
  [k: string]: SchemaElementType;
}

type DataType<T extends SchemaType> = {
  [k in keyof T]: string;
};

type FetchDataSuccessType<T extends SchemaType> = {
  [k in keyof T]: string | null;
};

type FetchDataType<T extends SchemaType> = FetchDataSuccessType<T> | null;
type FetchDataArrayType<T extends SchemaType> = Array<
  FetchDataSuccessType<T>
> | null;

interface HandlerType<T extends SchemaType> {
  getAllData: (title?: string | null) => Promise<Array<DataType<T> | null>>;
  getDataById: (id: string) => Promise<DataType<T> | null>;
  createData: (data: T) => Promise<DataType<T>>;
  updateData: (data: T, id: string) => Promise<DataType<T>>;
  deleteData: (id: string) => Promise<Response>;
}

type SubmissionElementType = string | Date | File | null;

type SubmissionFormType<T extends SchemaType> = {
  [k in keyof T]: SubmissionElementType;
};

export type {
  DataType,
  SchemaElementType,
  SchemaType,
  HandlerType,
  TypeLiterals,
  FetchDataType,
  FetchDataSuccessType,
  FetchDataArrayType,
  SubmissionElementType,
  SubmissionFormType,
};
