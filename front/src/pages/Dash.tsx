import { Outlet } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import SideNav from "../components/SideNav";
import { useState } from "react";
// interface Props {
//   menuName: string;
// }
const Dash = () => {
  // sidenav selected 받아와서
  
  const headerHeight = 78; // Change this value to match your actual header height
  const colHeight = `calc(100vh - ${headerHeight}px)`;
  // Calculate the height for the columns and inner div


  const menu = ["group", "calendar", "meeting", "item"];
  const label = ["그룹", "캘린더", " 회의", "뽑기"];
  //지금 하려고 하는 것 dash에서 usestate로 현재 어느 탭에 있는지 표시
  const [selectedMenu, selectMenu] = useState("그룹");
  return (
    <>
      <div style={{ height: colHeight }}>
        <Container fluid>

      
        <Row style={{ height: colHeight }}>
          <Col className="" lg={3} >
            <SideNav selectMenu={selectMenu} selectedMenu={selectedMenu} label={label} linkto={menu}></SideNav>
          </Col>
          <Col lgm={9} style={{ padding:"0" }}>
            <div
              className="interpadding pt-5 px-5"
              style={{
                height: "100%",
                background: "#ECF3FC",
                borderRadius: "40px 0px 0px 0px",
              }}
            >
              <h1>{selectedMenu}</h1>
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
