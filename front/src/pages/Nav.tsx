import { useState } from "react";
import { Link } from "react-router-dom";
// import "./Nav.css";

function Nav() {
  const [navBar, showNavBar] = useState(true);
  const [loggedIn, checkLogin] = useState(false);
  if (loggedIn) {
    return <></>;
  } else {
    if (navBar)
      return (
        <>
          <header className="bg-white outline-dotted">
            <nav
              className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
              aria-label="Global"
            >
              
                <a className="p-2 text-sm font-semibold leading-6 text-gray-900">
                  <Link to="/"> A:tentionLOGO </Link>
                </a>
                <div className="justify-items-ends">
                <a className="p-2 text-sm font-semibold leading-6 text-gray-900">
                  <Link to="/Dash">대시보드</Link>
                </a>
                <a className="p-2 text-sm font-semibold leading-6 text-gray-900">
                  <Link
                    to="/Conference"
                    onClick={() => {
                      showNavBar(false);
                    }}
                  >
                    회의 참여
                  </Link>
                </a>
                <a className="p-2 text-sm font-semibold leading-6 text-gray-900">
                  <Link to="/Login"> 로그인/회원가입</Link>
                </a>
              </div>
            </nav>
          </header>
        </>
      );
    return <></>;
  }
}

export default Nav;
