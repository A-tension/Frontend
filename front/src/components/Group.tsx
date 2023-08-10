import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Tab, Nav, Row, Col, Button, Card, Form } from "react-bootstrap";
import { NavTab } from "./atoms/tab/NavTab";
import Plans from "./group/Plans.tsx";
import Members from "./group/Members.tsx";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { getGrouplist } from "../store/group.ts";
import { User, checkAuthority, hasAuthority, isLoggedIn } from "../store/user.ts";
import ManageGroup from "./group/ManageGroup.tsx";
import {
  acceptTeam,
  createTeam,
  deleteTeam,
  findMyTeam,
  getTeamDetail,
  inviteTeam, leaveTeam, refuseTeam,
  updateTeam, updateTeamParticipantAuthority
} from "../api/team/teamApi.tsx";
import {
  teamResponseDto,
  createTeamRequestBody,
  teamUpdateRequestDto,
  teamInviteRequestDto, userAuthDto, teamParticipantAuthorityDto
} from "../api/team/types.tsx";

export interface Team {
  //로그인시 받아오는 유저의 그룹 목록에 있는 정보
  teamId?: number; // axios에서 생성 요청시 자동반환
  name: string;
  profileImg?: string;
  //이후 그룹 특정 조회시 추가되는 정보
  description?: string;
  members: string[] | User[];
}
export interface Item {
  itemId: number;
  name: string;
  image: string;
}
interface LoginUser extends User {
  userId?: string | "";
  email?: string | "";
  name?: string | "";
  profileImage?: string;
  tickets?: number; // 뽑기권
  meetingUrl?: string;
  myItems?: Item[];
  myGroups?: Team[];
  isLoggedIn?: boolean;
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
  const navigate = useNavigate();
  const [selectedGroup, selectGroup] = useState<Team>({
    teamId: 0,
    name: "",
    profileImg: "",
    members: [],
    description: "",
  });
  const TF = useAppSelector(checkAuthority);
  const handleGroupSelect = (group: Team) => {
    selectGroup(group);
    //dispatch(hasAuthority());
    console.log(getAuth(TF)); // 실제로는 team participant has auth?
    console.log(hasAuth)
  };
  const groups: Team[] = useAppSelector(getGrouplist);
  const grouplist = groups.map((group, index) => (
    <Nav.Link
      // as={Nav.Link}
      href="#"
      eventKey={index}
      onClick={() => {
        handleGroupSelect(group)
      }}
      key={index}
    >
      {group.name}
    </Nav.Link>
  ));
 
