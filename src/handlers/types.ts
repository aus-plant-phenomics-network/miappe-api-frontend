interface AbstractDataType {
  [key: string]: string | number | Date | null | undefined;
}

interface SchemaElementType {
  type: string;
  required: boolean;
  placeholder?: string;
}

type AbstractFormDataType<T extends AbstractDataType> = {
  [K in keyof T]: string;
};

type AbstractSchemaType<T extends AbstractDataType> = {
  [K in keyof T]: SchemaElementType;
};

interface HandlerType<T extends AbstractDataType> {
  getAllData: () => Promise<Array<T>>;
  getDataById: (id: string) => Promise<T>;
  createData: (data: T) => Promise<T>;
  updateData: (data: T, id: string) => Promise<T>;
  deleteData: (id: string) => Promise<Response>;
}

export type {
  AbstractDataType,
  AbstractFormDataType,
  SchemaElementType,
  AbstractSchemaType,
  HandlerType,
};
