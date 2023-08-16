import { Col, FloatingLabel, Button, Form, Image } from "react-bootstrap";
import RoundCard from "../components/atoms/RoundCard";
import fillerImg from "../assets/Memoji.png";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/user";
import { useState , useEffect} from "react";
import { updateUserProfile , deleteUser, getUserProfile } from "../api/user/userApi.tsx";
import {UserProfileUpdateDTO, UserResponseDTO} from "../api/user/types.tsx";

interface Edit {
  name: string;
  profileImage: string;

}
function Info() {
  const loginUser = useAppSelector(selectUser);
  console.log(loginUser);
  const [isEdit, setMode] = useState(false);
  const [data, setData] = useState<Edit>({
    name: loginUser.name || "",
    profileImage: loginUser.profileImage || "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 정보 수정 함수
  const handleEdit = async () => {
    try {
      const userProfileUpdateDto : UserProfileUpdateDTO = {
        name : data.name,
        profileImage : data.profileImage,
      }
      await updateUserProfile<UserResponseDTO>(
        userProfileUpdateDto
      );

      setMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser<void>();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await getUserProfile<UserResponseDTO>();
        const userProfile = response.data.data;
        setData({
          name: userProfile.name,
          profileImage: userProfile.profileImage,
        });
        console.log(" useEffect, userProfile = ", userProfile);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserData();
  }, []);

  return (
      <>
        <RoundCard width="900px" height="400px">
          {/* <p>
        CARD
          image | form + buttons
      </p> */}
          <Col className="d-flex flex-column  align-items-center  justify-content-center">
            <div>
              <Image
                  src={data.profileImage}
                  fluid
                  roundedCircle
                  width={200}
                  alt="profile picture"
              ></Image>
              {/* 사진 수정 */}
            </div>
          </Col>
          {/* align-items-center
            className="d-flex align-items-center justify-content-center"
            */}
          <Col className="position-relative py-2 px-4 d-flex flex-column align-items-center justify-content-center">
            <Form style={{ width: "100%" }}>
              <FloatingLabel label="이름">
                <Form.Control
                    name="name"
                    readOnly={!isEdit}
                    onChange={handleInputChange}
                    // data로하면 받아지고 loginUser로하면 안받아짐 ㅋㅋ 킹받네
                    value={loginUser.name}
                />
              </FloatingLabel>
              <FloatingLabel label="프로필이미지">
                <Form.Control
                     name="profileImage"
                    readOnly={!isEdit}
                    onChange={handleInputChange}
                    value={loginUser.profileImage}
                    type="text"
                />
              </FloatingLabel>
              <FloatingLabel label="meetingURL">
                <Form.Control
                    readOnly
                    disabled
                    type="text"
                    defaultValue={loginUser.meetingUrl}
                />
              </FloatingLabel>

              <FloatingLabel label="이메일">
                <Form.Control
                    readOnly
                    disabled
                    type="email"
                    defaultValue={loginUser.email}
                />
              </FloatingLabel>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {isEdit ? (
                    <Button variant="outline-primary" onClick={handleEdit}>
                      확인
                    </Button>
                ) : (
                    <Button variant="outline-primary" onClick={() => setMode(true)}>
                      정보수정
                    </Button>
                )}
                <Button variant="danger" onClick={handleDelete}>회원탈퇴</Button> {/* 추가 */}
              </div>
              {/* <Form.Control type="button"readOnly defaultValue="" /> */}
            </Form>
            {/*
          <div className="mb-4">이름- 수정</div>
          <div className="mb-4">대화명- 수정</div>
          <div className="mb-4">소셜로그인이메일</div>
          개인미팅룸주소
          <div className="mb-4">회원탈퇴</div> */}
          </Col>
        </RoundCard>
      </>
  );
}

export default Info;
