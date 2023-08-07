import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Calendar() {
  //캘린더 :
  return (
    <>
      {/* <h1>캘린더</h1> */}
      <a>
        달력화면에서 툴팁으로 일정 보여주기, 일정추가(뒤로가기 달력화면),
        일정상세
      </a>

      <div>
        <Link to="add">일정추가</Link>
        <Link to="plan">일정상세</Link>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default Calendar;
