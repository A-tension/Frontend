// import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

function SideNav() {
  // sidebar & inner header
  //link li 반복 menu title[]. menu[]
  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="group">그룹</Link>
            </li>
            <li>
              <Link to="calendar">캘린더</Link>
            </li>
            <li>
              <Link to="meeting">회의</Link>
            </li>
            <li>
              <Link to="item">뽑기</Link>
            </li>
          </ul>
        </nav>
        <div>선택된 메뉴 selected?</div>
      </div>
    </>
  );
}

export default SideNav;
