import { Handler } from "../../handlers";
import { createInputArray } from "../form";
import { FetchDataArrayType, FetchDataType, SchemaType } from "../types";
import { styled } from "@ailiyah-ui/factory";
import React from "react";
import { FormComponent } from "../form";
import {
  useLoaderData,
  Link as _Link,
  Form as _Form,
  useNavigate,
} from "react-router-dom";
import {
  PageSearchForm,
  NewItemButton,
  FieldSelection,
  SelectFieldsDropDown,
} from "./widget";
import { Table } from "../table";

function DetailPage({
  fields,
  schema,
  title,
  children,
}: {
  fields: string[];
  schema: SchemaType;
  title: string;
  children: React.ReactElement[];
}) {
  const fieldData = useLoaderData() as FetchDataArrayType<SchemaType>;
  const [displayFields, setDisplayFields] = React.useState<FieldSelection>(() =>
    Object.fromEntries(
      fields.map(field => {
        return [field, true];
      }),
    ),
  );
  const tableFields = Object.entries(displayFields)
    .filter(item => item[1])
    .map(item => item[0]);
  return (
    <styled.div themeName="PageRoot">
      <styled.h1 themeName="PageTitle">{title}</styled.h1>
      <styled.div themeName="PageComponent">
        {children}
        <SelectFieldsDropDown
          fields={displayFields}
          setFields={setDisplayFields}
          schema={schema}
        />
      </styled.div>
      <Table
        key={title}
        fields={tableFields}
        fieldData={fieldData}
        schema={schema}
      />
    </styled.div>
  );
}

function CreatePage({
  children,
  title,
}: {
  children: React.ReactElement[];
  title: string;
}) {
  const navigate = useNavigate();
  const onSubmit = React.useCallback(() => {
    navigate(-1);
  }, []);
  return (
    <styled.div themeName="PageRoot">
      <styled.h1 themeName="PageTitle">{title}</styled.h1>
      <styled.p themeName="PageDescription">
        Create a new {title} entry by filling out the form below.
      </styled.p>
      <FormComponent method="POST" navigate={false} onSubmit={onSubmit}>
        {children}
      </FormComponent>
      ;
    </styled.div>
  );
}

function UpdatePage({ schema, title }: { schema: SchemaType; title: string }) {
  const data = useLoaderData() as FetchDataType<typeof schema>;
  const updateComponents = React.useMemo(
    () => createInputArray(schema, [], data),
    [JSON.stringify(data)],
  );
  const navigate = useNavigate();
  const onSubmit = React.useCallback(() => {
    navigate(-1);
  }, []);
  return (
    <styled.div themeName="PageRoot">
      <styled.h1 themeName="PageTitle">{title}</styled.h1>
      <styled.p themeName="PageDescription">
        Update the current {title} entry by filling out the form below.
      </styled.p>
      <FormComponent method="PUT" navigate={false} onSubmit={onSubmit}>
        {updateComponents}
      </FormComponent>
      ;
    </styled.div>
  );
}

class Page<T extends SchemaType, Key extends string> {
  schema: T;
  handler: Handler<T, Key>;
  title: string;
  fields: string[];

  constructor(
    title: string,
    schema: T,
    handler: Handler<T, Key>,
    excludeKeys: string[] = ["createdAt", "updatedAt"],
  ) {
    this.schema = schema;
    this.handler = handler;
    this.title = title;
    this.fields = Object.keys(schema).filter(
      item => !excludeKeys.includes(item),
    );
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
      >
        <PageSearchForm />
        <NewItemButton title={this.title} />
      </DetailPage>
    );
  }
}

export { Page };
