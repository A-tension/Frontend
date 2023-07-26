import "./App.css";
import { Routes, Route } from "react-router-dom";
import Conference from "./pages/Conference";
import Dash from "./pages/Dash";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Nav from "./pages/Nav";
import { BrowserRouter } from "react-router-dom";
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
import List from "./components/item/list";
import Draw from "./components/item/Draw";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Landing/>,
//   },
// ]);//  createBrowserRouter,
// RouterProvider,
function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Nav></Nav>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dash" element={<Dash />}>
              <Route path="group" element={<Group />}>
                <Route path="chat" element={<GChat />}></Route>
                <Route path="plans" element={<Plans />}></Route>
                <Route path="members" element={<Members />}></Route>
              </Route>
              <Route path="calendar" element={<Calendar />}>
                <Route path="add" element={<Planner />}></Route>
                <Route path="plan" element={<Plan />}></Route>
              </Route>
              <Route path="meeting" element={<Meeting />}>
                <Route path="join" element={<Join />}></Route>
                <Route path="start" element={<Start />}></Route>
                <Route path="manage" element={<Manage />}></Route>
              </Route>
              <Route path="item" element={<Item />}>
                <Route path="list" element={<List />}></Route>
                <Route path="draw" element={<Draw />}></Route>
              </Route>
            </Route>
            <Route path="/conference" element={<Conference />}></Route>
            <Route path="/info" element={<Info />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
