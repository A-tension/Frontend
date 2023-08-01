import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { NavTab } from "./atoms/tab/NavTab";
function Loginheader() {
  return (
    <>
    {/* <NavTab label="회의 참여" linkto="/meeting/join" linktype="Nav" ></NavTab> */}
      <Nav.Link as={Link} to="/dash/meeting/join">
        회의 참여
      </Nav.Link>
    </>
  )
}
export default Loginheader;
