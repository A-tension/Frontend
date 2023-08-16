import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "../App.css";
import logo from "../assets/logo_white.svg"; //../assets/LOGO.png";
import {Navbar, Nav} from "react-bootstrap";
import Loginheader from "../components/loginheader";
import Logoutheader from "../components/logoutheader";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import { hideBackground } from "../store/test";
import {checkAuthority} from "../store/user.ts";
function Header() {
  // NAV는 common에 들어가야 할까?
  // const [navBar, showNavBar] = useState(true);
  const isLogin = useAppSelector(checkAuthority)
  // 화면 전환해서 회의 참여시에 헤더 어떻게 숨길지 생각해보기? if true else return?
  const dispatch = useAppDispatch();

  const handleMain = () => {
    dispatch(hideBackground(false));
  };
  // const loggedin =true;
  return (
      <>
        <div className="font-SUIT text-white" style={{ backgroundColor: "#176DEE" }}>
          <Navbar className="me-auto flex p-2" style={{ height: "53px" }}>
            <Navbar.Brand as={Link} to="/" className="" onClick={handleMain}>
              <img src={logo} height={"26px"} alt="Logo" />
            </Navbar.Brand>

            <Nav.Link className="justify-start p-2" as={Link} to={"#intro"} onClick={handleMain}>
              소개
            </Nav.Link>
            <Nav.Link className="justify-start p-2" as={Link} to={"#features"} onClick={handleMain}>
              기능
            </Nav.Link>

            {/* Render different components based on login state */}
            { isLogin ? (
                <Nav className="ms-auto flex items-center text-white">
                  <Logoutheader />
                </Nav>
            ) : (
                <Nav className="ms-auto text-white">
                  <Loginheader />
                </Nav>
            )}
          </Navbar>
        </div>
      </>
  );
}

export default Header;
