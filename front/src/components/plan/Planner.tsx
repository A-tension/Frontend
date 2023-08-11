import { Button, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { Plan, planCreateTest } from "../../store/plan";
import { Team } from "../../store/group";
import back from "../../assets/arrow-left.svg";
interface PlanCreateData extends Plan {
  // name:string;
  // members?: User[] | string[] | Team["teamId"]; // axios에서 생성 요청시 자동반환
  // name: string;
  members?: string[]; //email 목록으로 일단 진행
  startdate: string;
  starttime: string;
  // end?: string;
  // allDay: boolean;
  description: string;
}
interface Props {
  // isGroup?:boolean|false;
  // teamId?:number;
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
  const [planData, setPlanData] = useState<PlanCreateData>({
    name: "",
    members: propgroup ? [propgroup.members.toString()] : [""],// 그룹일정추가라면 여기서 그룹멤버 정보를 받아옴
    startdate: "",
    starttime: "",
    start: "",
    description: "",
    // allDay: false,
  });
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
  const handleSubmitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(planData);
    dispatch(planCreateTest(planData));
    if(propgroup){
      // navigate("/dash/group",{state:{group:propgroup}})
      navigate("/dash/calendar/plan",{state:{plan:planData}});
    }else{
       navigate("/dash/calendar/plan",{state:{plan:planData}});
    }
   
  };
  const handleBack=()=>{
    navigate(-1);
  }
  return (
    <>

    <img src={back} style={{width:"30px",marginBottom:"1rem"}} onClick={handleBack}></img>
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
              fontSize:"20px"
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
          <Form.Label column sm={1} style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize:"20px"
            }}>
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
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalDate">
          <Form.Label column sm={1} style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize:"20px"
            }}>
            날짜
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              name="startdate"
              value={planData.startdate}
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
              fontSize:"20px"
            }}
          >
            시간
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              name="starttime"
              value={planData.starttime}
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
              fontSize:"20px"
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
