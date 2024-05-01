import { styled } from "@ailiyah-ui/factory";
import { createBox, createLocationBox } from "@ailiyah-ui/box";
import React from "react";
import { InputArrayType, createForm, createInputArray } from "../factory";

import investigationData from "./data.json";
const investigationComponents = createInputArray(investigationData);

const InvestigationForm: React.FC<{}> = () => {
  return createForm(investigationComponents);
};

export { InvestigationForm };
