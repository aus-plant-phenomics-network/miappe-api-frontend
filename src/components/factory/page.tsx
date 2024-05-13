// import { Table } from "../table";
// import { Link as _Link, useLoaderData } from "react-router-dom";
// import { FormComponent } from "../form";
// import React from "react";
// import { Form as _Form } from "react-router-dom";
// import { styled } from "@ailiyah-ui/factory";
// import { DataType, AbstractSchemaType } from "../../handlers";
// import { createInputArray } from "../form/factory";
// import { createHeaders, createBody } from "../table/factory";

// const Link = styled(_Link);
// const Form = styled(_Form);

// const createPages = <T extends DataType>(
//   title: string,
//   schema: AbstractSchemaType<T>,
//   headers: Array<keyof T>,
// ) => {
//   const components = createInputArray<T>(schema, ["id"]);
//   const THeader = createHeaders<T>({
//     title: "title",
//     headers: headers,
//   });
//   function DetailPage() {
//     const data = useLoaderData() as Array<T> | null;
//     const TBody = createBody<T>({
//       bodyData: data,
//       fields: headers,
//     });
//     return (
//       <styled.div themeName="PageRoot">
//         <styled.h1 themeName="PageTitle">{title}</styled.h1>
//         <Form id="search-form" role="search" themeName="PageComponent">
//           <styled.div themeName="PageComponentContent">
//             <styled.input
//               id="title"
//               aria-label="Search title"
//               placeholder="Search"
//               type="search"
//               name="title"
//               themeName="PageSearchInput"
//             />
//             <Link to={`/${title}/create`} themeName="PageNewButton">
//               New Item
//             </Link>
//           </styled.div>
//         </Form>
//         <Table>
//           <THeader />
//           <TBody />
//         </Table>
//       </styled.div>
//     );
//   }
//   function CreatePage() {
//     return (
//       <styled.div themeName="PageRoot">
//         <styled.h1 themeName="PageTitle">{title}</styled.h1>
//         <styled.p themeName="PageDescription">
//           Create a new {title} entry by filling out the form below.
//         </styled.p>
//         <FormComponent method="POST">{components}</FormComponent>;
//       </styled.div>
//     );
//   }
//   function UpdatePage() {
//     const data = useLoaderData() as T | null;
//     const updateComponents = React.useMemo(
//       () => createInputArray(schema, [], data),
//       [JSON.stringify(data)],
//     );
//     return (
//       <styled.div themeName="PageRoot">
//         <styled.h1 themeName="PageTitle">{title}</styled.h1>
//         <styled.p themeName="PageDescription">
//           Update the current {title} entry by filling out the form below.
//         </styled.p>
//         <FormComponent method="PUT">{updateComponents}</FormComponent>;
//       </styled.div>
//     );
//   }
//   return [DetailPage, CreatePage, UpdatePage];
// };

// export { createPages };
