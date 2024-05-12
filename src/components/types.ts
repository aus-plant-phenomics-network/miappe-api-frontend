interface SchemaElementType {
  /** Type of form entry element */
  type: "text" | "select" | "date";
  /** Whether users are required to fill form value */
  required: boolean;
  /** Place holder value or guide */
  placeholder?: string;
  /** Key to be used for fetcher - for id related key only */
  fetcherKey?: string;
  /** Key to be displayed as label for form data */
  labelKey?: string;
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

interface HandlerType<T extends SchemaType> {
  getAllData: (title?: string | null) => Promise<Array<DataType<T> | null>>;
  getDataById: (id: string) => Promise<DataType<T> | null>;
  createData: (data: T) => Promise<DataType<T>>;
  updateData: (data: T, id: string) => Promise<DataType<T>>;
  deleteData: (id: string) => Promise<Response>;
}

export type { DataType, SchemaElementType, SchemaType, HandlerType };
