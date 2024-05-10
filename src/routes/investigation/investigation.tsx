import { createStateBox, createStateBoxChildren } from "@ailiyah-ui/box";
import React from "react";
import { InvestigationType } from "./investigation.types";
import { Table, createHeaders, createBody } from "../../components/table/table";
import { Link, useLoaderData } from "react-router-dom";
import { FormComponent, createInputArray } from "../../components/form";
import { InvestigationSchema } from "./investigation.types";
import { Form } from "react-router-dom";
import * as Button from "@ailiyah-ui/button";
import { styled } from "@ailiyah-ui/factory";
import { AbstractDataType, AbstractSchemaType } from "../../handlers";

let schema: InvestigationSchema = (await import("./data.json")).default;

const createPages = <T extends AbstractDataType>(
  title: string,
  schema: AbstractSchemaType<T>,
  headers: Array<keyof T>
) => {
  const components = createInputArray<T>(schema, ["id"]);
  const THeader = createHeaders<T>({
    title: "title",
    headers: headers,
  });
  const DetailPage: React.FC<{}> = () => {
    const data = useLoaderData() as Array<T> | null;
    const TBody = createBody<T>({
      bodyData: data,
      fields: headers,
    });
    return (
      <styled.div>
        <styled.h1 themeName="PageTitle">{title}</styled.h1>
        <Form id="search-form" role="search">
          <styled.div>
            <styled.input
              id="title"
              aria-label="Search title"
              placeholder="Search"
              type="search"
              name="title"
              themeName="PageSearchInput"
            />
            <Link to={`/${title}/create`}>
              <Button.AddButton type="button" tooltipContent="New" />
            </Link>
          </styled.div>
        </Form>
        <Table>
          <THeader />
          <TBody />
        </Table>
      </styled.div>
    );
  };
  const CreatePage: React.FC<{}> = () => {
    return <FormComponent method="POST">{components}</FormComponent>;
  };
  const UpdatePage: React.FC<{}> = () => {
    const data = useLoaderData() as T | null;
    const updateComponents = React.useMemo(
      () => createInputArray(schema, [], data),
      [JSON.stringify(data)]
    );
    return <FormComponent method="PUT">{updateComponents}</FormComponent>;
  };
  return [DetailPage, CreatePage, UpdatePage];
};

const [InvestigationList, InvestigationCreate, InvestigationUpdate] =
  createPages<InvestigationType>("investigation", schema, [
    "title",
    "description",
    "submissionDate",
  ]);

export { InvestigationCreate, InvestigationList, InvestigationUpdate };
