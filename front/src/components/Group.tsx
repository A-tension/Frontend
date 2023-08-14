import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tab, Nav, Row, Col, Button, Form } from "react-bootstrap";
import Plans from "./group/Plans.tsx";
import Members from "./group/Members.tsx";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { addDetail, getGrouplist, loadListTest } from "../store/group.ts";
import { User, checkAuthority } from "../store/user.ts";
import ManageGroup from "./group/ManageGroup.tsx";
import Gcreate from "./group/Gcreate.tsx";
import { NavTab } from "./atoms/tab/NavTab.tsx";
import { getTeamDetail } from "../api/team/teamApi.tsx";
import { teamDetailResponseDto } from "../api/team/types.tsx";
import { AxiosResponse } from "axios";

export interface Team {
  //로그인시 받아오는 유저의 그룹 목록에 있는 정보
  // id?:bigint|number;
  teamId: bigint|number; // axios에서 생성 요청시 자동반환
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const transfer = location.state?.group;
  //어디서 그룹을 다시 전달받는 지?
  const [selectedGroup, selectGroup] = useState<Team>({
    teamId: transfer ? transfer.teamId : 0,
    name: "",
    profileImg: "",
    members: [],
    description: "",
  });

  const [isCreate, setMenu] = useState(false); //그룹생성창 여부
  const [selectedTab, setSelectedTab] = useState("info"); // 기본값은 "chat"으로 설정
  const [hasAuth, getAuth] = useState<boolean>(false); //그룹짱의 권한 체크,,//teamParticipantAuthorityDto 에 해당하나?
  // const curUserId = useAppSelector(getUserId);
  // const teamAuth:teamParticipantAuthorityDto = {teamId:BigInt(selectedGroup.id) ,userAuthDtoList:[{userId:curUserId, hasAuthority:true}]};

  const TF = useAppSelector(checkAuthority);

  const handleGroupSelect = (group: Team) => {
    selectGroup(group);
    //dispatch(hasAuthority()); 
    if(TF)
      getAuth(TF); // 실제로는 team participant has auth?
    else
      getAuth(false);
    console.log(hasAuth);
  };

  const groups: Team[] = useAppSelector(getGrouplist);

  const grouplist = groups.map((group, index) => (
      <Nav.Link
          href="#"
          eventKey={index}
          onClick={() => {
            handleGroupSelect(group);
          }}
          key={index}
      >
        {group.name}
      </Nav.Link>
  ));
  const handleTabClick = (tab: string) => {
    if (groups.length > 0) {
      setSelectedTab(tab);
    }
  };
  const menuIndex = ["chat", "plans", "members", "manage"];
  const groupMenu = ["채팅", "일정", "구성원", "관리"];
  // let menuList;
  // if(groups.length)
  const menuList = groupMenu.map((menu, index) => (
      <Nav.Item
          onClick={() => {
            if (index == 3 && !hasAuth) return;
            else handleTabClick(menuIndex[index]);
          }}
          key={index}
      >
        <Nav.Link
            style={{
              color: selectedTab == menuIndex[index] ? "#176DEE" : "#B9BEC6",
            }}
            active={selectedTab == menuIndex[index]}
            disabled={(index == 3 && !hasAuth) || groups.length == 0}
            eventKey={menuIndex[index]}
        >
          {menu}
        </Nav.Link>
      </Nav.Item>
  ));

  // const [selectedGroup, selectGroup] = useState("");

  useEffect(() => {
    const escapeCreate = () => {
      setMenu(false);
    };
    //   const checkGroupAuth = ()=>{
    //     const userWithAuthority = teamAuth.userAuthDtoList.find(
    //       user => user.userId === curUserId
    //     );

    //     if (userWithAuthority) {
    //       const hasAuthority = userWithAuthority.hasAuthority;
    //       // return hasAuthority
    //       getAuth(hasAuthority)
    //   }
    // loadGroupDetail();
    setSelectedTab("chat");
    escapeCreate();
    // checkGroupAuth();,curUserId,teamAuth
  }, [selectedGroup, dispatch]);
  useEffect(() => {
    const loadGroupDetail = () => {
      // const groupDetail = getTeamDetail<teamDetailResponseDto, AxiosResponse<teamDetailResponseDto>>(selectedGroup.teamId);
      // groupDetail.then(result =>{
      //   console.log(result.data);
      //   const detailedGroup: teamDetailResponseDto = result.data.data;
      //   dispatch(addDetail(detailedGroup));
      // })
      const test = {
        teamId: 456,
        name: "Advanced Team",
        profileImage: "team456.png",
        description: "This is an advanced team with various features.",
        userProfileDtoList: [
          {
            userId: "123e4567-e89b-12d3-a456-426655440000",
            name: "John Doe",
            profileImage: "john.jpg",
          },
          {
            userId: "98765432-12ab-cdef-1234-567890abcdef",
            name: "Jane Smith",
            profileImage: "jane.jpg",
          },
        ],
      };
      console.log("use effect detail call by selected group dependency")
      dispatch(addDetail(test));
    };
    loadGroupDetail();
  }, [dispatch, selectedGroup]);
  const load =(e)=>{
    e.preventDefault();
    console.log("불러오기")
    dispatch(loadListTest);
  }
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
                <Nav.Item>
                  <Button

                      style={{
                        borderRadius: "10px",
                        width: "100%",
                      }}
                      onClick={() => setMenu(true)}
                  >
                    그룹 추가
                  </Button>
                </Nav.Item>

              </Col>

              {isCreate && (
                  <Col>
                    <Gcreate></Gcreate>{" "}
                  </Col>
              )}
              {!isCreate && (
                  <Col>
                    <Nav
                        variant="underline"
                        className="pb-0"
                        // defaultActiveKey={selectedTab}
                        activeKey={selectedTab}
                    >
                      {menuList}

                      <Nav className="ms-auto">
                        <Nav.Item as={Nav.Link} linkto="">
                          <Button
                              onClick={() =>
                                  navigate("/dash/meeting/join", {
                                    state: {
                                      group: selectedGroup,
                                      toMeeting: "fromGroup",
                                    },
                                  })
                              }
                          >
                            회의 참여
                          </Button>
                        </Nav.Item>
                      </Nav>
                    </Nav>

                    <hr className="solid" />
                    {selectedTab === "info" && (
                        <div>
                          {/* 그룹 정보 컴포넌트를 렌더링 */}
                          <h1>Group {selectedGroup.name}</h1>
                        </div>
                    )}
                    {selectedTab === "chat" && (
                        <div>
                          {/* 채팅 컴포넌트를 렌더링 */}
                          <h1>{selectedGroup.name} 그룹입니다</h1>
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
