import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const UpdatePass = (props) => {
  const apiLink = "http://localhost:3000";
  const navigate = useNavigate();
  const { id } = useParams();
  const [notetitle, setnotetitle] = useState([]);
  const [notedesc, setnotedesc] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${apiLink}/password/getnote/` + id, {
        headers: {
          authToken: token,
        },
      })
      .then((res) => {
        setnotetitle(res.data.notetitle);
        setnotedesc(res.data.notedesc);
      })
      .catch((err) => console.log(err));
  }, []);

  const Submit = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${apiLink}/password/updatenote/` + id,
        { notetitle, notedesc },
        {
          headers: {
            "Content-Type": "application/json",
            authToken: token,
          },
        }
      )
      .then((res) => {})
      .catch((err) => console.log(err));
  };
  const note = async () => {
    toast.success(
      <p>
        Note update succesfully! <br /> please wait...
      </p>,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );
    setTimeout(() => {
      navigate("/home");
    }, 3500);
  };

  const goHome = () => {
    navigate("/home");
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="absolute  -z-10 min-h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#eee133_100%)]">
        <div className="container  lg:w-[60%] mx-auto p-5 ">
          <h1 className="font-semibold text-2xl text-center text-white mb-5">
            <span>Edit Note</span>
          </h1>

          <div className="flex-col ">
            <form onSubmit={Submit} method="POST">
              <div className="flex-col mb-4">
                <div className="my-2 mx-1">
                  <label
                    htmlFor="Url"
                    className="font-semibold text-white text-lg "
                  >
                    Title
                  </label>
                </div>
                <input
                  value={notetitle}
                  onChange={(e) => setnotetitle(e.target.value)}
                  type="text"
                  name="notetitle"
                  id="notetitle"
                  required
                  className="p-2 px-5 border border-white w-full rounded-2xl focus:border-none text-white"
                />
              </div>
              <div className="flex ">
                <div className="passusername text-white w-full">
                  <div className="flex-col">
                    <div className="my-2 mx-1 flex justify-between">
                      <label
                        htmlFor="Url"
                        className="font-semibold text-white text-md "
                      >
                        Details
                      </label>
                    </div>
                    <div>
                      <textarea
                        value={notedesc}
                        onChange={(e) => setnotedesc(e.target.value)}
                        rows={5}
                        name="notedesc"
                        id="notedesc"
                        required
                        className="px-5 border border-white w-full  rounded-2xl focus:border-none text-white p-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-5 mx-auto justify-center items-center flex">
                <button
                  onClick={note}
                  type="Submit"
                  name="Submit"
                  id="Submit"
                  className="text-white p-3 bg-green-700 text-center px-7 mx-auto flex gap-2 rounded-2xl hover:bg-green-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Update
                </button>
                <button
                  onClick={goHome}
                  type="Submit"
                  name="Submit"
                  id="Submit"
                  className="text-white p-3 bg-red-700 text-center mx-auto px-8 flex gap-2 rounded-2xl hover:bg-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePass;
