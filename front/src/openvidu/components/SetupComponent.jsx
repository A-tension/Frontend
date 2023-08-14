import React, { useState, useEffect, useRef } from "react";
import Loading from "./Loading";
import "./SetupComponent.css";
import useUpdateStream from "./utils/useUpdateStream";
import { useLocation } from "react-router-dom";
import {
  createStream,
  getVideoTrack,
  getAudioTrack,
  getVideos,
  getAudios,
  getSpeakers,
  initStream,
} from "./utils/customUseDevice";
import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";
import Switch from "@material-ui/core/Switch";
import InterceptedAxios from "../../utils/iAxios";

const SetupComponent = (props) => {
  const location = useLocation();
  const { conferenceCreateData, conferenceJoinData } = location.state;
  const {
    setTap,
    setDevices,
    whoami,
    canUseDoublePongpong,
    isUsedDoublePongpong,
    setIsUsedDoublePongpong,
    userId,
  } = props;

  const {
    videos,
    setVideos,
    audios,
    setAudios,
    speakers,
    setSpeakers,
    setSelectedVideo,
    selectedVideo,
    setSelectedAudio,
    selectedAudio,
    setSelectedSpeaker,
    selectedSpeaker,
    setSelectedVideoTrack,
    setSelectedAudioTrack,
    isVideoOn,
    setIsVideoOn,
    isAudioOn,
    setIsAudioOn,
  } = setDevices;

  const [isLoading, setIsLoading] = useState(true);
  const effectCnt = useRef(0); // 최초 마운트에 특정 useEffect가 동작하지 않게 하기 위한 트릭
  const previewFace = useRef(null);
  const stream = useRef(new MediaStream());
  useUpdateStream(previewFace, stream.current);

  useEffect(() => {
    const getMyDevices = async () => {
      const newVideos = await getVideos();
      const newAudios = await getAudios();
      const newSpeakers = await getSpeakers();
      setVideos(newVideos);
      setAudios(newAudios);
      setSpeakers(newSpeakers);
      if (newVideos.length) setSelectedVideo(newVideos[0].deviceId);
      if (newAudios.length) setSelectedAudio(newAudios[0].deviceId);
      if (newSpeakers.length) setSelectedSpeaker(newSpeakers[0].deviceId);
      setSelectedAudioTrack(newAudios[0]);
      setSelectedVideoTrack(newVideos[0]);
      if (newAudios[0])
        stream.current.addTrack(await getAudioTrack(newAudios[0].deviceId));
      if (newVideos[0])
        stream.current.addTrack(await getVideoTrack(newVideos[0].deviceId));
      stream.current.getTracks().forEach((track) => (track.enabled = false));
      previewFace.current.srcObject = stream.current ?? null;
    };
    initStream().then(() => {
      getMyDevices().then(() => {
        setIsLoading(false);
      });
    });
  }, []);

  useEffect(() => {
    const changeStream = async () => {
      if (effectCnt.current < 2) ++effectCnt.current;
      else {
        stream.current.getVideoTracks().forEach((track) => {
          track.stop();
          stream.current.removeTrack(track);
        });
        let videoTrack;
        if (selectedVideo) {
          videoTrack = await getVideoTrack(selectedVideo);
          if (videoTrack) {
            setSelectedVideoTrack(videoTrack);
            stream.current.addTrack(videoTrack);
            stream.current
              .getVideoTracks()
              .forEach((track) => (track.enabled = isVideoOn));
          }
        }
      }
    };
    changeStream();
  }, [selectedVideo]);

  useEffect(() => {
    const changeStream = async () => {
      if (effectCnt.current < 2) ++effectCnt.current;
      else {
        stream.current.getAudioTracks().forEach((track) => {
          track.stop();
          stream.current.removeTrack(track);
        });
        let audioTrack;
        if (selectedAudio) {
          audioTrack = await getAudioTrack(selectedAudio);
          if (audioTrack) {
            setSelectedAudioTrack(audioTrack);
            stream.current.addTrack(audioTrack);
            stream.current
              .getAudioTracks()
              .forEach((track) => (track.enabled = isAudioOn));
          }
        }
      }
    };
    changeStream();
  }, [selectedAudio]);

  // 장치를 선택할 때 상태값을 바꾸는 이벤트핸들러
  const selectVideo = (e) => {
    setSelectedVideo(e.target.value);
  };

  const selectAudio = (e) => {
    setSelectedAudio(e.target.value);
  };

  const selectSpeaker = (e) => {
    setSelectedSpeaker(e.target.value);
  };

  const toggleVideo = (e) => {
    setIsVideoOn(!isVideoOn);
    stream.current
      .getVideoTracks()
      .forEach((track) => (track.enabled = !isVideoOn));
  };

  const toggleAudio = (e) => {
    setIsAudioOn(!isAudioOn);
    stream.current
      .getAudioTracks()
      .forEach((track) => (track.enabled = !isAudioOn));
  };

  const goNext = async () => {
    if (isUsedDoublePongpong) {
      try {
        await InterceptedAxios.delete(`/items/${userId}/4`);
      } catch (e) {
        console.error(e);
      }
    }
    setTap("class");

    // 여기서 필요한 데이터를 전달하고자 한다면 아래와 같이 작성
    const dataToPass = {
      conferenceCreateData,
      conferenceJoinData,
    };
    // setTap 함수 호출 시 함께 데이터를 전달
    props.setTap("class", dataToPass);
  };

  const goBack = async () => {
    if (whoami === "teacher") {
      try {
        const result = await InterceptedAxios.patch(
          `/classes/${classId}/close`,
          {
            classId: classId,
          }
        );
      } catch (e) {
        console.error(e);
      }
    }
    window.location.href = `/${whoami}`;
  };

  const onClickDoublePongpong = () => {
    setIsUsedDoublePongpong(!isUsedDoublePongpong);
  };

  return (
    <div className="">
      {/* {isLoading && <Loading whoami={whoami} />} */}
      <div className="">
        <div className="">
          {/* <hr /> */}
          <div className="sideContainer">
            <div className="main">
              <div className="RoomName title">
                {conferenceCreateData &&
                  `[${conferenceCreateData.conferenceTitle}]`}{" "}
                <span className="teacher-span">
                  {conferenceCreateData && conferenceCreateData.nickname}
                </span>
              </div>

              <div className="preview">
                <video
                  ref={previewFace}
                  autoPlay
                  style={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    border: "solid 7px var(--yellow)",
                  }}
                />
              </div>
              <div className="setting-section">
                <div className="settingVideo">
                  <p>비디오 </p>
                  <select onChange={selectVideo}>
                    {videos.map((video, i) => (
                      <option value={video.deviceId} key={i}>
                        {video.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={toggleVideo}
                    style={{
                      border: "none",
                      borderRadius: "5px",
                      background: "var(--yellow)",
                    }}
                  >
                    {isVideoOn ? <Videocam /> : <VideocamOff />}
                  </button>
                </div>
                <div className="settingAudio">
                  <p>마이크 </p>
                  <select onChange={selectAudio}>
                    {audios.map((audio, i) => (
                      <option value={audio.deviceId} key={i}>
                        {audio.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={toggleAudio}
                    style={{
                      border: "none",
                      borderRadius: "5px",
                      background: "var(--yellow)",
                    }}
                  >
                    {isAudioOn ? <Mic /> : <MicOff />}
                  </button>
                </div>
                <div className="settingSpeaker">
                  <p>스피커 </p>
                  <select onChange={selectSpeaker}>
                    {speakers.map((speaker, i) => (
                      <option value={speaker.deviceId} key={i}>
                        {speaker.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {canUseDoublePongpong && (
                <div className="double-pongpong-toggle">
                  {isUsedDoublePongpong ? (
                    <span>더블퐁퐁권 사용O</span>
                  ) : (
                    <span>더블퐁퐁권 사용X</span>
                  )}
                  <Switch
                    checked={isUsedDoublePongpong}
                    onClick={onClickDoublePongpong}
                    color="error"
                  />
                </div>
              )}
              <div className="next">
                <button className="nextBtn" onClick={goNext}>
                  입장하기
                </button>
                <button className="backBtn" onClick={goBack}>
                  돌아가기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupComponent;
