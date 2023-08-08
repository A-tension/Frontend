import { useEffect, useState } from "react";
import VideoRoomComponent from "./components/VideoRoomComponent";
import SetupComponent from "./components/SetupComponent";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const App = () => {
  const [tap, setTap] = useState("setup");
  // 배열 형태로 전달
  const [videos, setVideos] = useState([]);
  const [audios, setAudios] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  // id값으로 전달
  const [selectedVideo, setSelectedVideo] = useState();
  const [selectedAudio, setSelectedAudio] = useState();
  const [selectedSpeaker, setSelectedSpeaker] = useState();
  // 트랙으로 전달
  const [selectedVideoTrack, setSelectedVideoTrack] = useState();
  const [selectedAudioTrack, setSelectedAudioTrack] = useState();
  // 비디오를 켜고 들어갈 것인지 끄고 들어갈 것인지
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);

  // 라우팅용
  const navigate = useNavigate();

  // 입장코드
  const { code } = useParams();
  const { state } = useLocation();

  const setDevices = {
    videos,
    setVideos,
    audios,
    setAudios,
    speakers,
    setSpeakers,
    selectedVideo,
    setSelectedVideo,
    selectedAudio,
    setSelectedAudio,
    selectedSpeaker,
    setSelectedSpeaker,
    selectedVideoTrack,
    setSelectedVideoTrack,
    selectedAudioTrack,
    setSelectedAudioTrack,
    isVideoOn,
    setIsVideoOn,
    isAudioOn,
    setIsAudioOn,
  };

  return (
    <>
      {tap === "setup" && (
        <SetupComponent setTap={setTap} setDevices={setDevices} />
      )}
      {tap === "class" && (
        <VideoRoomComponent
          setDevices={setDevices}
          code={code}
          memberStore={memberStore}
          setTap={setTap}
          classId={state.classId}
          navigate={navigate}
        />
      )}
    </>
  );
};

export default App;