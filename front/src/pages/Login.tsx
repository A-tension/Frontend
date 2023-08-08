import { Col, Row, Image } from "react-bootstrap";
import loginG from "../assets/btn_google_signin_light_normal_web@2x.png";
import loginN from "../assets/btnW_완성형.png";
import loginK from "../assets/kakao_login_medium_narrow.png";
import fillerImg from "../assets/bwink_edu_04_single_04.jpg";
import RoundCard from "../components/atoms/RoundCard";
import { useAppDispatch } from "../store/hooks";
import { User, getUserGroups, userLogin } from "../store/user";
import { loginload } from "../store/group";
import { store } from "../store/store";

function Login() {
  // const headerHeight = 78; // Change this value to match your actual header height
  // const colHeight = `calc(100vh - ${headerHeight}px)`;
  const trytologin: User = {
    name: "네이버",
    email: "ssafy@naver.com",
    userId: "김싸피",
  };
  const dispatch = useAppDispatch();
  
  const handleTest = () => {
    //api 요청으로
    dispatch(userLogin(trytologin));//axios에서 처리
    const usergroups = getUserGroups(store.getState());
    dispatch(loginload(usergroups))
    
  };
  return (
    <>
      <RoundCard height="300px" width="600px">
        <Row style={{ height: "300px" }}>
          <Col className="d-flex flex-column  align-items-center  justify-content-center">
            <div>
              <Image
                src={fillerImg}
                fluid
                rounded
                width={200}
                alt="Image by vectorjuice on Freepik"
              ></Image>
            </div>
          </Col>

          <Col className="position-relative py-2 px-4 d-flex flex-column align-items-center justify-content-center">
            <div className="mb-4">
              {/* <Button  > */}
              <img
                onClick={handleTest}
                src={loginN}
                alt="naver login "
                width={183}
              />
              {/* </Button> */}
            </div>
            <div className="mb-4">
              <img src={loginK} alt="kakao login" />
            </div>
            <div className="mb-4">
              <img src={loginG} alt="google login" width={184} />
            </div>
          </Col>
        </Row>
      </RoundCard>
    </>
  );
}

export default Login;
