import React from "react";
import {
  BodyOwnProps,
  BodyRowComponentOwnProps,
  BodyRowOwnProps,
  HeaderOwnProps,
  TableOwnProps,
} from "./table.types";
import { Link } from "react-router-dom";
import { getDefaultValue, getTableDisplayKey } from "../helpers";
import { FetchDataSuccessType } from "../types";
import { useDelete } from "../hooks";
import { EditButton, DeleteAlertButton } from "../helper";
import "./table.css";

const Root = React.memo(
  React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
    (props, ref) => {
      const { children, ...rest } = props;
      return (
        <div className="TableRoot" {...rest} ref={ref}>
          <table className="Table">{children}</table>
        </div>
      );
    },
  ),
);

const Header = React.memo(
  React.forwardRef<
    HTMLTableRowElement,
    React.ComponentPropsWithoutRef<"thead"> & HeaderOwnProps
  >((props, ref) => {
    const { fields, ...rest } = props;
    return (
      <thead className="TableHead" {...rest}>
        <tr className="TableHeadRow">
          {fields &&
            fields.map(field => (
              <th colSpan={1} key={field} className="TableHeadHeader">
                {field}
              </th>
            ))}
          <th className="TableHeadHeader">Action</th>
        </tr>
      </thead>
    );
  }),
);

// ThemeName: TableBodyData
const BodyRowComponent = React.memo(
  React.forwardRef<
    HTMLTableCellElement,
    React.ComponentPropsWithoutRef<"td"> & BodyRowComponentOwnProps
  >((props, ref) => {
    const { href, ...rest } = props;

    const dialogOnSubmit = useDelete(href);

    return (
      <td {...rest} ref={ref}>
        <Link to={href}>
          <EditButton tooltipContent="Edit Entry" />
        </Link>
        <DeleteAlertButton
          tooltipContent="Delete Entry"
          dialogTitle="Remove Entry"
          dialogDescription="This action is PERMANENT. Are you sure you want to continue?"
          dialogCancelButtonName="Cancel"
          dialogSubmitButtonName="Proceed"
          dialogOnCancel={() => {}}
          dialogOnSubmit={dialogOnSubmit}
        />
      </td>
    );
  }),
);

const BodyRow = React.memo(
  React.forwardRef<
    HTMLTableRowElement,
    React.ComponentPropsWithoutRef<"tr"> & BodyRowOwnProps
  >((props, ref) => {
    const { rowItem, fields, ...rest } = props;
    const id = rowItem.id;
    const href = `${id}`;

    return (
      <tr key={id as string} {...rest} ref={ref}>
        {fields.map(field => (
          <td key={field} className="TableBodyData" colSpan={1}>
            {rowItem[field] ? rowItem[field] : ""}
          </td>
        ))}
        <BodyRowComponent href={href} className="TableBodyData" />
      </tr>
    );
  }),
);

const Body = React.memo(
  React.forwardRef<
    HTMLTableSectionElement,
    React.ComponentPropsWithoutRef<"tbody"> & BodyOwnProps
  >((props, ref) => {
    const { fields, fieldData, ...rest } = props;
    return (
      <tbody className="TableBody" {...rest} ref={ref}>
        {fieldData &&
          fieldData.length > 0 &&
          fieldData.map(rowItem => (
            <BodyRow
              key={rowItem.id as string}
              fields={fields}
              rowItem={rowItem}
              className="TableBodyRow"
            />
          ))}
      </tbody>
    );
  }),
);

const Table = React.memo(
  React.forwardRef<
    HTMLTableElement,
    React.ComponentPropsWithoutRef<"table"> & TableOwnProps
  >((props, ref) => {
    const { fieldData, fields, schema, ...rest } = props;
    // Process table display fields
    const tableFields = React.useMemo(
      () => fields.map(item => getTableDisplayKey(schema[item], item)),
      [JSON.stringify(fields)],
    );

    /** TODO: update this method to allow for reference field value replacement
     * TODO: profile to see at what level is JSON.stringify table data to avoid
     * rerendering worth it/not worth it
     */
    // Process display value
    const tableData = React.useMemo(
      () =>
        fieldData
          ? fieldData.map(dataItem => {
              return Object.fromEntries(
                Object.entries(dataItem).map(entry => {
                  if (entry[0] in schema) {
                    return [
                      entry[0],
                      getDefaultValue(schema[entry[0]], entry[1] as string),
                    ];
                  }
                  return entry;
                }),
              ) as FetchDataSuccessType;
            })
          : null,
      [JSON.stringify(fieldData)],
    );

    return (
      <Root {...rest} ref={ref}>
        <Header fields={tableFields} />
        <Body fields={fields} fieldData={tableData} />
      </Root>
    );
  }),
);

export { Root, Header, Body, BodyRow, BodyRowComponent, Table };
