import "./App.css";
import { Routes, Route } from "react-router-dom";
import Conference from "./pages/Conference";
import Dash from "./pages/Dash";
import Login from "./pages/Group";
import Landing from "./pages/Landing";
import Nav from "./pages/Nav";

function App() {
  return (
    <>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Dash" element={<Dash />} />
        <Route path="/Conference" element={<Conference />}></Route>
        <Route path="/Login" element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
