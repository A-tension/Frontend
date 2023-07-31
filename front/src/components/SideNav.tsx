// import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

function SideNav() {
  // sidebar & inner header
  //Nav.link li 반복 menu title[]. menu[]
  return (
    <>
      <div>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="group">
            <div className="items-center">
              그룹
            </div>
          </Nav.Link>

          <Nav.Link as={Link} to="calendar">
            캘린더
          </Nav.Link>

          <Nav.Link as={Link} to="meeting">
            회의
          </Nav.Link>

          <Nav.Link as={Link} to="item">
            뽑기
          </Nav.Link>
        </Nav>
        <div>선택된 메뉴 selected?</div>
      </div>
    </>
  );
}

export default SideNav;
