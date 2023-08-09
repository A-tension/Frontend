import { Nav } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { NavTab } from "./atoms/tab/NavTab";
import { useAppSelector } from "../store/hooks";
import { getMode } from "../store/meeting";
function Meeting() {
  // const [joinedMeeting, setJoin]= useState(false);
  const joinedMeeting = useAppSelector(getMode);
  
  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [joinedMeeting])

  return (
    <>
      {/* <h1>회의관리(대시보드)</h1>
      <a>
        회의 관리(생성된 회의 여부 화면 차이),회의 개설(로그인 유저),회의
        참여(비회원 가능이라 모달처럼? greyout이랑 뒤로가기)
      </a> */}
      {!joinedMeeting && (
        
        <Nav
          variant="underline"
          className="pb-5"
          // defaultActiveKey="/dash/meeting/manage"
        >
          <NavTab
            label="개설"
            linkto="/dash/meeting/start"
            linktype="Nav"
          ></NavTab>
          <NavTab
            label="참여"
            linkto="/dash/meeting/join"
            linktype="Nav"
          ></NavTab>
          <NavTab
            label="관리"
            linkto="/dash/meeting/manage"
            linktype="Nav"
          ></NavTab>
        </Nav>
      )}
      <Outlet></Outlet>
    </>
  );
}

export default Meeting;
