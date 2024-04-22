import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";

export default function Root() {
  return (
    <div className="flex">
      <NavBar />
      <div className="flex-grow-1 w-full">
        <Outlet />
      </div>
    </div>
  );
}
