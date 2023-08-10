import React, { useEffect,useState } from "react";
import { ListGroup, Col, Row } from "react-bootstrap";
import { Team, User } from "../Group";
import { useAppSelector } from "../../store/hooks";
import { checkAuthority } from "../../store/user";
import { teamDetail, userProfileDto } from "../../api/team/types";

interface Props {
  groupId?: number;
  groupName?: string;
  teamProp?: Team | teamDetail;
}

export const Members = (props: Props) => {
  // const location = useLocation();
  // const [hasAuth, getAuth] = useState(false);
  let memberList;
  // const auth= useAppSelector(checkAuthority);
  // if(auth)
  // getAuth(true);
    // getAuth(auth);
  if (props.teamProp !== undefined) {
  const group: Team| teamDetail = props.teamProp;
  const members: User[] | string[] |userProfileDto[] = group.members ? group.members : group.userProfileDtoList;
  

const handleMember=()=>{
// if(hasAuth){
  console.log("let it pop up with options or accordion with buttons if auth, ban or authorize")
// }else{
  console.log("display info? or do nothing")
// }
}
  // const [members, setMembers] = useState<string[]>([]);

  // if (typeof members[0] === "object") {
    //|userProfileDto[] |userProfileDto

   memberList = (members as User[]|string[]).map((member: User|string, index: number) => (
      <ListGroup.Item
        key={index}
        style={{
          backgroundColor: "#f7f7f7",
          borderRadius: "6px",
          padding: "10px",
          marginBottom: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
        onClick={handleMember}
      >{typeof member==typeof "g" && member}
        {member.name}
      </ListGroup.Item>
    ));
}
  useEffect(() => {
    // 여기에 그룹원 정보를 가져오는 axios.get 또는 다른 로직을 추가
    // 예를 들어, axios.get(`/api/group/${props.groupId}/members`)
    // 그리고 가져온 데이터를 setMembers로 업데이트
    // 임시 데이터로 대체
    // setMembers([props.groupName + "one", props.groupName + "two", props.groupName + "three" , props.groupName + "four"
    //     , props.groupName + "five", props.groupName + "six"]);
  }, [props.groupId, props.groupName]);

  return (
    <Row>
      <Col md={8}>
        <h1> {props.groupName}</h1>
        <ListGroup>{memberList}</ListGroup>
      </Col>
      <Col md={4}>
        <div
          style={{
            backgroundColor: "#f7f7f7",
            borderRadius: "10px",
            width:"100%",
            padding: "10px",
            marginTop: "10px",
            marginBottom: "10px",
            border: "0.5px solid black",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p>
            <strong>그룹 정보</strong>
            <br />
            그룹에 대한 정보 
            {props.teamProp?.description}
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Members;
