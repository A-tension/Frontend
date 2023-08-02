// import { Route, Routes } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { NavTab } from "./atoms/tab/NavTab";
import React from "react";
interface Props {
  label: Array<string>;
  linkto: Array<string>;
  style?: string;
  selectMenu: React.Dispatch<React.SetStateAction<string>>;
  selectedMenu: string;
} // 적용해서 수정해야 함
//지금 하려고 하는 것 dash에서 usestate로 현재 어느 탭에 있는지 표시
const SideNav: React.FC<Props> = (props: Props) => {
  //style={{color:'#8C8C8C'}}
  // sidebar & inner header
  const { label, linkto, selectMenu } = props;
  const menu = linkto; // ["group", "calendar", "meeting", "item"];//props.linkto
  // ["그룹", "캘린더", " 회의", "뽑기"];//props.label

  const handleSelect = (menuname: string) => {
    selectMenu(menuname);
  };
  const navlinks = menu.map((eng, index) => (
    <NavTab
      label={label[index]}
      linkto={eng}
      linktype="NavLink"
      button={true}
      className="items-center"
      width="210px"
      height="60px"
      bround="20px"
      variant="outline-primary"
      onClick={() => handleSelect(label[index])}
      key={index}
    ></NavTab>
  ));

  return (
    <>
      <div className="">
        <Nav className="flex-column pt-5">{navlinks}</Nav>
      </div>
    </>
  );
};

export default SideNav;
