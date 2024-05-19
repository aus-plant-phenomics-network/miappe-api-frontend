import React from "react";
import { TailwindComponentProps, styled } from "@ailiyah-ui/factory";
import {
  BodyOwnProps,
  BodyRowComponentOwnProps,
  BodyRowOwnProps,
  HeaderOwnProps,
  TableOwnProps,
} from "./table.types";
import { Link } from "react-router-dom";
import { EditButton, DeleteAlertButton } from "@ailiyah-ui/button";
import { getDefaultValue, getTableDisplayKey } from "../helpers";
import { FetchDataSuccessType, SchemaType } from "../types";
import { useDelete } from "../hooks";

const Root = React.memo(
  React.forwardRef<HTMLDivElement, TailwindComponentProps<"div">>(
    (props, ref) => {
      const { children, ...rest } = props;
      return (
        <styled.div themeName="TableRoot" {...rest} ref={ref}>
          <styled.table themeName="Table">{children}</styled.table>
        </styled.div>
      );
    },
  ),
);

const Header = React.memo(
  React.forwardRef<
    HTMLTableRowElement,
    TailwindComponentProps<"thead"> & HeaderOwnProps
  >((props, ref) => {
    const { fields, ...rest } = props;
    return (
      <styled.thead themeName="TableHead" ref={ref} {...rest}>
        <styled.tr themeName="TableHeadRow">
          {fields &&
            fields.map(field => (
              <styled.th colSpan={1} key={field} themeName="TableHeadHeader">
                {field}
              </styled.th>
            ))}
          <styled.th themeName="TableHeadHeader">Action</styled.th>
        </styled.tr>
      </styled.thead>
    );
  }),
);

// ThemeName: TableBodyData
const BodyRowComponent = React.memo(
  React.forwardRef<
    HTMLTableCellElement,
    TailwindComponentProps<"td"> & BodyRowComponentOwnProps
  >((props, ref) => {
    const { href, ...rest } = props;

    const dialogOnSubmit = useDelete(href);

    return (
      <styled.td {...rest} ref={ref}>
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
      </styled.td>
    );
  }),
);

const BodyRow = React.memo(
  React.forwardRef<
    HTMLTableRowElement,
    TailwindComponentProps<"tr"> & BodyRowOwnProps
  >((props, ref) => {
    const { rowItem, fields, ...rest } = props;
    const id = rowItem.id;
    const href = `${id}`;

    return (
      <styled.tr key={id} {...rest} ref={ref}>
        {fields.map(field => (
          <styled.td key={field} themeName="TableBodyData" colSpan={1}>
            {rowItem[field] ? rowItem[field] : ""}
          </styled.td>
        ))}
        <BodyRowComponent href={href} themeName="TableBodyData" />
      </styled.tr>
    );
  }),
);

const Body = React.memo(
  React.forwardRef<
    HTMLTableSectionElement,
    TailwindComponentProps<"tbody"> & BodyOwnProps
  >((props, ref) => {
    const { fields, fieldData, ...rest } = props;
    return (
      <styled.tbody themeName="TableBody" {...rest} ref={ref}>
        {fieldData &&
          fieldData.length > 0 &&
          fieldData.map(rowItem => (
            <BodyRow
              key={rowItem.id}
              fields={fields}
              rowItem={rowItem}
              themeName="TableBodyRow"
            />
          ))}
      </styled.tbody>
    );
  }),
);

const Table = React.memo(
  React.forwardRef<
    HTMLTableElement,
    TailwindComponentProps<"table"> & TableOwnProps
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
                      getDefaultValue(schema[entry[0]], entry[1]),
                    ];
                  }
                  return entry;
                }),
              ) as FetchDataSuccessType<SchemaType>;
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
