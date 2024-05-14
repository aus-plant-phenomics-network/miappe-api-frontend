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
import { Table } from "../table";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { createButton } from "@ailiyah-ui/button";

const Link = styled(_Link);
const Form = styled(_Form);
const SearchIcon = styled(MagnifyingGlassIcon);
const SearchButton = createButton(
  "Search Button",
  <SearchIcon themeName="Icons" />,
);

function NewItemButton({ title }: { title: string }) {
  return (
    <Link to={`/${title}/create`} themeName="PageNewButton">
      New Item
    </Link>
  );
}

function PageSearchForm() {
  return (
    <Form id="search-form" role="search" themeName="PageSearchForm">
      <SearchButton tooltipContent="Search" themeName="PageSearchButton" />
      <styled.input
        id="title"
        aria-label="Search title"
        placeholder="Search"
        type="search"
        name="title"
        themeName="PageSearchInput"
      />
    </Form>
  );
}

function DetailPage({
  schema,
  title,
  children,
}: {
  schema: SchemaType;
  title: string;
  children: React.ReactElement[];
}) {
  const fieldData = useLoaderData() as FetchDataArrayType<SchemaType>;
  const fields = Object.keys(schema);
  return (
    <styled.div themeName="PageRoot">
      <styled.h1 themeName="PageTitle">{title}</styled.h1>
      <styled.div themeName="PageComponent">{children}</styled.div>
      <Table
        key={title}
        fields={fields}
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

  constructor(title: string, schema: T, handler: Handler<T, Key>) {
    this.schema = schema;
    this.handler = handler;
    this.title = title;
  }

  getCreatePage() {
    const components = createInputArray(this.schema);
    return <CreatePage title={this.title}>{components}</CreatePage>;
  }

  getUpdatePage() {
    return <UpdatePage title={this.title} schema={this.schema} />;
  }

  getDetailsPage() {
    return (
      <DetailPage title={this.title} schema={this.schema}>
        <PageSearchForm />
        <NewItemButton title={this.title} />
      </DetailPage>
    );
  }
}

export { Page };
