import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const Mainview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notetitle, setnotetitle] = useState([]);
  const [notedesc, setnotedesc] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get("http://localhost:3000/password/getnote/" + id, {
        headers: {
          authToken: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setnotetitle(res.data.notetitle);
        setnotedesc(res.data.notedesc);
      })
      .catch((err) => console.log(err));
  }, []);

  const goHome = () => {
    navigate("/home");
  };
  return (
    <>
      <div className="absolute  -z-10 min-h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#3cee33_10%,#000_100%)]">
        <div className="container text-white lg:w-[60%] mx-auto my-5 p-5 bg-black/50 rounded-2xl">
          <h1 className="font-semibold text-3xl my-3">{notetitle}</h1>
          <hr />
          <div className="my-3 text-2xl p-5">
            <p>{notedesc}</p>
          </div>
        </div>
        <div className="my-5 mx-auto justify-center items-center flex">
          <button
            onClick={goHome}
            type="Submit"
            name="Submit"
            id="Submit"
            className="text-white p-3 bg-green-700 text-center mx-auto flex gap-2 rounded-2xl hover:bg-black"
          >
            Back to Home
          </button>
        </div>
        ;
      </div>
    </>
  );
};

export default Mainview;
