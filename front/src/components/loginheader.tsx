import { Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { NavTab } from "./atoms/tab/NavTab";
interface Props {
  checkLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const Loginheader = (props: Props) => {
  const handleLogin = (tf:boolean) => {
    props.checkLogin(tf);
  };
  {
    /* <NavTab label="회의 참여" linkto="/meeting/join" linktype="Nav" ></NavTab> */
  }

  return (
    <>
      {/* <Nav.Link as={Link} to={"/join"}>
        회의 참여
      </Nav.Link>
      <Nav.Link as={Link} to="login">
        <Button onClick={handleLogin}>로그인</Button>
      </Nav.Link> */}

      <Nav.Link as={Link} to="/join" >
        회의 참여
      </Nav.Link>

      <Nav.Link as={Link} to="login" className="">
        <Button onClick={()=>handleLogin(true)}>로그인</Button>
      </Nav.Link>
    </>
  );
};
export default Loginheader;
