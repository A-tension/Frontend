import { Card, Col, Row, Image } from "react-bootstrap";
import loginG from "../assets/btn_google_signin_light_normal_web@2x.png";
import loginN from "../assets/btnW_완성형.png";
import loginK from "../assets/kakao_login_medium_narrow.png";
import fillerImg from "../assets/bwink_edu_04_single_04.jpg";
// import RoundCard from "../components/atoms/RoundCard";

function Login() {
  const headerHeight = 78; // Change this value to match your actual header height
  const colHeight = `calc(100vh - ${headerHeight}px)`;
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: colHeight, background: "#ECF3FC" }}
      >
        <Card
          className="mx-auto  "
          style={{ height: "300px", width: "600px", borderRadius: 20 }}
        >
          <Row style={{ height: "300px" }}>
            <Col className="d-flex flex-column  align-items-center  justify-content-center">
              <div>
                {/* <img src={fillerImg} alt="filler" width={200} />{" "} */}
                <Image
                  src={fillerImg}
                  fluid
                  rounded
                  width={200}
                  alt="Image by vectorjuice on Freepik"
                ></Image>
              </div>
            </Col>
            {/* align-items-center 
            className="d-flex align-items-center justify-content-center"
            */}
            <Col className="position-relative py-2 px-4 d-flex flex-column align-items-center justify-content-center">
              <div className="mb-4">
                <img src={loginN} alt="naver login " width={183} />
              </div>
              <div className="mb-4">
                <img src={loginK} alt="kakao login" />
              </div>
              <div className="mb-4">
                <img src={loginG} alt="google login" width={184} />
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default Login;
