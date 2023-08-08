import { Link, useLocation } from "react-router-dom";
import { Ratio, Button } from "react-bootstrap";
import RoundCard from "../components/atoms/RoundCard";
import Screen from "../components/stream/Screen";
import { useState } from "react";
function Waiting() {
  // const [count, setCount] = useState(0)
  const location = useLocation();
  const dataObject = location.state?.data;
  const [audioSetting, setAudio] = useState(true);
  const [videoSetting, setVideo] = useState(true);
  const handleJoining = ()=>{}
  return (
    <>
      {/* <RoundCard width="1000px"> */}
        <div style={{ padding: "1rem" }}>
          {" "}
          <a>{JSON.stringify(dataObject, null, 2)}</a>
        </div>
        {/* <h1>회의 들어가기 전 비디오 마이크 점검 페이지</h1>   여기는 사이드 바로 내부 컴포넌트간 전환 이루어질 예정, 이 화면에서
          바로 회의 컴포넌트 로 넘어가기? to conference */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <Ratio aspectRatio={"16x9"} style={{ maxWidth: "600px" }}>
            <Screen audio={audioSetting} video={videoSetting}></Screen>
          </Ratio>
        </div>
        <div
          className="buttons"
          style={{
            padding: "2rem",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button size="lg"
            onClick={() => setAudio((preValue) => !preValue)}
            style={{ borderRadius: "20" }}
          >
            마이크 {audioSetting ? "끄기" : "켜기"}
          </Button>
          <Button size="lg"
            onClick={() => setVideo((preValue) => !preValue)}
            style={{ borderRadius: "20" }}
          >
            비디오 {videoSetting ? "끄기" : "켜기"}
          </Button>

          <Link to={"/dash/meeting/conference"}>
            <Button  size="lg" style={{ borderRadius: "20" }} onClick={handleJoining}>회의 참여</Button>
          </Link>
        </div>
      {/* </RoundCard> */}
    </>
  );
}

export default Waiting;
