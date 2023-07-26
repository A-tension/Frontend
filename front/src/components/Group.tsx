import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Group() {
  return (
    <>
      <h1>Group</h1>
      <p>
        sidebar(group list), group tab menu- group chat, group sidebar list
        모듈???
      </p>
      <div>
        <nav>
          <Link to="chat">채팅</Link>
          <Link to="plans">일정</Link>
          <Link to="members">관리</Link>
          <Outlet></Outlet>
        </nav>
      </div>
    </>
  );
}

export default Group;
