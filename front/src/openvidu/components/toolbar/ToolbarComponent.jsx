import React, { Component } from "react";
import "./ToolbarComponent.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";
import Fullscreen from "@material-ui/icons/Fullscreen";
import FullscreenExit from "@material-ui/icons/FullscreenExit";
import SettingsIcon from "@material-ui/icons/Settings";
import PictureInPicture from "@material-ui/icons/PictureInPicture";
import ScreenShare from "@material-ui/icons/ScreenShare";
import StopScreenShare from "@material-ui/icons/StopScreenShare";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
import PeopleIcon from "@material-ui/icons/People";
import Shuffle from "@material-ui/icons/Shuffle";
import Quiz from "@material-ui/icons/HelpOutline";
import AccessTime from "@material-ui/icons/AccessTime";
import IconButton from "@material-ui/core/IconButton";
import ViewAgenda from "@material-ui/icons/ViewAgenda";
import ViewArray from "@material-ui/icons/ViewArray";
import Share from "@material-ui/icons/Share";
import SearchIcon from "@material-ui/icons/Search";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { Button, Modal, Backdrop, Fade } from "@material-ui/core";
import TeachersToolbar from "./TeachersToolbar";

export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false,
      randAvailable: true,
      stickerAvailable: true,
      showTeacherMenuToggle: false,
      teacherMenuToggle: false,
      mySessionId: this.props.sessionId,
    };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.toggleQuiz = this.toggleQuiz.bind(this);
    this.pickRandomStudent = this.pickRandomStudent.bind(this);
    this.startStickerEvent = this.startStickerEvent.bind(this);
    this.toggleSetting = this.toggleSetting.bind(this);
    this.selfLeaveSession = this.selfLeaveSession.bind(this);
    this.toggleVideoLayout = this.toggleVideoLayout.bind(this);
    this.toggleEmoji = this.toggleEmoji.bind(this);
    this.toggleQuestion = this.toggleQuestion.bind(this);
    this.toggleTeacherMenu = this.toggleTeacherMenu.bind(this);
  }

  // micStatusChanged: 마이크 상태변화 토글 함수
  micStatusChanged() {
    this.props.micStatusChanged();
  }

  // camStatusChanged: 캠 상태변화 토글 함수
  camStatusChanged() {
    this.props.camStatusChanged();
  }

  // screenShare: 스크린쉐어 시작 함수
  screenShare() {
    this.props.screenShare();
  }

  // screenShare: 스크린쉐어 중지 함수
  stopScreenShare() {
    this.props.stopScreenShare();
  }

  // toggleFullscreen: 전체화면 토글 버튼
  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen });
    this.props.toggleFullscreen();
  }

  // leaveSession: 세션 이탈 함수
  leaveSession() {
    this.props.leaveSession();
  }

  // selfLeaveSession: 혼자 세션 이탈 함수
  selfLeaveSession() {
    this.props.selfLeaveSession();
  }

  // toggleChat: 채팅 토글 함수
  toggleChat() {
    this.props.toggleChat();
  }

  toggleSetting() {
    this.props.toggleSetting();
  }

  toggleEmoji() {
    this.props.toggleEmoji();
  }

  toggleQuestion() {
    this.props.toggleQuestion();
  }

  toggleQuiz() {
    this.props.toggleQuiz();
  }

  pickRandomStudent() {
    this.lockOut(6);
    this.props.pickRandomStudent(this.props.subscribers, false);
  }

  lockOut(lockOutTime) {
    this.setState({ randAvailable: false });
    setTimeout(() => {
      this.setState({ randAvailable: true });
    }, lockOutTime * 1000);
  }

  // lockOutSticker: 호출 시 칭찬스티커 버튼을 지정된 시간 (30초) 동안 disabled 해주는 함수
  lockOutSticker(lockOutTime) {
    this.setState({ stickerAvailable: false });
    setTimeout(() => {
      this.setState({ stickerAvailable: true });
    }, lockOutTime * 1000);
  }

  startStickerEvent() {
    this.props.startStickerEvent();
    this.lockOutSticker(31);
  }

  toggleTeacherMenu() {
    this.setState({ showTeacherMenuToggle: !this.state.showTeacherMenuToggle });
  }

  toggleVideoLayout() {
    this.props.toggleVideoLayout();
  }

  VideoLayout = () => {
    if (this.props.videoLayout === "bigTeacher") {
      return (
        <div className="buttonStyle">
          <ViewAgenda />
          <p>선생님 위주</p>
        </div>
      );
    } else if (this.props.videoLayout === "bigTeacher") {
      return (
        <div className="buttonStyle">
          <ViewArray />
          <p>동등분할</p>
        </div>
      );
    } else if (this.props.videoLayout === "screenShareOn") {
      return (
        <div className="buttonStyle">
          <ScreenShare />
          <p>화면공유</p>
        </div>
      );
    } else {
      return null;
    }
  };

  // render: 렌더링 함수
  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    return (
      <AppBar
        className="toolbar"
        id={this.props.whoami === "teacher" ? "teacher-header" : "header"}
      >
        <Toolbar className="toolbar">
          {mySessionId && (
            <div id="titleContent">
              <span id="session-title">{mySessionId}</span>
            </div>
          )}

          <div className="buttonsContent">
            <IconButton
              color="inherit"
              className="navButton"
              id="navMicButton"
              onClick={this.micStatusChanged}
            >
              {localUser !== undefined && localUser.isAudioActive() ? (
                <div className="buttonStyle">
                  <Mic />
                  <p>음소거</p>
                </div>
              ) : (
                <div className="buttonStyle">
                  <MicOff color="secondary" />
                  <p>음소거 해제</p>
                </div>
              )}
            </IconButton>

            <IconButton
              color="inherit"
              className="navButton"
              id="navCamButton"
              onClick={this.camStatusChanged}
            >
              {localUser !== undefined && localUser.isVideoActive() ? (
                <div className="buttonStyle">
                  <Videocam />
                  <p>비디오 중지</p>
                </div>
              ) : (
                <div className="buttonStyle">
                  <VideocamOff color="secondary" />
                  <p>비디오 시작</p>
                </div>
              )}
            </IconButton>

            {this.props.whoami === "teacher" && (
              <IconButton
                color="inherit"
                className="navButton"
                id="navRandButton"
                onClick={this.toggleTeacherMenu}
              >
                <div className="buttonStyle">
                  <EmojiEmotionsIcon />
                  <p>선생님 메뉴</p>
                </div>
              </IconButton>
            )}

            {this.props.whoami === "teacher" && (
              <div className="teacher-toolbar">
                <TeachersToolbar
                  display={this.state.showTeacherMenuToggle}
                  randAvailable={this.state.randAvailable}
                  stickerAvailable={this.state.stickerAvailable}
                  pickRandomStudent={this.pickRandomStudent}
                  startStickerEvent={this.startStickerEvent}
                  toggleQuiz={this.toggleQuiz}
                  toggleTeacherMenu={this.toggleTeacherMenu}
                />
              </div>
            )}

            <IconButton
              color="inherit"
              className="navButton"
              onClick={this.screenShare}
            >
              {localUser !== undefined && localUser.isScreenShareActive() ? (
                <div className="buttonStyle">
                  <PictureInPicture />
                  <p>화면공유 전환</p>
                </div>
              ) : (
                <div className="buttonStyle">
                  <ScreenShare />
                  <p>화면공유</p>
                </div>
              )}
            </IconButton>

            {localUser !== undefined && localUser.isScreenShareActive() && (
              <IconButton onClick={this.stopScreenShare} id="navScreenButton">
                <div className="buttonStyle">
                  <StopScreenShare color="secondary" />
                  <p>화면공유 중지</p>
                </div>
              </IconButton>
            )}

            <IconButton
              color="inherit"
              className="navButton"
              onClick={this.toggleSetting}
            >
              <div className="buttonStyle">
                <SettingsIcon />
                <p>설정</p>
              </div>
            </IconButton>

            <IconButton
              color="inherit"
              className="navButton"
              onClick={this.toggleFullscreen}
            >
              {localUser !== undefined && this.state.fullscreen ? (
                <div className="buttonStyle">
                  <FullscreenExit />
                  <p>전체화면 취소</p>
                </div>
              ) : (
                <div className="buttonStyle">
                  <Fullscreen />
                  <p>전체화면</p>
                </div>
              )}
            </IconButton>

            <IconButton
              color="inherit"
              className="navButton"
              onClick={this.toggleVideoLayout}
            >
              {localUser !== undefined
                ? (this.props.videoLayout === "bigTeacher" && (
                    <div className="buttonStyle">
                      <ViewAgenda />
                      <p>선생님 위주</p>
                    </div>
                  )) ||
                  (this.props.videoLayout === "equalSize" && (
                    <div className="buttonStyle">
                      <ViewArray />
                      <p>동등분할</p>
                    </div>
                  )) ||
                  (this.props.videoLayout === "screenShareOn" && (
                    <div className="buttonStyle">
                      <Share />
                      <p>공유자 우선</p>
                    </div>
                  ))
                : null}
            </IconButton>
            {this.props.whoami !== "teacher" ? (
              <IconButton
                color="secondary"
                className="navButton"
                onClick={this.selfLeaveSession}
                id="navLeaveButton"
              >
                <div className="buttonStyle">
                  <PowerSettingsNew />
                  <p>수업 나가기</p>
                </div>
              </IconButton>
            ) : (
              <IconButton
                color="secondary"
                className="navButton"
                onClick={this.leaveSession}
                id="navLeaveButton"
              >
                <div className="buttonStyle">
                  <PowerSettingsNew />
                  <p>수업 나가기</p>
                </div>
              </IconButton>
            )}

            <IconButton
              color="inherit"
              onClick={this.toggleEmoji}
              className="navButton"
              id="navEmoji"
            >
              <div className="buttonStyle">
                <EmojiEmotionsIcon />
                <p>이모지</p>
              </div>
            </IconButton>

            <IconButton
              color="inherit"
              onClick={this.toggleQuestion}
              className="navButton"
              id="navQuestButton"
            >
              <div className="buttonStyle">
                {this.props.showQuestionNotification && (
                  <div id="questPoint" className="" />
                )}
                <SearchIcon />
                <p>익명질문</p>
              </div>
            </IconButton>

            <IconButton
              color="inherit"
              onClick={this.toggleChat}
              className="navButton"
              id="navChatButton"
            >
              <div className="buttonStyle">
                {this.props.showNotification && <div id="point" className="" />}
                <QuestionAnswer />
                <p>채팅</p>
              </div>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
