import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";

const Admin = () => {
  const apiLink = "https://qwiknotesapi.dashdeal.ca";
  const [email, setemail] = useState([]);
  const [name, setname] = useState([]);
  const [username, setusername] = useState([]);
  const [password, setpassword] = useState([]);
  const navigate = useNavigate();
  const Submit = (e) => {
    e.preventDefault();
    axios
      .post(`${apiLink}/auth/signup`, {
        email,
        name,
        username,
        password,
      })
      .then((res) => {
        if (res.data.Success) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="absolute  -z-10 min-h-full w-full items-center px-5 py-auto [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#3cee33_100%)]">
      <div className="container mx-auto mt-50">
        <h1 className="font-bold text-2xl text-center my-10">
          Signup for a new account
        </h1>
        <form onSubmit={Submit} method="POST" className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              onChange={(e) => setemail(e.target.value)}
              name="email"
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <input
              onChange={(e) => setname(e.target.value)}
              name="name"
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              onChange={(e) => setusername(e.target.value)}
              name="username"
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              onChange={(e) => setpassword(e.target.value)}
              name="password"
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              required
              autoComplete="false"
            />
          </div>
          <div className=" justify-between items-center flex">
            <div>
              <button
                type="submit"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Signup
              </button>
            </div>
            <div>
              <p>Have an account?</p>
              <Link
                to="/"
                className="font-bold text-center underline cursor-pointer hover:text-gray-700"
              >
                Login here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
