import { Outlet, useNavigate } from "react-router-dom";
import { Tab, Nav, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { NavTab } from "./atoms/tab/NavTab";
import { Team, getGrouplist } from "../store/group";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadListTest } from "../store/group";
function Group() {
  //api get groups
  //dummy data to test scroll
  // const loadGroups =()=>{
  //   axios.get({
  //   })
  // }
  // const groups:Team[] = [
  //   // "G1",
  //   // "G2",
  //   // "G3",
  //   // "G1",
  //   // "G2",
  //   // "G1",
  // ];
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
              </Col>
            )}
          </Row>
        </Tab.Container>
      </div>
    </>
  );
}

export default Group;
