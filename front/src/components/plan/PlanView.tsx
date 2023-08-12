import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { Plan, planCreateTest } from "../../store/plan";

interface PlanCreateData extends Plan {
  // name:string;
  // members?: User[] | string[] | Team["teamId"]; // axios에서 생성 요청시 자동반환
  name: string;
  members?: string[]; //email 목록으로 일단 진행
  // startdate: string;
  startTime: string;
  endTime: string;
  // end?: string;
  allDay: boolean;
  description: string;
}
function PlanView() {
  const navigate = useNavigate();
  const location = useLocation();
  const getGroup = location.state?.propgroup;
  const getPlan = location.state?.plan;
  // navigate('/dash/meeting/wait', { state: { data: dataObject } });

  const [planData, setPlanData] = useState<PlanCreateData>({
    name: getPlan ? getPlan.name : "받아온일정이라는 설정",
    members: getPlan ? getPlan.member : ["ssafy@ssafy,ssafy@naver"],
    startdate: getPlan ? getPlan.startdate : "2023-08-08",
    starttime: getPlan ? getPlan.starttime : "18:00",
    start: getPlan ? getPlan.start : "",
    description: getPlan ? getPlan.description : "",
    // allDay: getPlan? getPlan.allDay:false,
  });
  const [isEdit, setMode] = useState(false);

  const dispatch = useAppDispatch();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "members") {
      const memberArray = value.split(",").map((email) => email.trim());
      setPlanData((prevData) => ({
        ...prevData,
        [name]: memberArray,
      }));
    } else {
      setPlanData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handlePlanEdit = () => {
    // 여기에 data 를 가지고
    setMode(false);
    console.log(planData);
  };
  const handlePlanDelete = () => {
    // 여기에 data 를 가지고
    setMode(false);
    console.log(planData);
  };
  

  return (
    <>
      {/* <h1>일정 상세조회, 받아온 데이터를 value로 두고 고침</h1> */}
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
          <Form.Label
            column
            sm={1}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>제목</div>
          </Form.Label>
          <Col sm={11}>
            <Form.Control
              name="name"
              value={planData.name}
              disabled={!isEdit}
              readOnly={!isEdit}
              size="lg"
              style={{
                backgroundColor: "#f7f7f7",
                borderRadius: "10px",
                border: "none",
                resize: "none",
              }}
              type="text"
              placeholder={planData.name}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalMembers">
          <Form.Label column sm={1}>
            초대
          </Form.Label>
          <Col sm={11}>
            <Form.Control
               disabled={!isEdit}
               readOnly={!isEdit}
              name="members"
              value={planData.members?.join(",")}
              size="lg"
              style={{
                backgroundColor: "#f7f7f7",
                borderRadius: "10px",
                border: "none",
                resize: "none",
              }}
              type="text"
              accept="multiple"
              placeholder="인원을 쉼표 ','로 구분하세요"
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalDate">
          <Form.Label column sm={1}>
            날짜
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              disabled={!isEdit}
              readOnly={!isEdit}
              name="startdate"
              value={planData.startTime}
              size="lg"
              style={{
                backgroundColor: "#f7f7f7",
                borderRadius: "10px",
                border: "none",
                resize: "none",
              }}
              type="date"
              placeholder=""
              className="input-border-radius-lg"
              form="rounded"
              onChange={handleInputChange}
            />
          </Col>
          <Form.Label
                disabled={!isEdit}
                readOnly={!isEdit}
            column
            sm={1}
            style={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            시간
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              name="starttime"
              value={planData.startTime}
              size="lg"
              style={{
                backgroundColor: "#f7f7f7",
                borderRadius: "10px",
                border: "none",
                resize: "none",
              }}
              type="time"
              placeholder=""
              className="rounded-9"
              onChange={handleInputChange}
              disabled={!isEdit}
              readOnly={!isEdit}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
          <Form.Label
            column
            sm={1}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
            }}
          >
            <div>내용</div>
          </Form.Label>
          <Col sm={11}>
            <Form.Control
              name="description"
              value={planData.description}
              className="text-start"
              size="lg"
              style={{
                backgroundColor: "#f7f7f7",
                borderRadius: "10px",
                border: "none",
                resize: "none",
              }}
              as="textarea"
              rows={5}
              placeholder={planData.description}
              onChange={handleInputChange}
              disabled={!isEdit}
              readOnly={!isEdit}
            />
          </Col>
        </Form.Group>

        {/* <Form.Group as={Row} className="mb-3"> */}
        <Col
          sm={{ span: 10 }}
          style={{
            display: "flex",
            // padding: "8.012px 40.063px",
            justifyContent: "left",
            alignItems: "center",
            gap: "6.6px",
          }}
        >
          {isEdit && (
            <Button
              variant="primary"
              style={{
                borderRadius: "20px",
                width: "100px",
                height: "40px",
              }}
              onClick={handlePlanEdit}
            >
              확인
            </Button>
          )}
          {!isEdit && (
            <Button
              variant="outline-primary"
              style={{
                borderRadius: "20px",
                width: "100px",
                height: "40px",
              }}
              onClick={() => setMode(true)}
            >
            수정
            </Button>
          )}
          <Button
            style={{
              borderRadius: "20px",
              width: "100px",
              height: "40px",
            }}
            type="reset"
            variant="danger"
            onClick={handlePlanDelete}
          >
            삭제
          </Button>
        </Col>
      </Form>

      {/* <div className=" w-96 h-96 flex-col justify-center items-start gap-8 inline-flex">

      </div> */}
      {/* <a>
      개인 일정 + 그룹일정 , 어디서 들어왔는지,, props로 받기?
      </a> */}
    </>
  );
}

export default PlanView;
