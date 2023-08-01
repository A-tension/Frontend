import { Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";
// import { Link } from "react-router-dom";
import { NavTab } from "./atoms/tab/NavTab";
function Meeting() {
  return (
    <>
      {/* <h1>회의관리(대시보드)</h1>
      <a>
        회의 관리(생성된 회의 여부 화면 차이),회의 개설(로그인 유저),회의
        참여(비회원 가능이라 모달처럼? greyout이랑 뒤로가기)
      </a> */}

      <Nav variant="underline" className="pb-5" defaultActiveKey="/dash/meeting/manage">
        <NavTab label="개설" linkto="/dash/meeting/start" linktype="Nav"></NavTab>
        <NavTab label="참여" linkto="/dash/meeting/join" linktype="Nav"></NavTab>
        <NavTab label="관리" linkto="/dash/meeting/manage" linktype="Nav"></NavTab>
      </Nav> 
      <Outlet></Outlet>
      {/* <nav className="justify-center">
        <a className="justify-between">
          <Link to="/dash/meeting/start">회의 개설</Link>
        </a>
        <a className="justify-between">
          <Link to="/dash/meeting/join">회의 참여</Link>
        </a>
        <a>
          <Link to="/dash/meeting/manage">회의 관리</Link>
        </a>
      </nav>
      <Outlet></Outlet> */}
    </>
  );
}

export default Meeting;
