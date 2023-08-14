import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Nav,
  NavDropdown,
  OverlayTrigger,
  Button,
  Popover,
  Dropdown,
  Image

} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUser, userLogout } from "../store/user";
import filler from "../assets/bwink_edu_04_single_04.jpg"
const Logoutheader = () => {

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
    console.log("logout button clicked");
    dispatch(userLogout());
    navigate("/login");
  };

  const dropStyle: React.CSSProperties = {
    right: 0,
    // left: "auto", // Commented out since it's not being used
    marginTop: "var(--bs-dropdown-spacer)", // Make sure to provide the actual value here
    color: "white",
  };

  const popover = (
    <Popover id="notification-popover" className="text-white">
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
      <NavDropdown
      as={Dropdown}
      content="none"
        title={
          <div className="flex items-center  text-white gap-2">
            {loginUser.name}
            <Image src={filler} roundedCircle width="40px" />
          </div>
        }
        style={{ borderRadius: "20px" }}
      >
        <NavDropdown.ItemText as={Nav.Link} to="/info">
          <Nav.Link as={Link} to="/info">
            <div className="dropdown-content flex flex-col items-center text-center">
              <Image src={filler} roundedCircle style={{ width:"40px" }}/>
              <b>{loginUser.name}</b>
              {loginUser.email}
            </div>
          </Nav.Link>
        </NavDropdown.ItemText>
        <NavDropdown.Divider></NavDropdown.Divider>
        <NavDropdown.Item
          onClick={handleLogout}
          className="flex flex-col text-center"
        >
          로그아웃
        </NavDropdown.Item>
      </NavDropdown>
     </>
  );
};
export default Logoutheader;
