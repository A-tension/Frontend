import { Routes, Route, Navigate } from "react-router-dom";
import Conference from "./pages/Conference";
import Dash from "./pages/Dash";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Group from "./components/Group";
import Calendar from "./components/Calendar";
import Meeting from "./components/Meeting";
import Item from "./components/Item";
import Info from "./pages/Info";
import Join from "./components/meeting/Join";
import Start from "./components/meeting/Start";
import Planner from "./components/plan/Planner";
import PlanView from "./components/plan/PlanView";
import Manage from "./components/meeting/Manage";
import Header from "./pages/Header";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler.tsx";
// import Month from "./components/plan/Month";
import "./App.css";
import JoinMeeting from "./components/JoinMeeting";
import Waiting from "./pages/Waiting";
import List from "./components/item/List.tsx";
import Draw from "./components/item/Draw.tsx";
import OpenVidu from "./openvidu/App.jsx";

import Create from "./components/meeting/Create.tsx";
// import CalendarView from "./components/plan/CalendarView.tsx";
import { useAppSelector } from "./store/hooks.ts";
import { getPlanlist, loadListTest } from "./store/plan.ts";
import { title } from "process";
import { createEventId } from "./components/plan/event-utils.tsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { EventInput } from "@fullcalendar/core/index.js";



function App() {
  //임시 props 테스트

  return (
    <>
      <div className="font-SUIT">
        <Header></Header>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/dash" element={<Dash />}>
            <Route path="" element={<Navigate to="group" />}></Route>
            <Route path="group" element={<Group />}></Route>
            <Route path="calendar" element={<Calendar />}>
              //일정 추가는 그룹일정에서 추가하러 옴,,
              {/* <Route index element={<Month />}></Route> */}
              <Route path="add" element={<Planner />}></Route>
              <Route path="plan" element={<PlanView />}></Route>
              {/* <Route path="month" element={<Month />}></Route> */}
            </Route>

            <Route path="meeting" element={<Meeting />}>
              <Route path="" element={<Navigate to="join" />}></Route>
              <Route path="join" element={<Join />}></Route>
              <Route path="start" element={<Start />}></Route>
              <Route path="create" element={<Create />}></Route>
              <Route path="manage" element={<Manage />}></Route>{" "}
              <Route path="wait" element={<OpenVidu />} />
              <Route path="joinmeeting" element={<JoinMeeting />}></Route>
              {/* <Route path="openvidu" element={<OpenVidu />}></Route> */}
              {/*<Route path="conference" element={<VideoRoomComponent />}></Route>*/}
              <Route
                path="conference1"
                element={<Conference sessionId="" myUserName="" />}
              ></Route>
            </Route>
            <Route path="item" element={<Item />}>
              <Route path="" element={<Navigate to="list" />}></Route>
              <Route path="list" element={<List />}></Route>
              <Route path="draw" element={<Draw />}></Route>
            </Route>
            <Route path="item" element={<Item />}></Route>
            <Route
              path="conference"
              element={<Conference sessionId="" myUserName="" />}
            ></Route>
          </Route>
          <Route path="join" element={<JoinMeeting />}></Route>//굳이?
          <Route
            path="conference"
            element={<Conference sessionId="" myUserName="" />}
          ></Route>
          <Route path="/info" element={<Info />}></Route>
          <Route path="/login" element={<Login />}></Route>
          {/* <Route path="/wait" element={<OpenVidu />}></Route> */}
          <Route
            path="/oauth2/redirect"
            element={<OAuth2RedirectHandler />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
