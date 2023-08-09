import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { getPlanlist, loadListTest } from "../store/plan";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function Calendar() {
  //캘린더 :
  // let dataObject:Plan[]=[];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const dataObject = useAppSelector(getPlanlist); // Use the selector to access the data
   const handleTest = ()=>{
    dispatch(loadListTest()); 
    navigate('/dash/calendar/plan', { state: { data: dataObject } });
  }
 

  return (
    <>
      {/* <h1>캘린더</h1> */}
      <a>
        달력화면에서 툴팁으로 일정 보여주기, 일정추가(뒤로가기 달력화면),
        일정상세
        <button onClick={handleTest}>테스트 버튼</button>
      </a>
    {/* <Month></Month> */}
      <div>
        <Link to="add">일정추가</Link>
        <Link to="plan">일정상세</Link>
        <Link to="">캘린더</Link>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default Calendar;
