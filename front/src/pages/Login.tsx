import { Col, Row, Image } from "react-bootstrap";
import loginG from "../assets/btn_google_signin_light_normal_web@2x.png";
import loginN from "../assets/btnW_완성형.png";
import loginK from "../assets/kakao_login_medium_narrow.png";
import fillerImg from "../assets/bwink_edu_04_single_04.jpg";
import RoundCard from "../components/atoms/RoundCard";
import {apiInstance} from "../api";

const api = apiInstance();
function Login() {
  // const headerHeight = 78; // Change this value to match your actual header height
  // const colHeight = `calc(100vh - ${headerHeight}px)`;
  const handleLoginClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, type : string) => {
    console.log(e);
    api.post(`oauth2/authorization/${type}`).then(res=>{
      console.log('res : ' + res)
    }).catch(err => {
      console.log('err : ' + err)
    })
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
              <img src={loginN} alt="naver login " width={183} onClick={e=>handleLoginClick(e, "naver")}/>
            </div>
            <div className="mb-4">
              <img src={loginK} alt="kakao login" onClick={e=>handleLoginClick(e, "kakao")}/>
            </div>
            <div className="mb-4">
              <img src={loginG} alt="google login" width={184} onClick={e=>handleLoginClick(e, "google")}/>
            </div>
          </Col>
        </Row>
      </RoundCard>
    </>
  );
}

export default Login;
