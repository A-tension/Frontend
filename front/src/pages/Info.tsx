import { Col, FloatingLabel, Button, Form, Image } from "react-bootstrap";
import RoundCard from "../components/atoms/RoundCard";
import fillerImg from "../assets/Memoji.png";
function Info() {
  return (
    <>
      <RoundCard width="900px" height="400px">
        {/* <p>
        CARD 
          image | form + buttons
      </p> */}
        <Col className="d-flex flex-column  align-items-center  justify-content-center">
          <div>
            <Image
              src={fillerImg}
              fluid
              roundedCircle
              width={200}
              alt="profile picture"
            ></Image>
            {/* 사진 수정 */}
          </div>
        </Col>
        {/* align-items-center 
            className="d-flex align-items-center justify-content-center"
            */}
        <Col className="position-relative py-2 px-4 d-flex flex-column align-items-center justify-content-center">
          <Form style={{ width: "100%" }}>
            <FloatingLabel label="이름">
              <Form.Control readOnly defaultValue="김싸피" />
            </FloatingLabel>
            <FloatingLabel label="대화명">
              <Form.Control readOnly type="text" defaultValue="싸피" />
            </FloatingLabel>
            <FloatingLabel label="이메일">
              <Form.Control
                readOnly
                disabled
                type="email"
                defaultValue="kimssafy@ssafy.com"
              />
            </FloatingLabel>
            <Button variant="danger">회원탈퇴</Button>
            {/* <Form.Control type="button"readOnly defaultValue="" /> */}
          </Form>
          {/* 
          <div className="mb-4">이름- 수정</div>
          <div className="mb-4">대화명- 수정</div>
          <div className="mb-4">소셜로그인이메일</div>
          개인미팅룸주소
          <div className="mb-4">회원탈퇴</div> */}
        </Col>
      </RoundCard>
    </>
  );
}

export default Info;
