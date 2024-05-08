import { createStateBox, createStateBoxChildren } from "@ailiyah-ui/box";
import React from "react";
import { InvestigationForm } from "./form";
import { InvestigationType } from "./investigation.types";
import { Table } from "../../components/table/table";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import { string2Date } from "../../components";

const [Box, useBoxContext] = createStateBox("Root");
const Component = createStateBoxChildren("div", "Component", useBoxContext);

function InvestigationDetails(data: InvestigationType) {}

function InvestigationList() {
  const data: Array<InvestigationType> =
    useLoaderData() as Array<InvestigationType>;
  console.log(data);
  return (
    <Table
      data={data}
      fields={["title", "funding", "license", "submissionDate"]}
    />
  );
}

function InvestigationCreate() {
  return <InvestigationForm method="POST" />;
}

export { InvestigationCreate, InvestigationList, InvestigationDetails };
