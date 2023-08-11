import { Button, Card } from "react-bootstrap";
import { Team } from "../Group";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { getPlanlist } from "../../store/plan";
interface Props {
  teamProp?: Team;
}
function Plans(props: Props) {
  const navigate = useNavigate();

  const goCreate = () => {
    navigate("/dash/calendar/add", { state: { group: props.teamProp } });
  };
  const plans = useAppSelector(getPlanlist);
  const planList = plans.map((plan, index) => (
    <div
      key={index}
      style={{
        backgroundColor: "#f7f7f7",
        borderRadius: "6px",
        padding: "10px",
        marginBottom: "10px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* 일정 추가 내용 1 */}
      {plan.name} | {plan.start} |{plan.startdate}|{plan.starttime}|
      {plan.isPrivate}
    </div>
  ));
  return (
    <>
      {/* <h1> prop test {props.teamProp?.name}</h1> */}
      <Card
        style={{
          border: "none",
          marginTop: "-5px",
          padding: "10px",
          borderRadius: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <Button
            variant="primary"
            style={{
              backgroundColor: "#007bff",
              color: "#fff",
              borderRadius: "8px",
            }}
            onClick={goCreate}
          >
            일정 추가
          </Button>
        </div>

        {/* ... 이전 내용 ... */}
        <div>
          {planList}
          {plans.length == 0 && (
            <div
              style={{
                backgroundColor: "#f7f7f7",
                borderRadius: "6px",
                padding: "10px",
                marginBottom: "10px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* 일정 추가 내용 1 */}
              일정이 없습니다.
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

export default Plans;
