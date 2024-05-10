import React from "react";
import { TailwindComponentProps, styled } from "@ailiyah-ui/factory";
import { Link } from "react-router-dom";
import { AbstractDataType } from "../../handlers";

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

interface HeaderOwnProps<T extends AbstractDataType> {
  headers: Array<keyof T>;
  title?: keyof T;
}

interface BodyOwnProps<T extends AbstractDataType> {
  bodyData: Array<T>;
  fields: Array<keyof T>;
  title?: keyof T;
}

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
        let { bodyData, title = "title", fields } = bodyProps;
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
                      {item[field] &&
                        (field === title ? (
                          <Link to={item["id"]!.toString()}>
                            {item[field]!.toString()}
                          </Link>
                        ) : (
                          item[field]!.toString()
                        ))}
                    </Td>
                  ))}
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
