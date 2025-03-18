import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "./Button";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [status, setstatus] = useState(props.log);

  const [logged, setlogged] = useState();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setlogged(false);
    } else {
      setlogged(true);
    }
  });

  const handleLogin = (e) => {
    if (props.log) {
      localStorage.removeItem("authToken");
      setstatus(false);
      navigate("/");
    }
  };

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <nav className="bg-black dark:bg-gray-900  w-full z-20 top-0 start-0 text-white dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex-col" onClick={goHome}>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-10 text-green-400"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="self-center text-4xl font-bold whitespace-nowrap dark:text-white">
                Qwik
                <span className="text-4xl font-bold text-green-500">Notes</span>
              </span>
            </div>
            <div className="text-sm">Secure & simple vault for your notes</div>
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {logged && (
              <button
                onClick={handleLogin}
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <Button />
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
