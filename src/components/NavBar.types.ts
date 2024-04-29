interface FieldDefinition {
  [key: string]: string;
}

interface NavDefinition {
  [key: string]: FieldDefinition;
}

export type { FieldDefinition, NavDefinition };
