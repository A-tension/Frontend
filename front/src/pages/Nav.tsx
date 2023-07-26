import { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  // NAV는 common에 들어가야 할까?
  const [navBar, showNavBar] = useState(true);
  const [loggedIn, checkLogin] = useState(false);
  if (loggedIn) {
    return <></>;
  } else {
    //로그인 여부로 nav에 표시하는 링크 달라지는 것 어떻게 할지 고민해보기
    if (navBar)
      return (
        <>
          <header className="bg-white outline-dotted">
            <nav
              className="mx-auto flex  items-center justify-between p-6 lg:px-8"
              aria-label="Global"
            >
              <div className="lg:px-4">
                <a className="p-2 text-sm font-semibold leading-6 text-gray-900">
                  <Link to="/">A:tentionLOGO</Link>
                </a>
                <a
                  href="#intro"
                  className="p-2 text-sm font-semibold leading-6 text-gray-900"
                >
                  소개
                </a>
                <a
                  href="#features"
                  className="p-2 text-sm font-semibold leading-6 text-gray-900"
                >
                  기능
                </a>
              </div>

              <div className="justify-items-ends">
                <a className="p-2 text-sm font-semibold leading-6 text-gray-900">
                  알림
                </a>
                <a className="p-2 text-sm font-semibold leading-6 text-gray-900">
                  <Link to="/dash">대시보드</Link>
                </a>
                <a className="p-2 text-sm font-semibold leading-6 text-gray-900">
                  <Link to="/dash/meeting/join">회의 참여</Link>
                </a>
                <a className="p-2 text-sm font-semibold leading-6 text-gray-900">
                  <Link to="/dash/meeting/start">회의 개설</Link>
                </a>
                <a className="p-2 text-sm font-semibold leading-6 text-gray-900">
                  <Link to="/info">프로필</Link>
                </a>
                <a className="p-2 text-sm font-semibold leading-6 text-gray-900">
                  <Link to="/login">로그인/회원가입</Link>
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
