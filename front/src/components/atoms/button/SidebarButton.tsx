// Overlay use className props to pass style properties to child component.
// To make this component work add className props to your child component manually.
// Here an example: https://gist.github.com/Miniplop/8f87608f8100e758fa5a4eb46f9d151f

// import iconGroup from '../../../assets/icons/icon_group.svg'
import styles from "./SidebarButton.module.scss";
import { Button } from "react-bootstrap";
//    width: 29.41%;
interface Props {
  elabel?: string;
  klabel: string;
  icon?: string;
  notButton?: boolean | false;
  selected?: boolean | false;
  show?:boolean | true;
}

const SidebarButton = (props: Props) => {
  if (props.notButton) {
    if(!props.show){
      return ;
    }else{
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginLeft: "60px",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          <div className={styles.iconBlock}>
            <img
              // style={{transform:"scale(2)"}}
              alt={props.klabel}
              className={styles.sidebarButtonIcon}
              src={props.icon}
            />
          </div>
          <p className={styles.klabel} style={{ fontSize: "26px" }}>
            {props.klabel}
          </p>
          {props.elabel && <p className={styles.elabel}>{props.elabel}</p>}
        </div>
      </>
    );}
  } else {
    return (
      <Button
        active={props.selected}
        variant="outline-primary"
        style={{ width: "100%",height:"53px", accentColor: "#006BE5", borderRadius: "13px" }}
      >
        <div className={styles.dot}>
          <div className={styles.iconBlock}>
            {/* <svg
            width={"22px"}
            height={"22px"}
            viewBox="0 0 22 22"
              className={styles.sidebarButtonIcon}
              fill={props.selected ? "white" : "gray"}
            >
              <use xlinkHref={props.icon}></use>
            </svg> */}
            <img
            alt={props.klabel}
            className={styles.sidebarButtonIcon}
            src={props.icon}
            style={{fill:(props.selected? "white": "gray")}}
          />
          </div>
          <p
            className={styles.klabel}
            style={{ color: props.selected ? "white" : "gray" }}
          >
            {props.klabel}
          </p>
          {props.elabel && (
            <p
              className={styles.elabel}
              style={{ color: props.selected ? "white" : "gray" }}
            >
              {props.elabel}
            </p>
          )}
        </div>
      </Button>
    );
  }
};

export default SidebarButton;
