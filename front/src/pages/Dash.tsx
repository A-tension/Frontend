import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav";

function Dash() {
  return (
    <>
    <div  style={{background:'#ECF3FC'}}>
    <SideNav></SideNav>
      <Outlet></Outlet>
    </div>

    </>
  );
}

export default Dash;
