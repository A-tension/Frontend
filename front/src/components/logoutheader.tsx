import { Link } from "react-router-dom";
import { Nav, OverlayTrigger, Button, Popover } from "react-bootstrap";
function Logoutheader() {
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
      <Nav.Link as={Link} to="/info" className="">
        프로필모달
      </Nav.Link>
    </>
  );
}
export default Logoutheader;
