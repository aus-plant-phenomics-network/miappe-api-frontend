import { createStateBox, createStateBoxChildren } from "@ailiyah-ui/box";
import React from "react";
import { InvestigationType } from "./investigation.types";
import { Table, createHeaders, createBody } from "../../components/table/table";
import { Link, useLoaderData } from "react-router-dom";
import { createForm, createInputArray } from "../../components/form";
import { InvestigationSchema } from "./investigation.types";
import { Form } from "react-router-dom";
import * as Button from "@ailiyah-ui/button";
import { styled } from "@ailiyah-ui/factory";

let schema: InvestigationSchema = (await import("./data.json")).default;

const investigationComponents = createInputArray(schema, ["id"]);

const InvestigationForm = createForm(investigationComponents);

export { InvestigationForm };

const [Box, useBoxContext] = createStateBox("Root");
const Component = createStateBoxChildren("div", "Component", useBoxContext);
const HEADERS = ["title", "description", "submissionDate"];
const THeader = createHeaders<InvestigationType>({
  title: "title",
  headers: HEADERS,
});

function InvestigationUpdate() {
  console.log("Update page");
  const data: InvestigationType | null = useLoaderData() as InvestigationType;
  console.log(data);
  const UpdateForm = React.useMemo(() => {
    const components = createInputArray(schema, [], data);
    return createForm(components);
  }, [JSON.stringify(data)]);
  return <UpdateForm method="PUT" />;
}

function InvestigationList() {
  const data: Array<InvestigationType> | null =
    useLoaderData() as Array<InvestigationType>;
  const TBody = createBody<InvestigationType>({
    bodyData: data,
    title: "title",
    fields: HEADERS,
  });
  return (
    <>
      <styled.h1>Investigation</styled.h1>
      <Form id="search-form" role="search">
        <input
          id="title"
          aria-label="Search title"
          placeholder="Search"
          type="search"
          name="title"
        />
        <div id="search-spinner" aria-hidden hidden={true} />
        <div className="sr-only" aria-live="polite"></div>
      </Form>
      <Link to="/investigation/create">
        <Button.AddButton />
      </Link>
      <Table>
        <THeader />
        <TBody />
      </Table>
    </>
  );
}

function InvestigationCreate() {
  return <InvestigationForm method="POST" />;
}

export { InvestigationCreate, InvestigationList, InvestigationUpdate };
