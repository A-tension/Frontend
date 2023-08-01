import { Outlet } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import SideNav from "../components/SideNav";
import { useState } from "react";
interface Props{
  // menuName: string;
}
const Dash=()=> {
  // sidenav selected 받아와서
  const headerHeight = 80; // Change this value to match your actual header height

  // Calculate the height for the columns and inner div
  const colHeight = `calc(100vh - ${headerHeight}px)`;

  const menu = ["group", "calendar", "meeting", "item" ];
  const label = ["그룹", "캘린더"," 회의", "뽑기"];
//지금 하려고 하는 것 dash에서 usestate로 현재 어느 탭에 있는지 표시
  const[selectedMenu, selectMenu] = useState("group");
  return (
    <>
      <div style={{ height: colHeight }}>
        <Row style={{ height: colHeight }}>
         
          <Col className="" sm={3} style={{ height: "100%" }}>
            <SideNav label={label} linkto={menu}></SideNav>
          </Col>
          <Col sm={9}>
            <div
              className="interpadding pt-5 px-5"
              style={{
                height: "100%",
                background: "#ECF3FC",
                borderRadius: "40px 0px 0px 0px",
              }}
            > <h1>{selectedMenu}</h1>
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
      </div>
    </>
  );
}

export default Dash;
