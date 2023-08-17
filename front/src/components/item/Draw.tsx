import React, { useState } from "react";

import draw from "../../assets/DrawCard.svg"; // 경로를 수정하여 import
import { Button } from "react-bootstrap";
import { useAppSelector } from "../../store/hooks";
import { checkTickets } from "../../store/user";
import { getRandomItem } from "../../api/item/itemApi";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user";
import { Item, addItem } from "../../store/item";
// <!-- import draw from "../../assets/draw_ticket.png"; // 경로를 수정하여 import -->

function Draw() {
    const [buttonClicked, setButtonClicked] = useState(false);
    const dispatch = useDispatch();
    // const ticket = useAppSelector(checkTickets);
    const user = useSelector(selectUser);
    console.log("user : ", user);
    const handleButtonClick = async () => {
        // 버튼을 누르면 함수 실행
        setButtonClicked(true);
    
        try {
          // getRandomItem 함수 호출
          const response = await getRandomItem(); // getRandomItem 함수를 실행하고 응답을 받음
          console.log(response);
          // 추가적인 동작을 수행 (아이템 뽑기 성공 등)
          dispatch(checkTickets(user.ticket - 1));
          console.log("response = " ,response);
          const newItem  = response.data.data
          const item : Item = {
            name : newItem.name,
            image : newItem.image,
            itemTypeId : newItem.itemTypeId,
            itemTypeName : newItem.itemTypeName,
            description : newItem.description,
        }
          dispatch(addItem(item));
        } catch (error) {
          console.error("Error while getting random item:", error);
          // 실패 시에 대한 처리 (예: 오류 메시지 표시)
        }
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
                            × {user.ticket}
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

// <!--     const handleButtonClick = () => {
//         // 버튼을 누르면 함수 실행
//         setButtonClicked(true);
//         // 여기에 추가적인 동작을 수행
//
//     };
//
//     return (
//         <>
//             <div style={{ textAlign: "center" }}>
//                 <h1 style={{ fontWeight: "normal", color: "black", marginBottom: "5px", fontSize: "1.2rem" }}>
//                     <span style={{ color: "black" }}>회의에서 사용할 수 있는</span> <span style={{ color: "blue" }}>아이템</span>을 뽑아보세요!
//                 </h1>
//                 <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
//                     <button
//                         style={{
//                             border: "none",
//                             background: "none",
//                             cursor: "pointer",
//                             outline: "none",
//                         }}
//                         onClick={async () => {
//                             //내 팀 조회
//                             const promise = await getRandomItem<CreateMyItemResponseDto[]>();
//                             console.log(promise);}}
//                     >
//                         <img src={draw} alt="아이템 뽑기" style={{ maxWidth: "300px", maxHeight: "300px" }} />
//                     </button>
//                 </div>
//             </div>
//
//
//             {buttonClicked && (
//                 <div style={{ marginTop: "20px", textAlign: "center" }}>
//                     <p>아이템 뽑기 성공!</p>
//                     {/* 추가적인 내용을 여기에 추가가능 */}
//                 </div>
//             )}
//
//
//         </>
//     ); -->

}

export default Draw;