  // const [selectedGroup, selectGroup] = useState("");
  const dispatch = useAppDispatch();
  const [isCreate, setMenu] = useState(false);
  const [selectedTab, setSelectedTab] = useState("chat"); // 기본값은 "chat"으로 설정
  const [hasAuth, getAuth] = useState(false);
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const escapeCreate = () => {
      setMenu(false);
    };
    setSelectedTab("");
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
                  overflowY: "auto",
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
                      width: "100%",
                    }}
                  >
                    그룹 추가 
                  </Button>
                }
                onClick={async () => {
                  // 내 팀 조회
                  // const promise = await findMyTeam<teamResponseDto>();
                  // console.log(promise.data);

                  // 팀 생성
                  // const createTeamTestDto : createTeamRequestBody = {
                  //   name: "teamTest",
                  //   userIdList: ['1f2c21f4-530f-4f0b-95e6-a6e74b174ce9', '3347e816-494d-4e27-83a0-f55865873cd9']
                  // }
                  // const promise = await createTeam(createTeamTestDto);
                  // console.log(promise.data)

                  // 특정 팀 조회
                  // const teamId : bigint = BigInt(350);
                  // const promise = await getTeamDetail(teamId);
                  // console.log(promise);

                  // 팀 업데이트
                  // const teamId : bigint = BigInt(350);
                  // const teamUpdateRequestDto : teamUpdateRequestDto = {
                  //   name : "updateTest",
                  //   profileImage : "updateImage",
                  //   description : "updateDescription"
                  // }
                  // const promise = await updateTeam(teamId, teamUpdateRequestDto)
                  // console.log(promise.data);

                  // 팀 삭제
                  // const teamId : bigint = BigInt(350);
                  // const promise = await deleteTeam(teamId);
                  // console.log(promise.data);

                  // 팀 초대
                  // const teamInviteRequestDto: teamInviteRequestDto = {
                  //   teamId: 349,
                  //   userIdList: ['3347e816-494d-4e27-83a0-f55865873cd9']
                  // }
                  // const promise= await inviteTeam(teamInviteRequestDto);
                  // console.log(promise.data);

                  // 팀 수락
                  // const teamId : bigint = BigInt(349);
                  // const promise = await acceptTeam(teamId);
                  // console.log(promise.data);

                  // 팀 거절
                  // const teamId : bigint = BigInt(349);
                  // const promise = await refuseTeam(teamId);
                  // console.log(promise.data);

                  // 팀 탈퇴
                  // const teamId : bigint = BigInt(349);
                  // const promise = await leaveTeam(teamId);
                  // console.log(promise.data);

                  // 팀 내 권한 변경
                //   const userAuthDto : userAuthDto = {
                //     userId : '488b52c7-8ce8-44b2-8d58-c79bb15e154c',
                //     hasAuthority : true
                //   }
                //   const teamParticipantAuthorityDto : teamParticipantAuthorityDto = {
                //     teamId: 349,
                //     userAuthDtoList: [userAuthDto]
                //   }
                //   const promise = await updateTeamParticipantAuthority(teamParticipantAuthorityDto);
                //   console.log(promise.data)
                }}
                // onClick={() => setMenu(true)}
              ></NavTab>
            </Col>
            {isCreate && (
              <Col>
                <Outlet></Outlet>
              </Col>
            )}
            {!isCreate && (
              <Col>
                <Nav variant="underline" className="pb-0" defaultActiveKey={selectedTab}>
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
                    label="구성원"
                    linkto="members"
                    linktype="NavLink"
                    onClick={() => handleTabClick("members")}
                    navProps={selectedGroup}
                  />{" "}
                  {hasAuth && (
                    <NavTab
                      label="관리"
                      linkto="manage"
                      linktype="NavLink"
                      onClick={() => handleTabClick("manage")}
                      navProps={selectedGroup}
                    />
                  )}
                  <Nav className="ms-auto">
                    <Nav.Item as={Nav.Link} linkto="">
                      <Button
                        onClick={() =>
                          navigate("/dash/meeting/join", {
                            state: selectedGroup
                          })
                        }
                      >
                        회의 참여
                      </Button>
                    </Nav.Item>
                  </Nav>
                </Nav>
                {/* <Card
                  style={{
                    borderLeft: "none",
                    borderRight: "none",
                    borderTop: "1px solid #ccc",
                    borderBottom: "none",
                    marginTop: "20px",
                    padding: "10px",
                    borderRadius: 0,
                  }}
                > */}
               <hr className="solid"/>
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
                      <Plans teamProp={selectedGroup} />
                    </div>
                  )}
                  {selectedTab === "members" && (
                    <div>
                      {/* 멤버 컴포넌트를 렌더링 */}
                      <Members teamProp={selectedGroup} />
                    </div>
                  )}
                  {selectedTab === "manage" && (
                    <div>
                      
                      <ManageGroup teamProp={selectedGroup} />
                    </div>
                  )}
                  {selectedTab === "chat" && (
                    <div style={{ marginTop: "20px" }}>
                      {/* 채팅상자를 렌더링 */}
                      <Form
                        style={{
                          backgroundColor: "white",
                          borderRadius: "10px",
                          padding: "10px",
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
                              resize: "none",
                            }}
                          />
                        </Form.Group>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button variant="primary" type="submit">
                            전송
                          </Button>
                        </div>
                      </Form>
                    </div>
                  )}
                {/* </Card> */}
              </Col>
            )}
          </Row>
        </Tab.Container>
      </div>
    </>
  );
}

export default Group;
