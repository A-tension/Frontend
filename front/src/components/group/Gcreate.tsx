import { Form, Button, FloatingLabel } from "react-bootstrap";
// import axios from "axios";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { Team, groupCreateTest, loginload } from "../../store/group";
import { User } from "../../store/user";
import { searchUser } from "../../api/user/userApi.tsx";
import { UserSearchResponseDto } from "../../api/user/types.tsx";
import { UUID } from "crypto";
import { createTeam, findMyTeam } from "../../api/team/teamApi.tsx";
import { createTeamRequestBody } from "../../api/team/types.tsx";

interface GroupCreateData {
  members: UserSearchResponseDto[];
  description: string;
  name: string;
  // profileimg?:string;
}
interface Props {
  teamProp?: Team;
}

function UserListComponent({
  userList,
  selectedUsers,
  onUserSelect, // 새로 추가된 prop
}: {
  userList: UserSearchResponseDto[];
  selectedUsers: UserSearchResponseDto[]; // 선택한 유저 목록 전달
  onUserSelect: (user: UserSearchResponseDto) => void; // 유저 선택 이벤트 핸들러 전달
}) {
  const handleItemClick = (user: UserSearchResponseDto) => {
    console.log(`${user.userId}`);
    onUserSelect(user); // 선택한 유저를 부모 컴포넌트로 전달
  };
  return (
    <div>
      {userList.length > 0 ? (
        <ul>
          {userList.map((user) => (
            <li
              key={user.userId}
              onClick={() => handleItemClick(user)}
              // onMouseOver={() => console.log(user.userId)}
              style={{ display: "flex", borderRadius: "5px" }}
            >
              <img
                src={user.profileImage}
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              {user.name}
              {/*<button style={{alignItems: 'center'}}>추가</button>*/}
            </li>
          ))}
        </ul>
      ) : (
        <p></p>
      )}
    </div>
  );
}
const Gcreate = (props: Props) => {
  const [userList, setUserList] = useState<UserSearchResponseDto[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserSearchResponseDto[]>(
    []
  );

  const handleItemClick = (user: UserSearchResponseDto) => {
    setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
    setUserList([]); // userList 초기화
    console.log(selectedUsers);
  };
  const [groupData, setGroupData] = useState<GroupCreateData | Team>({
    name: props.teamProp ? props.teamProp.name : "",
    members: props.teamProp?.members ? props.teamProp.members : [""],
    description: props.teamProp?.description ? props.teamProp.description : "",
  });
  const dispatch = useAppDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "members") {
      const memberArray = value.split(",").map((member) => member.trim());
      const search = searchUser<UserSearchResponseDto[]>(value);
      search.then(function (result) {
        if (result.data.data !== undefined) {
          setUserList(result.data.data);
          console.log("search userList" + userList);
        }
      });
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
  const handleCreate = async () => {
    if (props.teamProp) {
      console.log("edit");
    } else {
      const userIdList: UUID[] = [];
      for (const user of selectedUsers) {
        userIdList.push(user.userId);
      }
      const createTeamRequestBody: createTeamRequestBody = {
        name: groupData.name,
        userIdList: userIdList,
        description: groupData.description ?? "",
      };
      await createTeam(createTeamRequestBody);
      await findMyTeam().then((result) =>
        dispatch(loginload(result.data.data))
      );
      

      // findMyTeam()
      // TODO
      //  groupData 변경 필요
    }

    console.log(groupData);
    // 생성시 그룹 조회 호출/ 특정그룹 정보 호출
    // e.preventDefault();
    // const formData = new FormDataEvent(e.target);
    // const dataObject = Object.fromEntries(formData);
    // Navigate('/dash/group',{state:{data:dataObject}});
    //axios api put?placeholder="그룹명을 입력하세요"placeholder="그룹원을 추가하세요"
  };
  const handledelete = () => {
    console.log("delete group");
  };
  const handleEdit = () => {
    console.log("edit");
  };
  return (
    <>
      <div
        style={{
          overflowY: "auto",
          height:"450px"
        }}
      >
        <h1>그룹 생성</h1>
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
              <UserListComponent
                memberlist={props.teamProp?.members}
                userList={userList}
                selectedUsers={selectedUsers} // 선택한 유저 목록 전달
                onUserSelect={handleItemClick} // 유저 선택 이벤트 핸들러 전달
              />
              <div>
                <div>초대된 유저</div>
                {selectedUsers.length > 0 ? (
                  // {userList.map((user) => (
                  //         <li key={user.userId}
                  <ul style={{ display: "flex" }}>
                    {selectedUsers.map((user) => (
                      <li
                        key={user.userId}
                        style={{
                          display: "flex",
                          borderRadius: "5px",
                          marginRight: "10px",
                        }}
                      >
                        <img
                          src={user.profileImage}
                          style={{ height: "30px" }}
                        />
                        {user.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul></ul>
                )}
              </div>
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
              <div style={{ display: "flex", width: "100%", gap: "6.6px" }}>
                {/* <div style={{display:"flex"}}> */}
                <Button
                  onClick={handleEdit}
                  style={{
                    borderRadius: "20px",
                    width: "100px",
                    height: "40px",
                  }}
                  variant="outline-primary"
                >
                  그룹 수정
                </Button>
                <Button
                  onClick={handledelete}
                  style={{
                    borderRadius: "20px",
                    width: "100px",
                    height: "40px",
                  }}
                  variant="danger"
                >
                  그룹 삭제
                </Button>
              </div>
            )}

            {!props.teamProp && (
              <div style={{ display: "flex", width: "100%" }}>
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
                </Button>{" "}
              </div>
            )}

            {/* <Form.Control type="button"readOnly defaultValue="" /> */}
          </Form>
        </div>{" "}
      </div>
    </>
  );
};
export default Gcreate;
