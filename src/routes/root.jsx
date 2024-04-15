import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="flex">
      <NavBar className="h-screen w-fit flex">Hello World</NavBar>
      <div className="flex-grow-1 w-full">
        <Outlet />
      </div>
    </div>
  );
}
