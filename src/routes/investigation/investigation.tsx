import { createStateBox, createStateBoxChildren } from "@ailiyah-ui/box";
import React from "react";
import { InvestigationForm } from "./form";
import { InvestigationType } from "./investigation.types";
import { Table, createHeaders, createBody } from "../../components/table/table";
import { useLoaderData } from "react-router-dom";

const [Box, useBoxContext] = createStateBox("Root");
const Component = createStateBoxChildren("div", "Component", useBoxContext);
const HEADERS = ["title", "description", "submissionDate"];
const THeader = createHeaders<InvestigationType>({
  title: "title",
  headers: HEADERS,
});
function InvestigationDetails(data: InvestigationType) {}

function InvestigationList() {
  const data: Array<InvestigationType> | null =
    useLoaderData() as Array<InvestigationType>;
  const TBody = createBody<InvestigationType>({
    bodyData: data,
    title: "title",
    fields: HEADERS,
  });
  return (
    <Table>
      <THeader />
      <TBody />
    </Table>
  );
}

function InvestigationCreate() {
  return <InvestigationForm method="POST" />;
}

export { InvestigationCreate, InvestigationList, InvestigationDetails };
