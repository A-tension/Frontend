import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Nav,
  NavDropdown,
  OverlayTrigger,
  Button,
  Popover,
  Dropdown,
  DropdownButton,
  NavItem,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUser, userLogout } from "../store/user";
interface Props {
  checkLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const Logoutheader = (props: Props) => {
  const loginUser = useAppSelector(selectUser);
  // const user = {
  //   name: "Ssafy",
  // };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const pathname = location.pathname;
  // console.log()
  const handleLogout = () => {
    props.checkLogin(false);
    console.log("logout button clicked");
    dispatch(userLogout());
    navigate("/login");
  };
  const popover = (
    <Popover id="popover-basic" className="text-white">
      <Popover.Header as="h3">알림</Popover.Header>
      <Popover.Body>
        알림도 원자 컴포넌트로 map 써서 현재 유저가 갖고있는 것 불러오기?
      </Popover.Body>
    </Popover>
  );
  return (
    <>
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <Button variant="success">알림</Button>
      </OverlayTrigger>

      <Nav.Link
        as={Link}
        to="/dash"
        state={{ prevPath: pathname }}
        className="text-white"
      >
        대시보드
      </Nav.Link>

      <Nav.Link
        as={Link}
        to="/dash/meeting/start"
        state={{ toMeeting: pathname }}
        style={{ color: "white" }}
      >
        회의 개설
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/dash/meeting/join"
        state={{ toMeeting: pathname }}
        className="text-white"
      >
        회의 참여
      </Nav.Link>

      <Dropdown
        as={NavDropdown}
        drop="down-centered"
        style={{ color: "white" }}
        title={loginUser.name}
        id="basic-nav-dropdown"
        className="text-white"
      >
        {/* <Dropdown.Toggle style={{ color: "white" }}>
          <div className="text-white">
            {loginUser.name}</div> style={{ maxWidth: "10px" }}
        </Dropdown.Toggle> */}
        {/* <Dropdown.Menu> */}
        <Dropdown.Item as={Link} to="/info" >
          마이페이지
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
        {/* </Dropdown.Menu> */}
      </Dropdown>
    </>
  );
};
export default Logoutheader;
