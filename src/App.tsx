import React from "react";
import Root from "./routes/root";
import { Outlet } from "react-router-dom";
import "./App.css";


export default function App() {
  return (
    <div className="App">
      <div className="AppRoot">
        <Root />
      </div>
      <div className="AppOutlet">
        <Outlet />
      </div>
    </div>
  );
}
