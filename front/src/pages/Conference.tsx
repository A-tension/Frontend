import { Link } from "react-router-dom";
function Conference() {
  // const [count, setCount] = useState(0)
//open vidu 적용되는 부분이라 집중적으로 공부하고 구조 고민하기
  return (
    <>
      <h1>회의 탭 pages 말고 component로 보내야 함</h1>
      <p>사이드 바 + 비디오 메인창 + 채팅/보드/기타</p>
      <div>
        <nav>
          <Link to="/">홈</Link>
          <a>회의실 아이콘</a>
          <Link to="/dash">대시보드</Link>
        </nav>
      </div>
      <div>
        비디오 레이아웃 컴포넌트 
      </div>
      <div>
        채팅/기타부분 컴포넌트 
      </div>
      <div>
      </div>
    </>
  );
}

export default Conference;
