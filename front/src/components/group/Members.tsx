interface Props {
  groupId?: number;
  groupName?: string;
}
export const Members = (props: Props) => {
  // axios.get({ groupId}).then
  // const [selectedMember,]
  const members = [props.groupName+"one", props.groupName+"two", props.groupName+"three"];
  const memberList = members.map((memberName, index) => (
    <>
      <li key={index}>{memberName}</li>
    </>
  ));
  // li 말고 list group dropdown
  return (
    <>
      <h1>그룹원관리{props.groupName}</h1>
      <ul>{memberList}</ul>
    </>
  );
};

export default Members;
