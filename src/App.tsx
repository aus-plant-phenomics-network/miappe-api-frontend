import React from "react";
import Root from "./routes/root";
import { styled } from "@ailiyah-ui/factory";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <styled.div twFlex="flex">
      <styled.div twFlexShrink="flex-shrink-0">
        <Root />
      </styled.div>
      <styled.div twFlexGrow="flex-grow" twMargin="my-5 mx-10">
        <Outlet />
      </styled.div>
    </styled.div>
  );
}
