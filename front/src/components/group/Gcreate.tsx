import { Form, Button, FloatingLabel } from "react-bootstrap";
// import axios from "axios";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { Team, groupCreateTest } from "../../store/group";
import { User } from "../../store/user";
interface GroupCreateData extends Team {
  members: string[] | User[];
  description: string;
  // id:string;
  name: string;
  // profileimg?:string;
}
interface Props {
  teamProp?: Team;
}

const Gcreate = (props: Props) => {
  const [groupData, setGroupData] = useState<GroupCreateData>({
    name: props.teamProp ? props.teamProp.name : "",
    members: props.teamProp?.members ? props.teamProp.members : [""],
    description: props.teamProp?.description ? props.teamProp.description : "",
    teamId: 714,
  });
  const dispatch = useAppDispatch();

  // const [groupData, setGroupData] = useState({
  //   name:"",
  //   members: [""],
  //   description: "",
  //   teamId:"",
  // });
  // <Form.Control onChange={handleInputChange}  value={groupData.name}></Form.Control>
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setGroupData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "members") {
      const memberArray = value.split(",").map((member) => member.trim());
      setGroupData((prevData) => ({
        ...prevData,
        [name]: memberArray,
      }));
    } else {
      setGroupData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleCreate = () => {
    // axios.post("http://your-api-endpoint", groupData)
    // .then((response) => {
    //   console.log("Response:", response.data);
    //   // Do something with the response if needed
    // })
    // .catch((error) => {
    //   console.error("Error creating group:", error);
    //   // Handle errors if needed
    // });
    if (props.teamProp) {
      console.log("edit");
    } else {
      dispatch(groupCreateTest(groupData));
    }

    console.log(groupData);
    // 생성시 그룹 조회 호출/ 특정그룹 정보 호출
    // e.preventDefault();
    // const formData = new FormDataEvent(e.target);
    // const dataObject = Object.fromEntries(formData);
    // Navigate('/dash/group',{state:{data:dataObject}});
    //axios api put?placeholder="그룹명을 입력하세요"placeholder="그룹원을 추가하세요"
  };
  const handledelete=()=>{
    console.log("delete group");
  }
const handleEdit=()=>{
  console.log("edit")
}
  return (
    <>
      <h1>이미지 업로드</h1>
      <div style={{ marginTop: "20px" }}>
        <Form onSubmit={handleCreate}>
          <FloatingLabel label="그룹명" className="mb-3">
            <Form.Control
              name="name"
              type="text"
              style={{
                backgroundColor: "#f7f7f7",
                borderRadius: "10px",
                border: "none",
                resize: "none",
              }}
              value={groupData.name}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel label="그룹원" className="mb-3">
            <Form.Control
              name="members"
              type="text"
              style={{
                backgroundColor: "#f7f7f7",
                borderRadius: "10px",
                border: "none",
                resize: "none",
              }}
              value={groupData.members}
              onChange={handleInputChange}
            />
          </FloatingLabel>
          <FloatingLabel label="그룹 설명" className="mb-3">
            <Form.Control
              name="description"
              as="textarea"
              style={{
                backgroundColor: "#f7f7f7",
                borderRadius: "10px",
                border: "none",
                resize: "none",
              }}
              value={groupData.description}
              onChange={handleInputChange}
              cols={10}
            />
          </FloatingLabel>
        
            {props.teamProp && (
                <div style={{ display: "flex", width:"100%" }}>
              {/* <div style={{display:"flex"}}> */}
                <Button
                  onClick={handleEdit}
                  style={{
                    borderRadius: "10px",
                    // width: "20%",
                    justifySelf: "flex-end",
                  }}
                  variant="outline-primary"
                >
                  그룹 수정
                </Button>
                <Button
                  onClick={handledelete}
                  style={{
                    borderRadius: "10px",
                    // width: "20%",
                    justifySelf: "flex-end",
                  }}
                  variant="danger"
                >
                  그룹 삭제
                </Button>
              </div>
            )}

            {!props.teamProp && (
                <div style={{ display: "flex", width:"100%" }}>
              <Button
                onClick={handleCreate}
                style={{
                  borderRadius: "10px",
                  width: "20%",
                  justifySelf: "flex-start",
                }}
                variant="outline-primary"
              >
                그룹 생성
              </Button> </div>
            )}
         
          {/* <Form.Control type="button"readOnly defaultValue="" /> */}
        </Form>
      </div>
    </>
  );
};
export default Gcreate;
