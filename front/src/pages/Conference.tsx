import { Link } from "react-router-dom";
import RoundCard from "../components/atoms/RoundCard";
/*
this.state = {
    mySessionId: 'SessionA',
    myUserName: 'Participant' + Math.floor(Math.random() * 100),
    session: undefined,
    mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
    publisher: undefined,
    subscribers: [],
};
//https://docs.openvidu.io/en/stable/tutorials/openvidu-react/
*/
interface Props{
  sessionId:string;
  myUserName:string;
}
const Conference=(props:Props)=> {
const {sessionId,myUserName} = props;
//open vidu 적용되는 부분이라 집중적으로 공부하고 구조 고민하기
  return (
    <>
    <RoundCard width="1000px">
          회의실 세션ID: {sessionId}
    사용자: {myUserName}
      <h1>회의 탭 pages 말고 component로 보내야 함</h1>
      <p>사이드 바 + 비디오 메인창 + 채팅/보드/기타</p>
       오픈비두 컴포넌트 들어갈것,,
    </RoundCard>

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
