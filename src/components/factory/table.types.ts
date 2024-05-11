import { AbstractDataType } from "../../handlers";

interface HeaderOwnProps<T extends AbstractDataType> {
  headers: Array<keyof T>;
  title?: keyof T;
}

interface BodyOwnProps<T extends AbstractDataType> {
  bodyData: Array<T> | null;
  fields: Array<keyof T>;
}

export type { HeaderOwnProps, BodyOwnProps };
