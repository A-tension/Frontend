// UserModel: 각 유저마다 어떤 상태인지를 확인하기 위한 유저 기본 클래스(모델)
class UserModel {
  connectionId;
  audioActive;
  videoActive;
  screenShareActive;
  nickname;
  streamManager;
  type; // 'remote' | 'local'
  // 추가 항목들
  picked; // 확정 여부
  point; // 칭찬스티커
  emoji; // 사용중인 리액션
  frameColor; // 테두리 색깔
  smile; // 현재 웃는 중인지 확인
  outAngle; // 수업 참여 확인
  attendanceTime; // 접속 시간
  profile; // 프로필 이미지 정보
  uid; // 유저 아이디
  presentationCnt; // 발표 횟수
  concentration; // 집중도
  concentrationList; // 집중도 임시 저장 리스트
  total; // 집중도 총합

  constructor() {
    this.connectionId = "";
    this.audioActive = true;
    this.videoActive = true;
    this.uid = "";
    this.screenShareActive = false;
    this.nickname = "";
    this.streamManager = null;
    this.type = "local";
    this.picked = false;
    this.emoji = "";
    this.frameColor = {
      type: "style",
      value: {
        border: "10px solid gray",
        borderRadius: "15px",
        backgroundImage: "var(--gray)",
        backgroundOrigin: "border-box",
        backgroundClip: "content-box, border-box",
        // margin: '10px',
      },
    }; // {type: "style", value: {border: "8px solid #F8CBD3"}}; // { type: "color", value: "#F8CBD3" };
    this.smile = false;
    this.outAngle = false;
    this.attendanceTime = "00:00:00";
    this.profile = "";
    this.levelPng = "";
    this.presentationCnt = 0;
    this.concentration = 0;
    this.concentrationList = [];
    this.total = 0;
  }
  // 추가 함수
  isSmileActive() {
    return this.smile;
  }

  setSmileActive(isSmile) {
    this.smile = isSmile;
  }

  isOutAngleActive() {
    return this.outAngle;
  }

  setOutAngleActive(isOutAngle) {
    this.outAngle = isOutAngle;
  }

  // OpenVidu 기본함수
  isAudioActive() {
    return this.audioActive;
  }

  isVideoActive() {
    return this.videoActive;
  }

  isScreenShareActive() {
    return this.screenShareActive;
  }

  getPresentationCnt() {
    return this.presentationCnt;
  }

  getEmoji() {
    return this.emoji;
  }
  getFrameColor() {
    return this.frameColor;
  }

  getConnectionId() {
    return this.connectionId;
  }

  getNickname() {
    return this.nickname;
  }

  getStreamManager() {
    return this.streamManager;
  }

  getPicked() {
    return this.picked;
  }

  getLevelPng() {
    return this.levelPng;
  }
  isLocal() {
    return this.type === "local";
  }
  isRemote() {
    return !this.isLocal();
  }
  setAudioActive(isAudioActive) {
    this.audioActive = isAudioActive;
  }
  setVideoActive(isVideoActive) {
    this.videoActive = isVideoActive;
  }
  setScreenShareActive(isScreenShareActive) {
    this.screenShareActive = isScreenShareActive;
  }
  setStreamManager(streamManager) {
    this.streamManager = streamManager;
  }

  setConnectionId(conecctionId) {
    this.connectionId = conecctionId;
  }
  setNickname(nickname) {
    this.nickname = nickname;
  }

  setPicked(picked) {
    this.picked = picked;
  }

  setPresentationCnt(presentationCnt) {
    this.presentationCnt = presentationCnt;
  }

  setEmoji(emoji) {
    this.emoji = emoji;
  }
  setFrameColor(frameColor) {
    this.frameColor = frameColor;
  }

  setType(type) {
    if ((type === "local") | (type === "remote")) {
      this.type = type;
    }
  }

  setUid(uid) {
    this.uid = uid;
  }

  setAttendanceTime(attendanceTime) {
    this.attendanceTime = attendanceTime;
  }

  upPresentationCnt() {
    ++this.presentationCnt;
  }

  downPresentationCnt() {
    --this.presentationCnt;
  }

  getConcentration() {
    return this.concentration;
  }

  getConcentrationList(){
    return this.concentrationList;
  }

  getTotal() {
    return this.total;
  }

  setConcentration(concentration) {
    this.concentration = concentration;
  }


}

export default UserModel;
