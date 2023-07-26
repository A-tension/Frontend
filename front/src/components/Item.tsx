import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
function Item() {
  return (
    <>
      <h1>뽑기</h1>
      <a>뽑기, 내아이템</a>
      <nav>
        <Link to="list">내아이템</Link>
        <Link to="draw">뽑기</Link>
        <Outlet></Outlet>
      </nav>
    </>
  );
}

export default Item;
