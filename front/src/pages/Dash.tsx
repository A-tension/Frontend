import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";

function Dash() {
  return (
    <>
      <h1>DASHBOARD</h1>
      <SideNav></SideNav>
      <Outlet></Outlet>
    </>
  );
}

export default Dash;
