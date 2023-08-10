// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import Carousel from "react-bootstrap/Carousel";
import banner from "../assets/banner_noborder.png";
import { Accordion } from "react-bootstrap";
import "../App.css";
// import { useState } from "react";

function Landing() {
  // const [count, setCount] = useState(0)
  // const [index, setIndex] = useState(0);
  // activeIndex={index} onSelect={handleSelect}
  // const handleSelect = (selectedIndex) => {
  //   setIndex(selectedIndex);
  // };
  return (
    <>
      <div>
        {/* <h1>Landing carousel</h1> */}
        {/* <div className="fixed top-40 bg-sky-400">carousel place holder</div> */}
        {/* <h2>Landing card group</h2> */}
        {/* <Header></Header> */}
        <Carousel id="intro">
          <Carousel.Item>
            <img src={banner} />
            <Carousel.Caption className="text-dark-emphasis">
              <h3></h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div id="features">
          <Accordion defaultActiveKey="0" flush className="font-SUIT text-blue" style={{width:"50%"}}>
            <Accordion.Item style={{ width: "200x" }} eventKey="0">
              <Accordion.Header>집중도</Accordion.Header>
              <Accordion.Body>
                참여자들이 회의에 집중하고 있는지 모르겠나요? <br /> AI가
                체크해주는 참여자들의 집중도와 텐션을 확인하며 회의를
                이끌어보세요!
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>개선된 UI</Accordion.Header>
              <Accordion.Body>
              화면 공유시 신경쓰기 어려웠던 채팅과 질문을 개선된 툴바로 동시에 확인할 수 있습니다.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>그룹</Accordion.Header>
              <Accordion.Body>
                그룹 단위로 미팅 관련 업무를 한 번에 해결하세요.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>게임</Accordion.Header>
              <Accordion.Body>
                다양한 오락 컨텐츠로 더 높은 참여도를 이끌어보세요!
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default Landing;
