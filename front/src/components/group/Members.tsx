import { useLocation } from "react-router-dom";
import { Team } from "../../store/group";
import { User } from "../../store/user";

// export interface Group extends Team {
//   members: User[]|string[]; /,
// }
// 관리자 권한 T/F로 그룹원 추가 버튼

export const Members = () => {
  // axios.get({ groupId}).then
  // const isLeader = useAppSelector(getLeaderStatus);
  //axios get
  const location = useLocation();
  const group: Team = location.state;
  const members:User[]|string[] = group.members;
// 나중에는 string 으로만!
  // const members = useAppSelector(selectGroupById(findId));
  let memberList;

  if (typeof members[0] === "object") {
    memberList = (members as User[]).map((member: User) => (
      <li key={member.userId}>
        {member.name} | {member.email} | {member.userId}
      </li>
    ));
  } else if (typeof members[0] === "string") {
    memberList = (members as string[]).map((value: string, index: number) => (
      <li key={index}>{value}</li>
    ));
  }
  // li 말고 list group dropdown
  return (
    <>
      <h1>{group.name}</h1>
      <ul>{memberList}</ul>
    </>
  );
};

export default Members;
