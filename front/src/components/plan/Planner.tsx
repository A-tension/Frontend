import { Button, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { Plan, planCreateTest } from "../../store/plan";
import { Team } from "../../store/group";
import back from "../../assets/arrow-left.svg";

//시간 나면 할 것: 유효성 검사 -> 시작시간이 종료시간보다 늦을 수 없다
interface PlanCreateData extends Plan {
  //email 목록으로 일단 진행
  // startdate: string;
  // starttime: string;
  //teamId:
  // 현재 입력 받아올 수 있는 부분
  name: string;
  members?: string[] | [] | string; // 초대 인원은 사람들 추가, 나 혼자의 일정, 내가 속한 팀이름
  startTime: string;
  sDate: string;
  sTime: string;
  endTime: string;
  eDate: string;
  eTime: string;
  description: string;
}
interface Props {
  group?: Team;
}
function Planner(props: Props) {
  // function Start() {
  //     if(props.isGroup){
  // //axios로 그룹이면 groupId로 특정조회-?? 혹은 이미 받아온 특정조회 정보 가져오기
  // //사용례 생각하면 대시보드 그룹상세에서 가져오는 거니까 이미 저장되어있음

  //     }
  const location = useLocation();

  const propgroup = location.state?.group;
  console.log(propgroup);
  const navigate = useNavigate();
  // new Date().toISOString().replace(/T.*$/, '')
  const today = new Date();
  // const tdString = today.toISOString().replace(/\./g, " ");
  const defaultDate = today.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  // console.log(defaultDate)
  const defaultTime = today.toLocaleTimeString("en-CA", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  }).replace(/ /g, "\n");
  console.log(defaultTime);
  // const defaultTime = `${today.getHours()}:${today.getMinutes()}`;

  const [planData, setPlanData] = useState<PlanCreateData>({
    name: "",
    members: propgroup ? [propgroup.members.toString()] : [""], // 그룹일정추가라면 여기서 그룹멤버 정보를 받아옴
    sDate: defaultDate,
    sTime: defaultTime, //"00:00:00",
    startTime:"", //`${defaultDate}T${defaultTime}`,
    eDate: "",//defaultDate,
    eTime: "11:59\np.m.", //"24:00:00",
    endTime:`${defaultDate}T${defaultTime}`,
    description: "",
    // allDay: false,
    //현재 구현 X
    id: 111, //사용자 입력으로 받을 수 없는 것 //extendedProps.id
    teamId: 306, //사용자 입력으로 받을 수 없는 것 //extendedProps.teamId
    teamName: "5B1F", //groupId
    profileImage: "fillerImg", //extendedProps.profileImage
  });
  const dispatch = useAppDispatch();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(planData.sTime);
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
  const handleSubmitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(planData);
    dispatch(planCreateTest(planData));
    if (propgroup) {
      // navigate("/dash/group",{state:{group:propgroup}})
      // navigate("/dash/calendar/plan",{state:{plan:planData}});
    } else {
      //  navigate("/dash/calendar/plan",{state:{plan:planData}});
    }
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <img
        src={back}
        style={{ width: "30px", marginBottom: "1rem" }}
        onClick={handleBack}
      ></img>
      <Form>
        <i className="bi bi-arrow-left"></i>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
          <Form.Label
            column
            sm={1}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            <div>제목</div>
          </Form.Label>
          <Col sm={11}>
            <Form.Control
              name="name"
              value={planData.name}
              size="lg"
              style={{
                backgroundColor: "#f7f7f7",
                borderRadius: "10px",
                border: "none",
                resize: "none",
              }}
              type="text"
              placeholder="일정 제목을 입력하세요"
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalMembers">
          <Form.Label
            column
            sm={1}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            초대
          </Form.Label>
          <Col sm={11}>
            <Form.Control
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
        <Form.Group as={Row} className="mb-3" controlId="formStartDate">
          <Form.Label
            column
            sm={1}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            날짜
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              name="startdate"
              defaultValue={planData.sDate}
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
            column
            sm={1}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            시간
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              name="starttime"
              defaultValue={planData.sTime}
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
            />
          </Col>
          
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formEndDate">
          <Form.Label
            column
            sm={1}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            종료
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              name="startdate"
              defaultValue={planData.eDate}
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
            column
            sm={1}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            시간
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              name="starttime"
              defaultValue={planData.eTime}
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
              fontSize: "20px",
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
              placeholder="내용을 입력하세요"
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>

        {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check type="checkbox" checked={planData.allDay} label="" onChange={handleInputChange} name="isPrivate"/>
          </Col>
        </Form.Group> */}

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
          <Button
            style={{
              borderRadius: "20px",
              width: "100px",
              height: "40px",
            }}
            type="submit"
            onClick={handleSubmitForm}
          >
            생성
          </Button>
          <Button
            style={{
              borderRadius: "20px",
              width: "100px",
              height: "40px",
            }}
            type="reset"
            variant="outline-primary"
          >
            취소
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

export default Planner;
