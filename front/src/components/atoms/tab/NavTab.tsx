import { Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import SidebarButton from "../button/SidebarButton";

interface Props {
  linkto: string;
  label: string;
  linktype?: "NavLink" | "Nav";
  button?: boolean;
  height?: string;
  width?: string;
  bround?: string;
  disabled?: boolean;
  variant?: string;
  className?: string;
  onClick?: () => void;
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
    // button 유무, CSS 완전 동일하게 할지 옵션 두개
    return (
      <>
        <Nav.Link
          as={props.linktype == "Nav" ? Link : NavLink}
          to={props.linkto}
          onClick={props.onClick}
        >
          {/* <Button
            className={props.className}
            style={{ width: props.width, height: props.height, borderRadius: props.bround }}
            variant={props.variant} aria-selected
          >
            {props.label}
          </Button> */}
          <SidebarButton
            elabel={props.linkto}
            klabel={props.label}
          ></SidebarButton>
        </Nav.Link>
      </>
    );
  }
};
