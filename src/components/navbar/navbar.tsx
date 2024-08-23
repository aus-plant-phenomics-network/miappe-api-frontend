import React from "react";
import { NavLink } from "react-router-dom";
import * as PNavBar from "./primitive";
import "./accordion.css";
import "./navbar.css";

interface GroupType {
  [key: string]: string;
}

interface SchemaType {
  [key: string]: GroupType;
}

const Schema: SchemaType = {
  "Stage 1 - Onboarding": {
    Investigation: "investigation",
    Study: "study",
    Staff: "staff",
    Institution: "institution",
    Facility: "facility",
    Device: "device",
    "Biological Material": "biologicalMaterial",
  },
  "Stage 2 - Ongoing": {
    "Experimental Factor": "experimentalFactor",
    "Experimental Design": "experiment",
    Environment: "environment",
    "Observation Unit": "observationUnit",
    Sample: "sample",
    Event: "event",
  },
  "Stage 3 - Compilation": {
    "Observed Variable": "observedVariable",
    Method: "method",
    Unit: "unit",
    "Data File": "dataFile",
  },
  Ontology: {
    Vocabulary: "vocabulary",
  },
};

/**
 * NavBar component.
 *
 * Hierarchy:
 *
 * - NavBar
 * - - GroupComponent
 * - - - FieldComponent
 */
const NavBar: React.FC<Record<string, never>> = React.memo(() => {
  return (
    <PNavBar.Root className="NavBarRoot">
      <PNavBar.Trigger className="NavBarTrigger" />
      <PNavBar.Content className="NavBarContent">
        {Schema &&
          Object.entries(Schema).map(entry => (
            <GroupComponent key={entry[0]} entry={entry} />
          ))}
      </PNavBar.Content>
    </PNavBar.Root>
  );
});

/**
 * Group of field definition
 */
const GroupComponent: React.FC<{
  entry: [string, GroupType];
}> = React.memo(({ entry }) => {
  const [key, value] = entry;
  return (
    <div className="GroupContainer">
      <h1 className="GroupHeader">{key}</h1>
      <div className="FieldContainer">
        <FieldComponent value={value} />
      </div>
    </div>
  );
});

/**
 * Link to values
 */
const FieldComponent: React.FC<{ value: GroupType }> = React.memo(
  ({ value }) => {
    return value ? (
      Object.entries(value).map(entry => {
        const [name, link] = entry;
        return (
          <NavLink to={link} key={name}>
            {({ isActive }) => {
              const [state, setState] = React.useState(false);
              const dataState = state || isActive ? "active" : "inactive";
              return (
                <p
                  data-state={dataState}
                  onMouseEnter={() => setState(true)}
                  onMouseLeave={() => setState(false)}
                  className="FieldLink"
                >
                  {name}
                </p>
              );
            }}
          </NavLink>
        );
      })
    ) : (
      <></>
    );
  },
);

export { NavBar };
