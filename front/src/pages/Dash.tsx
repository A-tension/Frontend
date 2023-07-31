import { Outlet } from "react-router-dom";
import { Row,  Col} from 'react-bootstrap'
import SideNav from "../components/SideNav";

function Dash() {
  return (
    <>
    <Row>
      <Col sm={2}><SideNav></SideNav>
      </Col>
    <Col sm={10}>
    
    <div style={{background:'#ECF3FC', borderRadius:'40px 0px 0px 0px'}}>
      <Outlet></Outlet>
    </div>
    </Col>
    </Row>

    </>
  );
}

export default Dash;
