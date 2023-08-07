import { Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
interface Props {
  checkLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const Loginheader = (props: Props) => {
  const handleLogin = (tf: boolean) => {
    props.checkLogin(tf);
  };
  return (
    <>
      <Nav.Link as={Link} to="/join" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        회의 참여
      </Nav.Link>
      <Nav.Link as={Link} to="login">
        <Button onClick={() => handleLogin(true)}>로그인</Button>
      </Nav.Link>
    </>
  );
};
export default Loginheader;
