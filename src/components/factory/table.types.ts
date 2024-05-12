import { DataType } from "../../handlers";

interface HeaderOwnProps<T extends DataType> {
  headers: Array<keyof T>;
  title?: keyof T;
}

interface BodyOwnProps<T extends DataType> {
  bodyData: Array<T> | null;
  fields: Array<keyof T>;
}

export type { HeaderOwnProps, BodyOwnProps };
