import { Routes, Route, Navigate } from "react-router-dom";
import Conference from "./pages/Conference";
import Dash from "./pages/Dash";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import OpenVidu from "./openvidu/App";
import Waiting from "./pages/Waiting"; // 회의 참여 대기
import Group from "./components/Group";
import Calendar from "./components/Calendar";
import Meeting from "./components/Meeting";
import Item from "./components/Item";
import Info from "./pages/Info";
import Join from "./components/meeting/Join";
import Start from "./components/meeting/Start";
import GChat from "./components/group/GChat";
import Plans from "./components/group/Plans";
import Members from "./components/group/Members";
import Planner from "./components/plan/Planner";
import Plan from "./components/plan/Plan";
import Manage from "./components/meeting/Manage";
import Draw from "./components/item/Draw";
import List from "./components/item/List";
import Header from "./pages/Header";
// import Month from "./components/plan/Month";
import VideoRoomComponent from "./openvidu/components/VideoRoomComponent";
import "./App.css";
import JoinMeeting from "./components/JoinMeeting";
import Gcreate from "./components/group/Gcreate";
import Month from "./components/plan/Month";
import Welcome from "./components/group/Welcome";
function App() {
  return (
    <>
      <div>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/dash" element={<Dash />}>
            <Route path="" element={<Navigate to="group" />}></Route>
            <Route path="group" element={<Group />}>
            <Route path="none" element={<Welcome />}></Route>
              {/* <Route path="" element={<GChat />}></Route> */}
              <Route path="create" element={<Gcreate />}></Route>
              <Route path="chat" element={<GChat />}></Route>
              <Route path="plans" element={<Plans />}></Route>
              <Route path="members" element={<Members />}></Route>
            </Route>
            <Route path="calendar" element={<Calendar />}>
              <Route index element={<Month />}></Route>
              <Route path="add" element={<Planner />}></Route>
              <Route path="plan" element={<Plan />}></Route>
              {/* <Route path="month" element={<Month />}></Route> */}
            </Route>
            <Route path="meeting" element={<Meeting />}>
              <Route path="" element={<Navigate to="join" />}></Route>
              <Route path="join" element={<Join />}></Route>
              <Route path="start" element={<Start />}></Route>
              <Route path="manage" element={<Manage />}></Route>{" "}
              <Route path="wait" element={<Waiting />}></Route>
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
          </Route>
          <Route path="join" element={<JoinMeeting />}></Route>
          {/* <Route path="/wait" element={<OpenVidu />} /> */}
          <Route
            path="conference"
            element={<Conference sessionId="" myUserName="" />}
          ></Route>
          <Route path="/info" element={<Info />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
