import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Home from "./Protected/Home";
import Navbar from "./components/Navbar";
import UpdatePass from "./protected/passwords/UpdatePass";
import Mainview from "./protected/passwords/Mainview";

function App() {
  const [logged, setlogged] = useState("true");
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setlogged("false");
    } else {
      setlogged("true");
    }
  }, [logged]);

  return (
    <>
      <BrowserRouter>
        <Navbar log={logged} />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/admin-panel" element={<Admin />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/update/:id" element={<UpdatePass />}></Route>
          <Route path="/mainview/:id" element={<Mainview />}></Route>
          <Route path="*" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
