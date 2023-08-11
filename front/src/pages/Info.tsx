import { Col, FloatingLabel, Button, Form, Image } from "react-bootstrap";
import RoundCard from "../components/atoms/RoundCard";
import fillerImg from "../assets/Memoji.png";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/user";
import { useState } from "react";
interface Edit {
  name: string;
  nickname: string;
}
function Info() {
  const loginUser = useAppSelector(selectUser);
  const [isEdit, setMode] = useState(false);

  const [data, setData] = useState<Edit>({
    name: loginUser.name ? loginUser.name : "",
    nickname: loginUser.userId ? loginUser.userId : "",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEdit = () => {
    // 여기에 data 를 가지고
    setMode(false);
    console.log(data);
  };

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
            <FloatingLabel label="이름" className="mb-3">
              <Form.Control
                name="name"
                readOnly={!isEdit}
                onChange={handleInputChange}
                value={data.name}
                style={{borderRadius:"10px"}}
              />
            </FloatingLabel>
            <FloatingLabel label="대화명" className="mb-3">
              <Form.Control
                name="nickname"
                readOnly={!isEdit}
                onChange={handleInputChange}
                value={data.nickname}
                type="text"
                style={{borderRadius:"10px"}}
              />
            </FloatingLabel>
            <FloatingLabel label="meetingURL" className="mb-3">
              <Form.Control
                readOnly
                type="text"
                defaultValue={loginUser.meetingUrl}
                style={{borderRadius:"10px"}}
              />
            </FloatingLabel>

            <FloatingLabel label="이메일" className="mb-1">
              <Form.Control
                readOnly
                disabled
                type="email"
                defaultValue={loginUser.email}
                style={{borderRadius:"10px"}}
              />
            </FloatingLabel>
            <div style={{display:"flex", justifyContent:"space-between"}}
             >
            {isEdit && (
              <Button variant="primary" onClick={handleEdit}>
                확인
              </Button>
            )}
            {!isEdit && (
              <Button variant="outline-primary" onClick={() => setMode(true)}>
                정보수정
              </Button>
            )}

            <Button variant="danger">회원탈퇴</Button></div>
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
