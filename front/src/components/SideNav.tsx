// import { Route, Routes } from "react-router-dom";
import {  Nav } from "react-bootstrap";
import { NavTab } from "./atoms/tab/NavTab";
interface Props {
  label: Array<string>;
  linkto: Array<string>;
  style?: string;
} // 적용해서 수정해야 함
//지금 하려고 하는 것 dash에서 usestate로 현재 어느 탭에 있는지 표시
const SideNav=(props:Props)=> {
  //style={{color:'#8C8C8C'}}
  // sidebar & inner header

  const menu =props.linkto;// ["group", "calendar", "meeting", "item"];//props.linkto
  const label = props.label;// ["그룹", "캘린더", " 회의", "뽑기"];//props.label

  const navlinks = menu.map((eng, index) => (
    <NavTab
      label={label[index]}
      linkto={eng}
      linktype="NavLink"
      button={true}
      className="items-center"
      width="210px"
      height="60px"
      bround="20px"
      variant="outline-primary"
    ></NavTab>
  ));

  return (
    <>
      <div className="" style={{ height: "100vh" }}>
        <Nav className="flex-column pt-5">
{navlinks}          

        </Nav>
      </div>
    </>
  );
}

export default SideNav;
