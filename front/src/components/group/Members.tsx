import React, { useEffect } from "react";
import { ListGroup, Col, Row } from "react-bootstrap";
import { Team, User } from "../Group";

interface Props {
  groupId?: number;
  groupName?: string;
  teamProp?: Team;
}

export const Members = (props: Props) => {
  // const location = useLocation();
  let memberList;
  if (props.teamProp !== undefined) {
  const group: Team| undefined = props.teamProp;
  const members: User[] | string[] = group.members;

  // const [members, setMembers] = useState<string[]>([]);

  if (typeof members[0] === "object") {
    memberList = (members as User[]).map((member: User, index: number) => (
      <ListGroup.Item
        key={index}
        style={{
          backgroundColor: "#f7f7f7",
          borderRadius: "6px",
          padding: "10px",
          marginBottom: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {member.name}/
      </ListGroup.Item>
    ));
  } else if (typeof members[0] === "string") {
    memberList = (members as string[]).map((value: string, index: number) => (
      <ListGroup.Item
        key={index}
        style={{
          backgroundColor: "#f7f7f7",
          borderRadius: "6px",
          padding: "10px",
          marginBottom: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        {value}
      </ListGroup.Item>
    ));
  }
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
            padding: "70px",
            marginTop: "10px",
            marginBottom: "10px",
            border: "0.5px solid black",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p>
            <strong>그룹 정보</strong>
            <br />
            그룹에 대한 정보 담기
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Members;
