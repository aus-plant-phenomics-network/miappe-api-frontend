import { SchemaType, DataType, SchemaElementType } from "../types";

// Set up schema and data returned by loader

const BaseSchema: SchemaType = {
  id: { type: "text", required: true },
  title: { type: "text", required: true },
  description: { type: "text", required: true },
};

// Set up handler for loading data

// Set up loader route for getting data

// Components for storybook and test

// Actions and Validator for test

export { BaseSchema };
