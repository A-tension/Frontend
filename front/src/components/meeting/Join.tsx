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
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setConferenceJoinData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const dispatch = useAppDispatch();
  dispatch(hideBackground(false));
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!conferenceJoinData.conferenceUrl || !conferenceJoinData.nickname) {
      setErrorMessage("회의 코드와 닉네임은 필수 입력값입니다.");
      return;
    }

    navigate("/dash/meeting/wait", {
      state: {
        conferenceJoinData: conferenceJoinData,
      },
    });
  };

  return (
    <>
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
        {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" size="lg" variant="primary">
            참여
          </Button>
          <div style={{ marginLeft: "10px" }} />
        </div>
      </Form>
    </>
  );
}

export default Join;
