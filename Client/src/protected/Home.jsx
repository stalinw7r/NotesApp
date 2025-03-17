import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import CreatePass from "./passwords/CreatePass";
import ViewPass from "./passwords/viewPass";

const Home = () => {
  const [user, setuser] = useState([]);
  const [greeting, setgreeting] = useState();
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    axios
      .get("http://localhost:3000/auth/getuser", {
        headers: {
          "Content-Type": "application/json",
          authToken: token,
        },
      })
      .then((res) => {
        setuser(res.data);
      })
      .catch((err) => console.log(err));
    const time = new Date().getHours();
    if (time < 10) {
      setgreeting("Good morning");
    } else if (time < 20) {
      setgreeting("Good day");
    } else {
      setgreeting("Good evening");
    }
  }, []);

  document.title = "Home";

  return (
    <>
      <div className="absolute  -z-10 min-h-full w-full items-center  py-10 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#3cee33_100%)]">
        <div className="username text-white p-3 m-2 container w-full lg:w-[60%] mx-auto">
          <span className="font-semibold text-2xl">{greeting}, </span>
          <span className="font-bold text-3xl text-green-300">{user.name}</span>
        </div>
        <div>
          <CreatePass />
        </div>
        <div>
          <ViewPass />
        </div>
      </div>
    </>
  );
};

export default Home;
