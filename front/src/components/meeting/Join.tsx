import { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
interface MeetingData {
  meetingLink: string;
  nickname: string;
}
function Join() {
  const [meetData, setMeetData] = useState<MeetingData>({
    meetingLink: "",
    nickname: "",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMeetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(meetData);
  };

  // const history = useHistory
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObject = Object.fromEntries(formData);
    navigate('/wait', { state: { data: dataObject } });
  };
  return (
    <>
      {/* <h1>회의 참여</h1>
      <a>회의 링크 입력</a> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group lg as={Row} className="mb-3" controlId="meetinglink">
          <Form.Label column sm={2}>
            회의 링크
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              size="lg"
              style={{ borderRadius: "20px" }}
              placeholder="회의 링크를 입력하세요"
              name="meetingLink"
              value={meetData.meetingLink}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
        <Form.Group lg as={Row} className="mb-3" controlId="nickname">
          <Form.Label column sm={2}>
            대화명
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              size="lg"
              style={{ borderRadius: "20px" }}
              placeholder="대화명을 입력하세요"
              name="nickname"
              value={meetData.nickname}
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
