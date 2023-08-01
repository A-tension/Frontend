import { useState } from "react";
import { Link } from "react-router-dom";
// import "./Header.css";
import logo from "../assets/LOGO.png";
import { Navbar, Nav, Button } from "react-bootstrap";
import Loginheader from "../components/loginheader";
import Logoutheader from "../components/logoutheader";
function Header() {
  // NAV는 common에 들어가야 할까?
  // const [navBar, showNavBar] = useState(true);
  const [loggedIn, checkLogin] = useState(false);

  /*// 화면 전환해서 회의 참여시에 헤더 어떻게 숨길지 생각해보기? if true else return?
// const loginButton;
if(loggedIn){
loginbutton=<LogoutButton>
  }else{
    loginbutton=<LoginButton>
  }
onClick={checkLogin}
  return(
    <>
    {loginbutton}
    </>
  );
*/
  // const loggedin =true;
// if(navBar)
  return (
    <>
      {/* <header className="bg-white outline-dotted"> */}

      <Navbar className="me-auto p-2">
        <Nav className="me-auto p-2">
          <Navbar.Brand as={Link} to="/" className="">
            <img src={logo} />
          </Navbar.Brand>

          <Nav.Link className="">소개</Nav.Link>
          <Nav.Link href="#features">기능</Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          {!loggedIn && <Loginheader></Loginheader>}
          {loggedIn && <Logoutheader></Logoutheader>}

          {/* <Nav.Link as={Link} to="/dash/meeting/join">
            회의 참여
          </Nav.Link> */}
          
          {!loggedIn && (
            <Nav.Link as={Link} to="/#logout">
              <Button
                onClick={() => {
                  checkLogin(!loggedIn);
                }}
              >
                로그인
              </Button>
            </Nav.Link>
          )}
        </Nav>
      </Navbar>

      {/* </header> */}
    </>
  );
}

export default Header;
