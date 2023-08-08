import { Nav } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks"
import { getPlanlist } from "../../store/plan"
import { Outlet } from "react-router-dom";

function Manage() {
const planlist = useAppSelector(getPlanlist);
const plans = planlist.map((plan, index) => (
  <Nav.Item
    as={Nav.Link}
    eventKey={index}
    key={index}
  >
    {plan.name} | 
  </Nav.Item>
));
  return (
    <>
      <h1>
        미팅 관리
      </h1>
      
{plans}
<Outlet></Outlet>
      
    </>
  )
}

export default Manage
