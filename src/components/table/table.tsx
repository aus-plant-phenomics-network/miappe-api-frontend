import React from "react";

interface TableObj {
  [key: string]: any;
}

function Table<T extends TableObj>({
  data,
  fields,
}: {
  data: Array<T> | null;
  fields: Array<keyof T>;
}) {
  return (
    <table>
      <tbody>
        <tr>
          {fields ? (
            fields.map((field) => (
              <th key={field.toString()}>{field.toString()}</th>
            ))
          ) : (
            <></>
          )}
        </tr>
        {data &&
          Object.entries(data).length > 0 &&
          data.map((item) => (
            <tr key={item.id}>
              {fields.map((field) => (
                <td key={field.toString()} className="py-2 px-4">
                  {item[field] && item[field].toString()}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export { Table };
