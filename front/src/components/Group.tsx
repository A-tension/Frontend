import { Outlet } from "react-router-dom";
import { Tab, Nav, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
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
    "G1",
    
  ];
  const grouplist = groups.map((groupname, index) => (
    <Nav.Item
      as={Nav.Link}
      eventKey={index}
      onClick={() => {selectGroup(groupname)}}
      key={index}
    >
      {groupname}
    </Nav.Item>
  ));
  const [selectedGroup, selectGroup] = useState("");
  const [isCreate, setMenu] = useState(false);
  useEffect(() => {
    const escapeCreate = () => {
      setMenu(false);
    };

    escapeCreate();

  }, [selectedGroup]);
  // const selectGroup=()=>
  const dataObject =selectedGroup;
  return (
    <>
      {/* <p>
        sidebar(group list), group tab menu- group chat, group sidebar list
        모듈??? 그룹이 없을때? list에서 어떤 그룹을 골랐는지 표시 "group
        selection flex-column pt-5"
      </p> */}
      <div>
        <Tab.Container defaultActiveKey="first">
          <Row>
            <Col sm={3} style={{height:"400px"}}>
              <div
                style={{ flex: "none", height: "300px", overflowY: "auto" }}
              >
                <Nav variant="pills" className="flex-column">
                  {grouplist}
                </Nav>
              </div>

              <NavTab 
                label="그룹추가"
                linkto="create"
                linktype="Nav"
                button={true}
                children={<Button style={{borderRadius:"20px", width:
              "100%"}}>그룹추가</Button>}
                onClick={() => setMenu(true)}
              ></NavTab>
            </Col>{" "}
            {isCreate && (
              <Col>
                <Outlet></Outlet>
              </Col>
            )}
            {!isCreate && (
              <Col>
                {/* <h1>Group {selectedGroup}</h1> */}
                <Nav variant="underline" defaultActiveKey="list">
                  <NavTab disabled={true} label={selectedGroup} linkto="#" />
                  <NavTab label="채팅" linkto="chat" linktype="NavLink" navProps={dataObject} />
                  <NavTab label="일정" linkto="plans" linktype="NavLink" />
                  <NavTab label="관리" linkto="members" linktype="NavLink"  />
                </Nav>
                <Outlet></Outlet>
              </Col>
            )}
          </Row>
        </Tab.Container>
      </div>
    </>
  );
}

export default Group;
