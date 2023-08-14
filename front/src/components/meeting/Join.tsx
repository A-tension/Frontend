import { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { hideBackground } from "../../store/test";
interface MeetingData {
  conferenceUrl: string;
  nickname: string;
}
function Join() {
  const [conferenceJoinData, setConferenceJoinData] = useState<MeetingData>({
    conferenceUrl: "",
    nickname: "",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setConferenceJoinData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(conferenceJoinData);
  };

  // const history = useHistory
  const dispatch = useAppDispatch();
  dispatch(hideBackground(false));
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObject = Object.fromEntries(formData);
    // dispatch(meetingModeTest());
    navigate("/dash/meeting", {
      state: {
        conferenceJoinData: conferenceJoinData,
      },
    });
  };
  return (
    <>
      {/* <h1>회의 참여</h1>
      <a>회의 링크 입력</a> */}
      <Form onSubmit={handleSubmit} className="mt-5">
        <Form.Group lg as={Row} className="mb-3" controlId="conferenceUrl">
          <Form.Label column sm={2}>
            회의 코드
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              size="lg"
              style={{ borderRadius: "20px" }}
              placeholder="회의 코드를 입력하세요"
              name="conferenceUrl"
              value={conferenceJoinData.conferenceUrl}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
        <Form.Group lg as={Row} className="mb-3" controlId="nickname">
          <Form.Label column sm={2}>
            닉네임
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              size="lg"
              style={{ borderRadius: "20px" }}
              placeholder="닉네임을 입력하세요"
              name="nickname"
              value={conferenceJoinData.nickname}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
        {/* 대기창으로 가는법,,, onClick={()=><Navigate to={"/wait/:id"}></Navigate>} */}

        <Button type="submit" size="lg" variant="primary">
          참여
        </Button>
        <Button type="reset" size="lg" variant="outline-secondary">
          취소
        </Button>
      </Form>
    </>
  );
}

export default Join;
