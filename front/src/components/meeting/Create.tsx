import { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";

interface MeetingData {
  conferenceTitle: string;
  nickname: string;
}

function Create() {
  const [conferenceCreateData, setConferenceCreateData] = useState<MeetingData>(
    {
      conferenceTitle: "",
      nickname: "",
    }
  );
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setConferenceCreateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(conferenceCreateData);
  };

  // const history = useHistory
  const dispatch = useAppDispatch();
  // dispatch(hideBackground(false));
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObject = Object.fromEntries(formData);
    // dispatch(meetingModeTest());
    navigate("/dash/meeting/wait", {
      state: {
        conferenceCreateData: conferenceCreateData,
      },
    });
  };
  return (
    <>
      {/* <h1>회의 참여</h1>
      <a>회의 링크 입력</a> */}
      <Form onSubmit={handleSubmit} className="mt-5">
        <Form.Group lg as={Row} className="mb-3" controlId="meetinglink">
          <Form.Label column sm={2}>
            회의 제목
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              size="lg"
              style={{ borderRadius: "20px" }}
              placeholder="회의 제목을 입력하세요"
              name="conferenceTitle"
              value={conferenceCreateData.conferenceTitle}
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
              value={conferenceCreateData.nickname}
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

export default Create;
