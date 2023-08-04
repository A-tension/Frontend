import { Outlet } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import SideNav from "../components/SideNav";
import { useState } from "react";
import group from "../assets/icons/icon_group.svg";
import calendar from "../assets/icons/icon_calendar.svg";
import meeting from "../assets/icons/icon_meeting.svg";
import item from "../assets/icons/icon_item.svg";
import SidebarButton from "../components/atoms/button/SidebarButton";
const Dash = () => {
  // sidenav selected 받아와서

  const headerHeight = 74; // Change this value to match your actual header height
  const colHeight = `calc(100vh - ${headerHeight}px)`;
  // Calculate the height for the columns and inner div

  const icons = [group, calendar, meeting, item];
  const menu = ["group", "calendar", "meeting", "item"];
  const label = ["그룹", "캘린더", " 회의", "뽑기"];
  //지금 하려고 하는 것 dash에서 usestate로 현재 어느 탭에 있는지 표시
  const [selectedMenu, selectMenu] = useState("그룹");
  return (
    <>
      <div style={{ height: colHeight }}>
        <Container fluid>
          <Row style={{ height: colHeight }}>
            <Col className="pt-5" lg={3} style={{minWidth:"290px"}} >
              <SideNav
                icons={icons}
                selectMenu={selectMenu}
                selectedMenu={selectedMenu}
                label={label}
                linkto={menu}
              ></SideNav>
            </Col>
            <Col lgm={9} style={{ padding: "0" }}>
              <div
                className="interpadding pt-5 px-5"
                style={{
                  height: "100%",
                  background: "#ECF3FC",
                  borderRadius: "40px 0px 0px 0px",
                }}
              >
                <SidebarButton notButton={true}  klabel={selectedMenu} icon={icons[label.indexOf(selectedMenu)]}></SidebarButton>
                <div
                  className="mx-5 pt-4 px-5 pb-5"
                  style={{
                    background: "#FFF",
                    borderRadius: "20px",
                  }}
                >
                  <Outlet></Outlet>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Dash;
