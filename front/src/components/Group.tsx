import { Outlet } from "react-router-dom";
import { Tab, Nav, Row, Col, Button,  } from "react-bootstrap";
import { useState } from "react";
import { NavTab } from "./atoms/tab/NavTab";

function Group() {
  //api get groups
  //dummy data to test scroll
  const groups = [
    "G1",
    "G2",
    "G3",
    "G1",
    "G2",
    "G3",
    "G1",
    "G2",
    "G3",
    "G1",
    "G2",
    "G3",
  ];
  const grouplist = groups.map((groupname, index) => (
    <Nav.Item
      as={Nav.Link}
      eventKey={index}
      onClick={() => selectGroup(groupname)}
      key={groupname}
    >
      {groupname}
    </Nav.Item>
  ));

  const [selectedGroup, selectGroup] = useState("");
  // const selectGroup=()=>
  return (
    <>
      <p>
        sidebar(group list), group tab menu- group chat, group sidebar list
        모듈??? 그룹이 없을때? list에서 어떤 그룹을 골랐는지 표시 "group
        selection flex-column pt-5"
      </p>
      <div>
        <Tab.Container defaultActiveKey="first">
          <Row>
            <Col
              sm={3}
              
            >
              <div style={{ flex: "none", maxHeight: "400px", overflowY: "auto" }}>
                <Nav variant="pills" className="flex-column">
                {grouplist}
              </Nav>
              </div>
              
              <Button>그룹 추가</Button>
            </Col>
            <Col>
              {/* <h1>Group {selectedGroup}</h1> */}
              <Nav variant="underline" defaultActiveKey="list">
                <NavTab disabled={true} label={selectedGroup} linkto="#" />
                <NavTab label="채팅" linkto="chat" linktype="NavLink" />
                <NavTab label="일정" linkto="plans" linktype="NavLink" />
                <NavTab label="관리" linkto="members" linktype="NavLink" />
              </Nav>
              <Outlet></Outlet>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
}

export default Group;
