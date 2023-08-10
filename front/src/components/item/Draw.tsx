import React, { useState } from "react";
import draw from "../../assets/draw_ticket.png"; // 경로를 수정하여 import

function Draw() {
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleButtonClick = () => {
        // 버튼을 누르면 함수 실행
        setButtonClicked(true);
        // 여기에 추가적인 동작을 수행
    };

    return (
        <>
            <div style={{ textAlign: "center" }}>
                <h1 style={{ fontWeight: "normal", color: "black", marginBottom: "5px", fontSize: "1.2rem" }}>
                    <span style={{ color: "black" }}>회의에서 사용할 수 있는</span> <span style={{ color: "blue" }}>아이템</span>을 뽑아보세요!
                </h1>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                    <button
                        style={{
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            outline: "none",
                        }}
                        onClick={handleButtonClick}
                    >
                        <img src={draw} alt="아이템 뽑기" style={{ maxWidth: "300px", maxHeight: "300px" }} />
                    </button>
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
