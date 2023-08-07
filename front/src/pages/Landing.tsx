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
        <div  id="features">
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item  style={{ width: '200x' }}eventKey="0">
              <Accordion.Header className="font-pretendard ">기능 소개 map 으로 </Accordion.Header>
              <Accordion.Body className="font-sans text-grey5">hello my name is harvey</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>기능 소개 map 으로 </Accordion.Header>
              <Accordion.Body>CSS 너비 조절, 해당 이미지 같이 전환 되게 </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>

     
    </>
  );
}

export default Landing;
