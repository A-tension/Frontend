import React, { useState, useEffect } from "react";
import "./Concentration.css";

const Concentration = (props) => {
  const { total, concentrationList } = props;

  const [display, setDisplay] = useState(false);

  const toggleConcentrationMenu = () => {
    setDisplay(!display);
  };

  const onClickToggleConcentrationMenu = () => {
    toggleConcentrationMenu();
  };

  useEffect(() => {
    if (display) {
      // display가 true일 때 실행할 코드를 작성하세요.
      // 예를 들어, 화면에 표시되는 내용을 변경하거나 추가할 수 있습니다.
    }
  }, [display]);

  return (
    <div className="openModal reaction-wrapper">
      <div
        className={
          display
            ? "openModal reaction-modal reaction-setting-container"
            : "modal"
        }
      >
        <div>Total: {total}</div>
        <div>Concentration List:</div>
        <ul>
          {concentrationList.map((concentration, index) => (
            <li key={index}>{concentration}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Concentration;
