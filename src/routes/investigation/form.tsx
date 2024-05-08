import React from "react";
import { createForm, createInputArray } from "../../components/form";
import { InvestigationSchema } from "./investigation.types";

const investigationSchema: InvestigationSchema = require("./data.json");

const investigationComponents = createInputArray(investigationSchema);

const InvestigationForm = createForm(investigationComponents);

export { InvestigationForm };
