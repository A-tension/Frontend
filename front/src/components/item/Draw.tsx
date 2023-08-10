import React, { useState } from "react";
import draw from "../../assets/DrawCard.svg"; // 경로를 수정하여 import
import { Button } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import { checkTickets } from "../../store/user";

function Draw() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const tickets = useAppSelector(checkTickets);
  const handleButtonClick = () => {
    // 버튼을 누르면 함수 실행
    setButtonClicked(true);
    // 여기에 추가적인 동작을 수행
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontWeight: "normal",
            color: "black",
            marginBottom: "5px",
            fontSize: "1.2rem",
          }}
        >
          <span style={{ color: "black" }}>회의에서 사용할 수 있는</span>{" "}
          <span style={{ color: "blue" }}>아이템</span>을 뽑아보세요!
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            position: "relative",
          }}
        >
          {" "}
          <img
            src={draw}
            alt="아이템 뽑기"
            style={{ maxWidth: "300px", maxHeight: "420px" }}
          />
          <div
            style={{
              position: "absolute",
              top: "65%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <h4 style={{ marginTop:"20px",fontWeight: "bold", fontStyle: "italic" }}>
              × {tickets}
            </h4>
            <Button
              style={{
                borderRadius: "80px",
                width: "150px",
                marginTop: "60px",
              }}
              onClick={handleButtonClick}
            >
              뽑기!&nbsp;&nbsp; ×1
            </Button>
          </div>
        </div>
      </div>
      {buttonClicked && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <p>아이템 뽑기 성공!</p>
          {/* 추가적인 내용을 여기에 추가가능 */}
        </div>
      )}
    </>
  );
}

export default Draw;
