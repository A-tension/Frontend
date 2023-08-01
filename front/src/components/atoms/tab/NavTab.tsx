import { Nav ,Button} from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

interface Props {
  linkto: string;
  label: string;
  linktype?: "NavLink" | "Nav";
  button?: boolean;
  height?: string;
  width?: string;
  bround?:string;
  disabled?: boolean;
  variant?:string;
  className?:string;
}
//button을 props로 받았다면
//{props.Button && }
export const NavTab = (props: Props) => {
  if (!props.button) {
    return (
      <>
        <Nav.Item>
          <Nav.Link
            disabled={props.disabled}
            as={props.linktype == "Nav" ? Link : NavLink}
            to={props.linkto}
          >
            {props.label}
          </Nav.Link>
        </Nav.Item>
      </>
    );
  } else {
    // button 유무
    return (
      <>
        <Nav.Link as={props.linktype == "Nav" ? Link : NavLink} to={props.linkto}>
          <Button
            className={props.className}
            style={{ width: props.width, height: props.height, borderRadius: props.bround }}
            variant={props.variant} aria-selected
          >
            {props.label}
          </Button>
        </Nav.Link>
      </>
    );
  }

  // return (
  <>
    {/* <Nav.Item>
          <Nav.Link as={linktype} to={props.linkto}>{props.label}</Nav.Link>
        </Nav.Item> */}
    {/* <Nav variant="underline" defaultActiveKey="/home">

        <Nav.Item>
          <Nav.Link eventKey="link-1">Option 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav> */}
  </>;
  // );
};
