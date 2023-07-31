import { Card, Col, Row, Image } from "react-bootstrap";
import loginG from "../assets/btn_google_signin_light_normal_web@2x.png";
import loginN from "../assets/btnW_완성형.png";
import loginK from "../assets/kakao_login_medium_narrow.png";
import fillerImg from "../assets/bwink_edu_04_single_04.jpg";

function Login() {
  return (
    <><div className="" style={{background:'#ECF3FC'}}>


      <Card
        border="secondary"
        className="mx-auto top-50 mb-3"
        style={{ width: "800px", borderRadius: 20 }}
      >
        <Row>
          <Col>
            <div className="p-10">
              {/* <img src={fillerImg} alt="filler" width={200} />{" "} */}
              <Image src={fillerImg} fluid rounded width={200} alt="Image by vectorjuice on Freepik">

              </Image>
            </div>
          </Col>
          <Col className="position-relative py-2 px-4">
            <div>
              <img src={loginN} alt="naver login" width={183} />
            </div>
            <div>
              <img src={loginK} alt="kakao login" />
            </div>
            <div>
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
