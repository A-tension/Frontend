import { Routes, Route, Navigate } from "react-router-dom";
import Conference from "./pages/Conference";
import Dash from "./pages/Dash";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import OpenVidu from "./openvidu/App";
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
import VideoRoomComponent from "./openvidu/components/VideoRoomComponent";
import "./App.css";
import JoinMeeting from "./components/JoinMeeting";
import Month from "./components/plan/Month";
import Waiting from "./pages/Waiting";
import ManageGroup from "./components/group/ManageGroup";

function App() {
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
              <Route index element={<Month />}></Route>
              <Route path="add" element={<Planner />}></Route>
              <Route path="plan" element={<PlanView />}></Route>
              {/* <Route path="month" element={<Month />}></Route> */}
            </Route>
            <Route path="meeting" element={<Meeting />}>
              <Route path="" element={<Navigate to="join" />}></Route>
              <Route path="join" element={<Join />}></Route>
              <Route path="start" element={<Start />}></Route>
              <Route path="manage" element={<Manage />}></Route>{" "}
              <Route path="wait" element={<OpenVidu />}></Route>
              <Route path="joinmeeting" element={<JoinMeeting />}></Route>

              {/* <Route path="openvidu" element={<OpenVidu />}></Route> */}
              <Route path="conference" element={<VideoRoomComponent />}></Route>

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
          {/* <Route path="/wait" element={<OpenVidu />} /> */}
          <Route
            path="conference"
            element={<Conference sessionId="" myUserName="" />}
          ></Route>
          <Route path="/info" element={<Info />}></Route>
          <Route path="/login" element={<Login />}></Route>
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
