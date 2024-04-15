import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import navItems from "../assets/navItems.json";
import ToggleList from "../components/ToggleList";

function SideBar({ data, className, ...rest }) {
  console.log(data)
  const children = (
    <div className={className} {...rest}>
      {data ? (
        Object.entries(data).map(([titleString, listData]) => (
          <ToggleList
            key={titleString}
            titleValue={titleString}
            listValue={listData}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
  return (
    <NavBar id="nav-bar" className="h-screen w-fit flex">
      {children}
    </NavBar>
  );
}

export default function Root() {
  return (
    <div className="flex">
      <SideBar className="h-full p-3 flex flex-col gap-y-3" data={navItems} />
      <div className="flex-grow-1 w-full">
        <Outlet />
      </div>
    </div>
  );
}
