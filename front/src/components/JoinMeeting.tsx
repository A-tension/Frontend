import RoundCard from "./atoms/RoundCard";
import Join from "./meeting/Join";
const JoinMeeting = () => {
  return (
    <>
      <RoundCard width="900px" height="400px">
        <div className=" pt-4 px-5 pb-5">
          <Join></Join>
        </div>
      </RoundCard>
    </>
  );
};

export default JoinMeeting;
