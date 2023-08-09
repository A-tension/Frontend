import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavTab } from "./atoms/tab/NavTab";
import { Team, getGrouplist } from "../store/group";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadListTest } from "../store/group";
import { Tab, Nav, Row, Col, Button, Card, Form } from "react-bootstrap";
import Plans from "./group/Plans.tsx";
import Members from "./group/Members.tsx";
        
function Group() {
  const dispatch = useAppDispatch();
  const testingload = () => {
    dispatch(loadListTest());
  };
  const navigate = useNavigate();
  const tabmenukey = ["start", "chat", "plans","manage"];
  const groups: Team[] = useAppSelector(getGrouplist);
  const grouplist = groups.map((group, index) => (
    <Nav.Link
      // as={Nav.Link}
      href="#"
      eventKey={index}
      onClick={() => {
        selectGroup(group);
      }}
      key={index}
    >
      {group.name}
    </Nav.Link>
  ));
  const [selectedGroup, selectGroup] = useState<Team>({
    teamId: 0,
    name: "",
    profileImg: "",
    members: [],
  });
  const [isCreate, setMenu] = useState(false);

  useEffect(() => {
    const escapeCreate = () => {
      setMenu(false);
    };
    escapeCreate();
  }, [selectedGroup]);
  // const selectGroup=()=>
  const dataObject = selectedGroup;
  return (
    <>
      {/* <p>
        sidebar(group list), group tab menu- group chat, group sidebar list
        모듈??? 그룹이 없을때? list에서 어떤 그룹을 골랐는지 표시 "group
        selection flex-column pt-5"defaultActiveKey="first"
      </p> */}
      <div>
        <Tab.Container >
          <Row>
            <Col sm={3} style={{ height: "400px" }}>
              <div style={{ flex: "none", height: "300px", overflowY: "auto" }}>
                <Nav variant="pills" className="flex-column" defaultActiveKey="">
                  {grouplist}
                </Nav>
              </div>

              <NavTab
                label="그룹추가"
                linkto="create"
                linktype="Nav"
                button={true}
                children={
                  <Button
                    onClick={testingload}
                    style={{ borderRadius: "20px", width: "100%" }}
                  >
                    그룹추가
                  </Button>
                }
                onClick={() => setMenu(true)}
              ></NavTab>
            </Col>
            {isCreate && (
              <Col>
                <Outlet></Outlet>
              </Col>
            )}
            {!isCreate && (
              <Col>
                {/* <h1>Group {selectedGroup}</h1> */}
                <Nav variant="underline" activeKey="0">
                  <NavTab key="0" linkto="none" label={selectedGroup.name} />
                  <NavTab
                    label="채팅"
                    linkto="chat"
                    linktype="NavLink"
                    navProps={dataObject}
                  />
                  <NavTab
                    label="일정"
                    linkto="plans"
                    linktype="NavLink"
                    navProps={dataObject}
                  />
                  <NavTab
                    label="관리"
                    linkto="members"
                    linktype="NavLink"
                    navProps={dataObject}
                  />
                </Nav>
                <Outlet></Outlet>
<!-- 
function Group() {
  const groups = [
    "G1",
    "G2",
    "G3",
    "G1",
    "G2",
    "G1"
  ];

  const grouplist = groups.map((groupname, index) => (
      <Nav.Item
          as={Nav.Link}
          eventKey={index}
          onClick={() => selectGroup(groupname)}
          key={index}
      >
        {groupname}
      </Nav.Item>
  ));

  const [selectedGroup, selectGroup] = useState("");
  const [isCreate, setMenu] = useState(false);
  const [selectedTab, setSelectedTab] = useState("chat"); // 기본값은 "chat"으로 설정

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
      <>
        <div>
          <Tab.Container defaultActiveKey="first">
            <Row>
              <Col sm={3} style={{ height: "450px" }}>
                <div
                    style={{
                      flex: "none",
                      height: "300px",
                      overflowY: "auto"
                    }}
                >
                  <Nav variant="pills" className="flex-column">
                    {grouplist}
                  </Nav>
                </div>
                <NavTab
                    label="그룹생성"
                    linkto="create"
                    linktype="Nav"
                    button={true}
                    children={
                      <Button
                          style={{
                            borderRadius: "20px",
                            width: "100%"
                          }}
                      >
                        그룹생성
                      </Button>
                    }
                    onClick={() => setMenu(true)}
                ></NavTab> -->
              </Col>
              {isCreate && (
                  <Col>
                    <Outlet></Outlet>
                  </Col>
              )}
              {!isCreate && (
                  <Col>
                    <Nav variant="underline" defaultActiveKey={selectedTab}>
                      <NavTab
                          label={selectedGroup}
                          linkto="#"
                          onClick={() => handleTabClick("info")}
                      />
                      <NavTab
                          label="채팅"
                          linkto="chat"
                          linktype="NavLink"
                          onClick={() => handleTabClick("chat")}
                      />
                      <NavTab
                          label="일정"
                          linkto="plans"
                          linktype="NavLink"
                          onClick={() => handleTabClick("plans")}
                      />
                      <NavTab
                          label="관리"
                          linkto="members"
                          linktype="NavLink"
                          onClick={() => handleTabClick("members")}
                      />
                    </Nav>
                    <Card
                        style={{
                          borderLeft: "none",
                          borderRight: "none",
                          borderTop: "1px solid #ccc",
                          borderBottom: "none",
                          marginTop: "20px",
                          padding: "10px",
                          borderRadius: 0
                        }}
                    >
                      {selectedTab === "info" && (
                          <div>
                            {/* 그룹 정보 컴포넌트를 렌더링 */}
                            <h1>Group {selectedGroup}</h1>
                          </div>
                      )}
                      {selectedTab === "chat" && (
                          <div>
                            {/* 채팅 컴포넌트를 렌더링 */}
                            <h1>야홍~~~</h1>
                          </div>
                      )}
                      {selectedTab === "plans" && (
                          <div>
                            <Plans />
                          </div>
                      )}
                      {selectedTab === "members" && (
                          <div>
                            {/* 관리 컴포넌트를 렌더링 */}
                              <Members />
                          </div>
                      )}
                      {selectedTab === "chat" && (
                          <div style={{ marginTop: "20px" }}>
                            {/* 채팅상자를 렌더링 */}
                            <Form
                                style={{
                                  backgroundColor: "white",
                                  borderRadius: "10px",
                                  padding: "10px"
                                }}
                            >
                              <Form.Group
                                  controlId="exampleForm.ControlTextarea1"
                                  style={{ marginBottom: "0" }}
                              >
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="메시지 입력..."
                                    style={{
                                      backgroundColor: "#f7f7f7",
                                      borderRadius: "10px",
                                      border: "none",
                                      resize: "none"
                                    }}
                                />
                              </Form.Group>
                              <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end"
                                  }}
                              >
                                <Button variant="primary" type="submit">
                                  전송
                                </Button>
                              </div>
                            </Form>
                          </div>
                      )}
                    </Card>
                  </Col>
              )}
            </Row>
          </Tab.Container>
        </div>
      </>
  );
}

export default Group;
