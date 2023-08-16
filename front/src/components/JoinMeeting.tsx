import OpenVidu from "../openvidu/App"
const JoinMeeting = () => {
  return (
    <>
      {/* <RoundCard width="900px" height="400px"> */}
        <div className="overflow-hidden">
        <OpenVidu />
        </div>
      {/* </RoundCard> */}
    </>
  );
};

export default JoinMeeting;
