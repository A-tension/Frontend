import { Form, Button, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
interface GroupCreateData {
  // groupId:string;
  members: string[];
  description:string;
  // id:string;
  name: string;
  // profileimg?:string;
}


const Gcreate = () => {

  const [groupData, setGroupData] = useState<GroupCreateData>({
    name:"",
    members:[""],
    description:"",
    
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setGroupData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
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
    
    console.log(groupData)
    // 생성시 그룹 조회 호출/ 특정그룹 정보 호출 
    // e.preventDefault();
    // const formData = new FormDataEvent(e.target);
    // const dataObject = Object.fromEntries(formData);
    // Navigate('/dash/group',{state:{data:dataObject}});
    //axios api put?placeholder="그룹명을 입력하세요"placeholder="그룹원을 추가하세요"
  };

  return (
    <>
      <h1>이미지 업로드</h1>
      <Form onSubmit={handleCreate} style={{ width: "100%" }}>
        <FloatingLabel label="그룹명">
          <Form.Control name="name" type="text" />
        </FloatingLabel>
        <FloatingLabel label="그룹원">
          <Form.Control
            name="members"
            type="text"
            
            value={groupData.members}
            onChange={handleInputChange}
          />
        </FloatingLabel>
        <FloatingLabel label="그룹 설명">
          <Form.Control
            name="description"
            type="textarea"
            style={{ height: "100px" }}
            value={groupData.description}
            onChange={handleInputChange}
          />
        </FloatingLabel>
        <Button onClick={handleCreate} variant="primary">
          그룹생성
        </Button>
        {/* <Form.Control type="button"readOnly defaultValue="" /> */}
      </Form>
    </>
  );
};
export default Gcreate;
