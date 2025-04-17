import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const CreatePass = () => {
  const apiLink = "https://qwiknotesapi.dashdeal.ca";
  const [notetitle, setnotetitle] = useState([]);
  const [notedesc, setnotedesc] = useState([]);
  const token = localStorage.getItem("authToken");

  const Submit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${apiLink}/password/createpass`,
        { notetitle, notedesc },
        {
          headers: {
            "Content-Type": "application/json",
            authToken: token,
          },
        }
      )
      .then((res) => {
        setnotetitle([]), setnotedesc([]);
      })
      .catch((err) => console.log(err));
  };
  const note = () => {
    toast.success("Note saved successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <ToastContainer
        position="botom-right"
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

      <div className="container   lg:w-[60%] mx-auto p-5 ">
        <h1 className="font-semibold text-2xl text-center text-white mb-5">
          <span> Add a new note</span>
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
                className="text-white w-full md:w-[30%]  p-3 bg-green-700  text-center mx-auto  gap-2 rounded-2xl hover:bg-green-500"
              >
                <div className="flex gap-2 justify-center items-center">
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
                  Add Note
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePass;
