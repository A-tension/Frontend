import React, { useState } from "react";
import "./Concentration.css";
import Screen from "../../../components/stream/Screen";
import "../../../components/stream/toolbar.scss";
import focus from "../../../../public/icons/focus_icon.png";
import smile from "../../../../public/icons/smile_emoji.svg";
import meh from "../../../../public/icons/meh_emoji.svg";
import sleep from "../../../../public/icons/sleep_emoji.svg";
const Concentration = (props) => {
  let { total, concentrationList } = props;
if(!total){
  total = 0;
}

if(!concentrationList){
  concentrationList = [1, 1, 1];
}


  const iconList = [smile,meh,sleep];

  const [display, setDisplay] = useState(false);

  const toggleConcentrationMenu = () => {
    setDisplay(!display);
  };

  const onClickToggleConcentrationMenu = () => {
    toggleConcentrationMenu();
  };

  //움직이는 법
  //초기 위치
  // const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const [toolbarPosition, setToolbarPosition] = useState({
    x: window.innerWidth / 2 - 205.05,
    y: window.innerHeight - 60 - 10,
  });

  const onToolbarDragStart = (event) => {
    event.preventDefault();
    const initialPosition = {
      x: event.clientX - toolbarPosition.x,
      y: event.clientY - toolbarPosition.y,
    };
    setToolbarPosition(initialPosition);
    window.addEventListener("mousemove", onToolbarDrag);
    window.addEventListener("mouseup", onToolbarDragEnd);
  };

  const onToolbarDrag = (event) => {
    setToolbarPosition({
      x: event.clientX - toolbarPosition.x,
      y: event.clientY - toolbarPosition.y,
    });
  };

  const onToolbarDragEnd = () => {
    window.removeEventListener("mousemove", onToolbarDrag);
    window.removeEventListener("mouseup", onToolbarDragEnd);
  };

  //스타일

  const opaqueStyle = {
    width: "456px",
    height: "76px",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: "66px",
    backdropFilter: "blur(13.23px)",
    position: "absolute",
    top: toolbarPosition.y + "px",
    left: toolbarPosition.x + "px",
    cursor: "move",
    display: "flex",
    alignItems: "center",
  };

  return (
    <>
      <div>
        <Screen audio={false} video={true}></Screen>
      </div>
      <div
        // className="toolbar-opaque"
        style={opaqueStyle}
        onMouseDown={onToolbarDragStart}
        onMouseUp={onToolbarDragEnd}
      >
        <div className="toolbar-pill-list ">
          <div className="pills">
            <div className="pill-text">집중도</div>
            <div className="pill-text">{total}</div>
          </div>

          {concentrationList.map((concentration, index) => (
            <div className="pills" key={index}>
              <div className="pill-text">
                <img className="icon-block" src={iconList[index]}></img>
                {concentration}
              </div>
            </div>
          ))}
        </div>
        {/* <div className="toolbar-opaque overlay">Toolbar contents</div> */}
      </div>
    </>
  );
};

export default Concentration;
