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

// import React, { useEffect, useState } from "react";
// import {  ListGroup, Col, Row } from "react-bootstrap";

// interface Props {
//     groupId?: number;
//     groupName?: string;
// }

// export const Members = (props: Props) => {
//     const [members, setMembers] = useState<string[]>([]);

//     useEffect(() => {
//         // 여기에 그룹원 정보를 가져오는 axios.get 또는 다른 로직을 추가
//         // 예를 들어, axios.get(`/api/group/${props.groupId}/members`)
//         // 그리고 가져온 데이터를 setMembers로 업데이트

//         // 임시 데이터로 대체
//         setMembers([props.groupName + "one", props.groupName + "two", props.groupName + "three" , props.groupName + "four"
//             , props.groupName + "five", props.groupName + "six"]);
//     }, [props.groupId, props.groupName]);

//     const memberItems = members.map((memberName, index) => (
//         <ListGroup.Item
//             key={index}
//             style={{
//                 backgroundColor: "#f7f7f7",
//                 borderRadius: "6px",
//                 padding: "10px",
//                 marginBottom: "10px",
//                 boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//             }}
//         >
//             {memberName}
//         </ListGroup.Item>
//     ));

//     return (
//         <Row>
//             <Col md={8}>
//                 <h1> {props.groupName}</h1>
//                 <ListGroup>{memberItems}</ListGroup>
//             </Col>
//             <Col md={4}>
//                 <div
//                     style={{
//                         backgroundColor: "#f7f7f7",
//                         borderRadius: "10px",
//                         padding: "70px",
//                         marginTop: "10px",
//                         marginBottom : "10px",
//                         border: "0.5px solid black",
//                         boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//                     }}
//                 >
//                     <p>
//                         <strong>그룹 정보</strong>
//                         <br />
//                         그룹에 대한 정보 담기
//                     </p>
//                 </div>
//             </Col>
//         </Row>
//     );

};

export default Members;
