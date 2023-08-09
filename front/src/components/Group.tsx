import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Tab, Nav, Row, Col, Button, Card, Form } from "react-bootstrap";
import { NavTab } from "./atoms/tab/NavTab";
import Plans from "./group/Plans.tsx";
import Members from "./group/Members.tsx";
import { useAppSelector } from "../store/hooks.ts";
import { getGrouplist } from "../store/group.ts";
export interface Team {
  //로그인시 받아오는 유저의 그룹 목록에 있는 정보
  teamId?: number; // axios에서 생성 요청시 자동반환
  name: string;
  profileImg?: string;
  //이후 그룹 특정 조회시 추가되는 정보
  dsecription?: string;
  members: string[] | User[];
}
export interface Item {
  itemId: number;
  name: string;
  image: string;
}
export interface User {
  userId?: string | "";
  email?: string | "";
  name?: string | "";
  profileImage?: string;
  tickets?: number; // 뽑기권
  meetingUrl?: string;
  myItems?: Item[];
  myGroups?: Team[];
    isLoggedIn?:boolean;
}

function Group() {
  // const groups = [
  //   "G1",
  //   "G2",
  //   "G3",
  //   "G1",
  //   "G2",
  //   "G1"
  // ];
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
  // const [selectedGroup, selectGroup] = useState("");
  const [isCreate, setMenu] = useState(false);
  const [selectedTab, setSelectedTab] = useState("chat"); // 기본값은 "chat"으로 설정

  const handleTabClick = (tab:string) => {
    setSelectedTab(tab);
  };
  useEffect(() => {
    const escapeCreate = () => {
      setMenu(false);
    };
    escapeCreate();
  }, [selectedGroup]);
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
                ></NavTab>
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
                          label={selectedGroup.name}
                          linkto="#"
                          onClick={() => handleTabClick("info")}
                          navProps={selectedGroup}
                      />
                      <NavTab
                          label="채팅"
                          linkto="chat"
                          linktype="NavLink"
                          onClick={() => handleTabClick("chat")}
                          navProps={selectedGroup}
                      />
                      <NavTab
                          label="일정"
                          linkto="plans"
                          linktype="NavLink"
                          onClick={() => handleTabClick("plans")}
                          navProps={selectedGroup}
                      />
                      <NavTab
                          label="관리"
                          linkto="members"
                          linktype="NavLink"
                          onClick={() => handleTabClick("members")}
                          navProps={selectedGroup}
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
                            <h1>Group {selectedGroup.name}</h1>
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
                            <Plans teamProp={selectedGroup}/>
                          </div>
                      )}
                      {selectedTab === "members" && (
                          <div>
                            {/* 관리 컴포넌트를 렌더링 */}
                              <Members teamProp={selectedGroup}/>
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
