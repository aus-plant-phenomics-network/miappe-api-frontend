import React from "react";
import { TailwindComponentProps, styled } from "@ailiyah-ui/factory";
import { AbstractDataType } from "../../handlers";
import { BodyOwnProps, HeaderOwnProps } from "./table.types";
import { DeleteAlertButton, EditButton } from "@ailiyah-ui/button";
import { Form, Link, useSubmit } from "react-router-dom";

const TBody = styled("tbody");
const TFoot = styled("tfoot");
const Tr = styled("tr");
const Td = styled("td");
const Th = styled("th");

const Table = React.memo(
  React.forwardRef<HTMLDivElement, TailwindComponentProps<"div">>(
    (props, ref) => {
      const { children, ...rest } = props;
      return (
        <styled.div themeName="TableRoot" {...rest} ref={ref}>
          <styled.table themeName="Table">{children}</styled.table>
        </styled.div>
      );
    }
  )
);

const createHeaders = <T extends AbstractDataType>(
  headerProps: HeaderOwnProps<T>
) => {
  const THead = React.memo(
    React.forwardRef<HTMLTableRowElement, TailwindComponentProps<"thead">>(
      (props, ref) => {
        let { headers, title = "title" } = headerProps;
        headers = headers.filter((item) => item !== title);
        return (
          <styled.thead themeName="TableHead" ref={ref} {...props}>
            <styled.tr themeName="TableHeadRow">
              <styled.th colSpan={1} themeName="TableHeadHeader">
                {title.toString()}
              </styled.th>
              {headers &&
                headers.map((header) => (
                  <styled.th
                    colSpan={1}
                    key={header.toString()}
                    themeName="TableHeadHeader"
                  >
                    {header.toString()}
                  </styled.th>
                ))}
              <styled.th themeName="TableHeadHeader">Action</styled.th>
            </styled.tr>
          </styled.thead>
        );
      }
    )
  );
  return THead;
};

const createBody = <T extends AbstractDataType>(bodyProps: BodyOwnProps<T>) => {
  const TBody = React.memo(
    React.forwardRef<HTMLTableSectionElement, TailwindComponentProps<"tbody">>(
      (props, ref) => {
        let { bodyData, fields } = bodyProps;
        const submit = useSubmit();
        return (
          <styled.tbody themeName="TableBody" {...props} ref={ref}>
            {bodyData &&
              bodyData.length > 0 &&
              bodyData.map((item) => (
                <Tr key={item.id!.toString()} themeName="TableBodyRow">
                  {fields.map((field) => (
                    <Td
                      key={field.toString()}
                      themeName="TableBodyData"
                      colSpan={1}
                    >
                      {item[field]!.toString()}
                    </Td>
                  ))}
                  <Td themeName="TableBodyData">
                    <Link to={`${item.id}`}>
                      <EditButton tooltipContent="Edit Entry" />
                    </Link>
                    <DeleteAlertButton
                      tooltipContent="Delete Entry"
                      dialogTitle="Remove Entry"
                      dialogDescription="This action is PERMANENT. Are you sure you want to continue?"
                      dialogCancelButtonName="Cancel"
                      dialogSubmitButtonName="Proceed"
                      dialogOnCancel={() => {}}
                      dialogOnSubmit={(e) => {
                        e.preventDefault();
                        submit(
                          {},
                          {
                            method: "DELETE",
                            action: `${item.id}/delete`,
                          }
                        );
                      }}
                    />
                  </Td>
                </Tr>
              ))}
          </styled.tbody>
        );
      }
    )
  );
  return TBody;
};

export { Table, createHeaders, createBody };
