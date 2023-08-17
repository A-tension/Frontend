import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../App.css";
import logo from "../assets/logo_white.svg"; //../assets/LOGO.png";
import { Navbar, Nav } from "react-bootstrap";
import Loginheader from "../components/loginheader";
import Logoutheader from "../components/logoutheader";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import { hideBackground } from "../store/test";
import {checkAuthority} from "../store/user.ts";
function Header() {
interface Props {
  scrollToFeatures: () => void;
  scrollToIntro: () => void;
}
function Header(props: Props) {
  // NAV는 common에 들어가야 할까?
  // const [navBar, showNavBar] = useState(true);
  const isLogin = useAppSelector(checkAuthority)
  // 화면 전환해서 회의 참여시에 헤더 어떻게 숨길지 생각해보기? if true else return?
  const dispatch = useAppDispatch();

  const handleMain = () => {
    dispatch(hideBackground(false));
    props.scrollToFeatures;
  };
  // const loggedin =true;

  return (
    <>
      <div
        className="font-SUIT text-white"
        style={{ backgroundColor: "#176DEE" }}

      >
        {/* fixed="top" */}
        <Navbar className="me-auto flex p-2" style={{ height: "53px",backgroundColor: "#176DEE"}} fixed="top" >
          <Navbar.Brand as={Link} to="/" className="" onClick={handleMain}>
            <img src={logo} height={"26px"} />
          </Navbar.Brand>

          <Nav.Link
            className="justify-start p-2"
            onClick={props.scrollToIntro}
          >
            소개
          </Nav.Link>
          <Nav.Link
            className="justify-start p-2"
            onClick={props.scrollToFeatures}
          >
            기능
          </Nav.Link>
          {/* , marginRight: "80px"  */}

            {/* Render different components based on login state */}
            { isLogin ? (
                <Nav className="ms-auto flex items-center text-white"
                     style={{ color: "white" }}
                >
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