// Overlay use className props to pass style properties to child component.
// To make this component work add className props to your child component manually.
// Here an example: https://gist.github.com/Miniplop/8f87608f8100e758fa5a4eb46f9d151f

import iconGroup from '../../../assets/icons/icon_group.svg'
import styles from "./SidebarButton.module.scss";

//    width: 29.41%;
interface Props{
    elabel:string;
    klabel:string 
}

const SidebarButton = (props:Props ) => {
  return (
    <div className={styles.dot}>
      <div className={styles.iconBlock}>
        <img
          alt=""
          className={styles.sidebarButtonIcon}
          src={iconGroup}
        />
      </div>
      <p className={styles.klabel}>{props.klabel}</p>
      <p className={styles.elabel}>{props.elabel}</p>
    </div>
  );
};

export default SidebarButton;
