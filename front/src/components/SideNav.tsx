// import { Route, Routes } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";

function SideNav() {
  // sidebar & inner header
  //Nav.link li 반복 menu title[]. menu[]
  // const navlinkCss = ({isActive}:{isActive:boolean}):string=>{
  //   return ``
  // }
  return (
    <>
      <div>
        <Nav className="flex-column">
          <Nav.Link
            as={NavLink}
            to="group"
          >
            <Button className="items-center" variant="outline-secondary" style={{color:'#E8E8E8'}}>그룹</Button>
          </Nav.Link>

          <Nav.Link as={NavLink} to="calendar">
            캘린더
          </Nav.Link>

          <Nav.Link as={NavLink} to="meeting">
            회의
          </Nav.Link>

          <Nav.Link as={NavLink} to="item">
            뽑기
          </Nav.Link>
        </Nav>
        <div>선택된 메뉴 selected?</div>
      </div>
    </>
  );
}

export default SideNav;
