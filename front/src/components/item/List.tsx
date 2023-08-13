import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import imoticon from "../../assets/imoticon.png";
import choose from "../../assets/choose.png";
import pass from "../../assets/pass.png";
import { selectUser } from "../../store/user"; // selectUser 추가
import { Item } from '../../store/item'; 
import { User } from '../../store/user'; 

function List() {
  // useSelector를 사용하여 Redux 스토어의 상태 가져오기
  const user = useSelector(selectUser);

  // user 객체에서 myItems 배열 가져오기
  const myItems: Item[] = user.myItems;

  // 아래의 console.log를 추가해 사용자의 아이템 목록을 콘솔에 출력합니다.
  console.log("User's Items:", user.myItems);

  const grayBoxStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: "80%",
  };

  const imageStyle: React.CSSProperties = {
    width: "60px",
    height: "60px",
    marginBottom: "10px",
  };

  const textStyle: React.CSSProperties = {
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "bold",
  };


  return (
    <Container>
      <Row>
      
        <Col style={{ marginTop: "10px", marginRight: "-200px" }}>
          <div style={grayBoxStyle}>
            <img src={imoticon} alt="이모티콘" style={imageStyle} />
            <p style={textStyle}>아이템 이름</p>
            <p style={textStyle}>* 개수</p>
          </div>
        </Col>
        <Col style={{ marginTop: "10px", marginRight: "-200px" }}>
          <div style={grayBoxStyle}>
            <img src={choose} alt="발표 지목권" style={imageStyle} />
            <p style={textStyle}>발표 지목권</p>
            <p style={textStyle}>* 개수</p>
          </div>
        </Col>
        <Col style={{ marginTop: "10px" }}>
          <div style={grayBoxStyle}>
            <img src={pass} alt="발표 패스권" style={imageStyle} />
            <p style={textStyle}>발표 패스권</p>
            <p style={textStyle}>* 개수</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default List;
