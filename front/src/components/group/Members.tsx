
interface Props{
  groupId?: number;
  groupName?: string;
}
export const Members=(props:Props)=> {
  // axios.get({ groupId}).then
  // const [selectedMember,]
  const members =["one","two","three"];
  const memberList = members.map((memberName)=><><li>{memberName}</li></>);
 // li 말고 list group dropdown 
  return (
    <>
      <h1>
        그룹원관리{props.groupName}
      </h1>
      <ul>
        {memberList}
      </ul>

    </>
  )
}

export default Members
