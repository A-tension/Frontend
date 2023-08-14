import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import "./Header.css";
import "../App.css";
import logo from "../assets/logo_white.svg"; //../assets/LOGO.png";
import { Navbar, Nav } from "react-bootstrap";
import Loginheader from "../components/loginheader";
import Logoutheader from "../components/logoutheader";
import { useAppDispatch } from "../store/hooks";
import { hideBackground } from "../store/meeting";
function Header() {
  // NAV는 common에 들어가야 할까?
  // const [navBar, showNavBar] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [token, setToken] = useState<string | null>();

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
    if (token) {
      setIsLogin(true);
    }
  }, [token]);
  // 화면 전환해서 회의 참여시에 헤더 어떻게 숨길지 생각해보기? if true else return?
  const dispatch = useAppDispatch();

  const handleMain = () => {
    dispatch(hideBackground(false));
  };
  // const loggedin =true;
  // if(navBar)
  return (
    <>
      <div
        className="font-SUIT text-white"
        style={{ backgroundColor: "#176DEE" }}
      >
        <Navbar className="me-auto flex p-2" style={{ height: "53px" }}>
          <Navbar.Brand as={Link} to="/" className="" onClick={handleMain}>
            <img src={logo} height={"26px"} />
          </Navbar.Brand>

          <Nav.Link
            className="justify-start p-2"
            as={NavLink}
            to="/#intro"
            onClick={handleMain}
          >
            소개
          </Nav.Link>
          <Nav.Link
            className="justify-start p-2"
            as={NavLink}
            to="/#features"
            onClick={handleMain}
          >
            기능
          </Nav.Link>
          {/* , marginRight: "80px"  */}
          {isLogin && (
            <Nav className="ms-auto text-white" style={{ color: "white" }}>
              <Logoutheader />
            </Nav>
          )}
          {!isLogin && (
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
