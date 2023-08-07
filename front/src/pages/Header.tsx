import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import "./Header.css";
import "../App.css";
import logo from "../assets/LOGO.png";
import { Navbar, Nav } from "react-bootstrap";
import Loginheader from "../components/loginheader";
import Logoutheader from "../components/logoutheader";
function Header() {
  // NAV는 common에 들어가야 할까?
  // const [navBar, showNavBar] = useState(true);
  const [loggedIn, checkLogin] = useState(false);

  // 화면 전환해서 회의 참여시에 헤더 어떻게 숨길지 생각해보기? if true else return?

  // const loggedin =true;
  // if(navBar)
  return (
    <>
      {/* <header className="bg-white outline-dotted"> */}

      <Navbar className="me-auto flex p-2" style={{height:"53px"}}>
        {/* <Nav className="me-auto p-2"> */}
          <Navbar.Brand as={Link} to="/" className="">
            <img src={logo} height={"26px"} />
          </Navbar.Brand>

          <Nav.Link className="justify-start p-2" as={NavLink} to="/#intro">
            소개
          </Nav.Link>
          <Nav.Link className="justify-start p-2" as={NavLink} to="/#features">
            기능
          </Nav.Link>
        {/* </Nav> */}
        {/* <Nav className="justify-content-end"> */}
          {loggedIn && (
          <Nav className="ms-auto">
            <Logoutheader checkLogin={checkLogin}></Logoutheader>{" "}
          </Nav>
        )}{!loggedIn && (
          <Nav className="ms-auto">
            <Loginheader checkLogin={checkLogin}></Loginheader>{" "}
          </Nav>
        )}
      


      </Navbar>
    </>
  );
}

export default Header;
