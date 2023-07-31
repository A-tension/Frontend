import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
function Loginheader() {
  return (
    <>
      <Nav.Link as={Link} to="/dash/meeting/join">
        회의 참여
      </Nav.Link>
    </>
  )
}
export default Loginheader;
