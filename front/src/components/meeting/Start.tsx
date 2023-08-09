import { Form, Row, Col, Button } from "react-bootstrap";
import { Plan, planCreateTest } from "../../store/plan";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

interface MeetCreateData extends Plan {
  // name:string;
  // members?: User[] | string[] | Team["teamId"]; // axios에서 생성 요청시 자동반환
  // name: string;
  members:string[];//email 목록으로 일단 진행
  startdate: string;
  starttime: string;
  // end?: string;
  isPrivate:boolean;
}
function Start() {
  const navigate = useNavigate();
  const [meetData, setMeetData] = useState<MeetCreateData>({
    name: "",
    members: [""],
    startdate: "",
    starttime: "",
    start:"",
    isPrivate:false
  });
  const dispatch = useAppDispatch();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'members') {
      const emailArray = value.split(',').map(email => email.trim());
      setMeetData((prevData) => ({
        ...prevData,
        [name]: emailArray,
      }));
    } else {
      setMeetData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmitForm =(e: { preventDefault: () => void; })=>{
e.preventDefault();
    console.log(meetData);
    dispatch(planCreateTest(meetData));
    navigate("/dash/meeting/manage")

  }
  return (
    <>
      {/* <h1>회의 개설 </h1>
      <a>
        회의 시작 시간, 제목, 구성원 입력
      </a> */}
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalText">
          <Form.Label column sm={2}>
            제목
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="name"
              value={meetData.name}
              size="lg"
              style={{ borderRadius: "20px" }}
              type="text"
              placeholder="방 제목을 입력하세요"
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalDate">
          <Form.Label column sm={2}>
            날짜
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              name="startdate"
              value={meetData.startdate}
              size="lg"
              style={{ borderRadius: "20px" }}
              type="date"
              placeholder=""
              className="input-border-radius-lg"
              form="rounded"
              onChange={handleInputChange}
            />
          </Col>
          <Form.Label column sm={2}>
            시간
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              name="starttime"
              value={meetData.starttime}
              size="lg"
              style={{ borderRadius: "20px" }}
              type="time"
              placeholder=""
              className="rounded-9"
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            초대
          </Form.Label>
          <Col sm={10}>
            <Form.Control
            name="members"
            value={meetData.members.join(',')}
              size="lg"
              style={{ borderRadius: "20px" }}
              type="text"
              accept="multiple"
              placeholder=""
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check type="checkbox" checked={meetData.isPrivate} label="대기실" onChange={handleInputChange} name="isPrivate"/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10 }}>
            <Button type="submit" onClick={handleSubmitForm}>생성</Button>
            <Button type="reset" variant="outline-primary">
              취소
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
}

export default Start;
