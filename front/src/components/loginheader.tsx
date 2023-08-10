import { Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { getMode } from "../store/meeting";
interface Props {
  checkLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
const Loginheader = (props: Props) => {
  const handleLogin = (tf: boolean) => {
    props.checkLogin(tf);
  };
  const inMeeting = useAppSelector(getMode);

  return (
    <>
      {!inMeeting && (
        <>
          <Nav.Link
            as={Link}
            to="/dash/meeting/join"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            회의 참여
          </Nav.Link>
          <Nav.Link as={Link} to="login">
            <Button onClick={() => handleLogin(true)}>로그인</Button>
          </Nav.Link>{" "}
        </>
      )}
    </>
  );
};
export default Loginheader;
