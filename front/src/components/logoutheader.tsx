import { Link } from "react-router-dom";
import {
  Nav,
  NavDropdown,
  OverlayTrigger,
  Button,
  Popover,
} from "react-bootstrap";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/user";
interface Props {
  checkLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const Logoutheader = (props: Props) => {
  const loginUser = useAppSelector(selectUser);
  // const user = {
  //   name: "Ssafy",
  // };
  const handleLogout = () => {
    props.checkLogin(false);
  };
  const popover = (
    <Popover id="popover-basic">
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

      <Nav.Link as={Link} to="/dash" className="">
        대시보드
      </Nav.Link>

      <Nav.Link as={Link} to="/dash/meeting/start" className="">
        회의 개설
      </Nav.Link>
      <Nav.Link as={Link} to="/dash/meeting/join">
        회의 참여
      </Nav.Link>

      <NavDropdown title={loginUser.name} id="basic-nav-dropdown">
        <NavDropdown.Item as={Link} to="/info" className="">
          마이페이지
        </NavDropdown.Item>
        <NavDropdown.Item onClick={handleLogout}>로그아웃</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Logoutheader;
