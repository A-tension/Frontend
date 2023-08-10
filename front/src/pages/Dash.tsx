import { Outlet, useLocation } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import SideNav from "../components/SideNav";
import { useEffect, useState } from "react";
import group from "../assets/icons/icon_group.svg";
import calendar from "../assets/icons/icon_calendar.svg";
import meeting from "../assets/icons/icon_meeting.svg";
import item from "../assets/icons/icon_item.svg";
import SidebarButton from "../components/atoms/button/SidebarButton";
import { useAppSelector } from "../store/hooks";
import { checkAuthority, isLoggedIn } from "../store/user";
import { getMode } from "../store/meeting";
const Dash = () => {
  // sidenav selected 받아와서

  const headerHeight = 53; // Change this value to match your actual header height
  const colHeight = `calc(100vh - ${headerHeight}px)`;
  // Calculate the height for the columns and inner div
  const inMeeting = useAppSelector(getMode);
  const isLoggedIn =useAppSelector(checkAuthority);
  const icons = [group, calendar, meeting, item];
  const menu = ["group", "calendar", "meeting", "item"];
  const label = ["그룹", "캘린더", " 회의", "뽑기"];
  //지금 하려고 하는 것 dash에서 usestate로 현재 어느 탭에 있는지 표시
  // const []
  // const isLoggedIn = useAppSelector(checkAuthority);
  const location = useLocation();
  const prevPage =location.state?.prevPath;
  const toMeeting = location.state?.toMeeting;
  // console.log(prevPage);
  // if(prevPage=='/'){

  // }
   let firstMenu =toMeeting? "뽑기":"";
   if(isLoggedIn){
    firstMenu = "그룹";
   
    if(toMeeting) {
     firstMenu = "회의";
    } 
   }else{
    firstMenu ="";
   }
   console.log(firstMenu);
   

 
  const [selectedMenu, selectMenu] = useState(firstMenu);
  // useEffect(() => {
  //   const handleChange = () => {};
  //   handleChange();
  //   return () => {};
  // }, [inMeeting]);
  //대시보드 화면 구성
  // 왼쪽 오른쪽으로 나뉨
  // 왼쪽은 SideNav 우측은 화면 표시
  return (
    <>
      <div style={{ height: colHeight }} className="font-SUIT" >
        <Container fluid>
          <Row style={{ height: colHeight }}>
            <Col className="pt-5" sm={1} style={{ minWidth: "200px" }}>
              <SideNav
                icons={icons}
                selectMenu={selectMenu}
                selectedMenu={selectedMenu}
                label={label}
                linkto={menu}
              ></SideNav>
            </Col>
            <Col style={{ padding: "0" }}>
              <div
                className="interpadding pt-5 px-5 pb-2"
                style={{
                  height: "100%",
                  background: "#ECF3FC",
                  borderRadius: "40px 0px 0px 0px",
                }}
              >
                
                {/* SidebarButton이라고 이름지었지만 사실 우측 흰 상자 안 아이콘+라벨있는 메뉴 이름표시  */}
                <SidebarButton
                  show={!inMeeting}
                  notButton={true}
                  klabel={selectedMenu}
                  icon={icons[label.indexOf(selectedMenu)]}
                ></SidebarButton>

                {/* 회의 창에는 흰 부분 없이  */}
                {inMeeting && <Outlet></Outlet>}


                {!inMeeting && (
                  <div
                    className="white pt-2 px-5 pb-5"
                    style={{
                      background: "#FFF",
                      borderRadius: "20px",
                      minHeight: "500px",
                    }}
                  >
                    <Outlet></Outlet>
                  </div>
                )}



                {/* <div
                  className="white pt-2 px-5 pb-5"
                  style={{
                    background: "#FFF",
                    borderRadius: "20px",
                    minHeight: "500px",
                  }}
                >
                  <Outlet></Outlet>
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Dash;
