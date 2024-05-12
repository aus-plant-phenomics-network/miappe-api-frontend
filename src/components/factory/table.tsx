import { DataType } from "../../handlers";
import { TailwindComponentProps } from "@ailiyah-ui/factory";
import React from "react";
import { styled } from "@ailiyah-ui/factory";
import { HeaderOwnProps, BodyOwnProps } from "./table.types";
import { useSubmit, Link } from "react-router-dom";
import { DeleteAlertButton, EditButton } from "@ailiyah-ui/button";

const createHeaders = <T extends DataType>(headerProps: HeaderOwnProps<T>) => {
  const THead = React.memo(
    React.forwardRef<HTMLTableRowElement, TailwindComponentProps<"thead">>(
      (props, ref) => {
        let { headers } = headerProps;
        const { title = "title" } = headerProps;
        headers = headers.filter(item => item !== title);
        return (
          <styled.thead themeName="TableHead" ref={ref} {...props}>
            <styled.tr themeName="TableHeadRow">
              <styled.th colSpan={1} themeName="TableHeadHeader">
                {title.toString()}
              </styled.th>
              {headers &&
                headers.map(header => (
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
      },
    ),
  );
  return THead;
};

const createBody = <T extends DataType>(bodyProps: BodyOwnProps<T>) => {
  const TBody = React.memo(
    React.forwardRef<HTMLTableSectionElement, TailwindComponentProps<"tbody">>(
      (props, ref) => {
        const { bodyData, fields } = bodyProps;
        const submit = useSubmit();
        return (
          <styled.tbody themeName="TableBody" {...props} ref={ref}>
            {bodyData &&
              bodyData.length > 0 &&
              bodyData.map(item => (
                <styled.tr key={item.id!.toString()} themeName="TableBodyRow">
                  {fields.map(field => (
                    <styled.td
                      key={field.toString()}
                      themeName="TableBodyData"
                      colSpan={1}
                    >
                      {item[field]?.toString()}
                    </styled.td>
                  ))}
                  <styled.td themeName="TableBodyData">
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
                      dialogOnSubmit={e => {
                        e.preventDefault();
                        submit(
                          {},
                          {
                            method: "DELETE",
                            action: `${item.id}/delete`,
                          },
                        );
                      }}
                    />
                  </styled.td>
                </styled.tr>
              ))}
          </styled.tbody>
        );
      },
    ),
  );
  return TBody;
};

export { createBody, createHeaders };
