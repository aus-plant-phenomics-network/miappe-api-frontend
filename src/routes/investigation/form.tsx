import React from "react";
import { createForm, createInputArray } from "../../components/form";
import { InvestigationSchema } from "./investigation.types";

let schema: InvestigationSchema = (await import("./data.json")).default;

const investigationComponents = createInputArray(schema, ["id"]);

const InvestigationForm = createForm(investigationComponents);

export { InvestigationForm };
