import React from "react";
import Root from "./routes/root";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="flex h-screen">
      <div className="flex-shrink-0">
        <Root />
      </div>
      <div className="mx-10 my-5 flex-grow overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
