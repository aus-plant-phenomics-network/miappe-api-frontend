import { Handler } from ".";
import { createInputArray } from "../components/form";
import {
  FetchDataArrayType,
  FetchDataType,
  SchemaType,
} from "../components/types";
import React from "react";
import { FormComponent } from "../components/form";
import { useLoaderData } from "react-router-dom";
import {
  PageSearchForm,
  NewItemButton,
  FieldSelection,
  SelectFieldsDropDown,
} from "./widget";
import { Table } from "../components/table";
import { usePrevious } from "../hooks";
import "./page.css";

function DetailPage({
  fields,
  schema,
  title,
  defaultColumns,
  children,
}: {
  fields: string[];
  schema: SchemaType;
  title: string;
  defaultColumns: string[];
  children: React.ReactElement[];
}) {
  const fieldData = useLoaderData() as FetchDataArrayType;

  // Props for field selection component
  const [displayFields, setDisplayFields] = React.useState<FieldSelection>(() =>
    Object.fromEntries(
      fields.map(field => {
        return [field, defaultColumns.includes(field)];
      }),
    ),
  );

  // Get fields to be displayed for table
  const tableFields = Object.entries(displayFields)
    .filter(item => item[1])
    .map(item => item[0]);

  return (
    <div className="PageRoot">
      <h1 className="PageTitle">{title}</h1>
      <div className="PageComponent">
        <SelectFieldsDropDown
          fields={displayFields}
          setFields={setDisplayFields}
          schema={schema}
        />
        {children}
      </div>
      <Table
        key={title}
        fields={tableFields}
        fieldData={fieldData}
        schema={schema}
      />
    </div>
  );
}

function CreatePage({
  children,
  title,
}: {
  children: React.ReactElement[];
  title: string;
}) {
  const onSubmit = usePrevious();
  return (
    <div className="PageRoot">
      <h1 className="PageTitle">{title}</h1>
      <p className="PageDescription">
        Create a new {title} entry by filling out the form below.
      </p>
      <FormComponent method="POST" navigate={false} onSubmit={onSubmit}>
        {children}
      </FormComponent>
    </div>
  );
}

function UpdatePage({ schema, title }: { schema: SchemaType; title: string }) {
  const data = useLoaderData() as FetchDataType;
  const updateComponents = React.useMemo(
    () => createInputArray(schema, data),
    [JSON.stringify(data)],
  );
  const onSubmit = usePrevious();
  return (
    <div className="PageRoot">
      <h1 className="PageTitle">{title}</h1>
      <p className="PageDescription">
        Update the current {title} entry by filling out the form below.
      </p>
      <FormComponent method="PUT" navigate={false} onSubmit={onSubmit}>
        {updateComponents}
      </FormComponent>
    </div>
  );
}

class Page<T extends SchemaType, Key extends string> {
  schema: T;
  handler: Handler<T, Key>;
  title: string;
  fields: string[];
  defaultColumns: string[];

  constructor(
    title: string,
    schema: T,
    defaultColumns: string[],
    handler: Handler<T, Key>,
  ) {
    this.schema = schema;
    this.handler = handler;
    this.title = title;
    this.fields = Object.keys(schema);
    this.defaultColumns = defaultColumns;
  }

  getCreatePage() {
    const components = createInputArray(this.schema);
    return (
      <CreatePage key={this.title} title={this.title}>
        {components}
      </CreatePage>
    );
  }

  getUpdatePage() {
    return (
      <UpdatePage key={this.title} title={this.title} schema={this.schema} />
    );
  }

  getDetailsPage() {
    return (
      <DetailPage
        title={this.title}
        schema={this.schema}
        fields={this.fields}
        key={this.title}
        defaultColumns={this.defaultColumns}
      >
        <PageSearchForm />
        <NewItemButton title={this.title} />
      </DetailPage>
    );
  }
}

export { Page };
