import { Outlet } from "react-router-dom";
import {Nav} from 'react-bootstrap'
import { NavTab } from "./atoms/tab/NavTab";
function Item() {
  return (
    <>
      {/* <h1>뽑기</h1> */}
      <Nav variant="underline" defaultActiveKey="">
        <NavTab label="내아이템" linkto="list" linktype="Nav"></NavTab>
        <NavTab label="뽑기" linkto="draw" linktype="Nav"></NavTab>
      </Nav> 
      <Outlet></Outlet>
    </>
  );
}

export default Item;
