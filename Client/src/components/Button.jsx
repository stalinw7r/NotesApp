import React from "react";
import { useEffect, useState } from "react";
const Button = () => {
  const [logged, setlogged] = useState();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setlogged(false);
    } else {
      setlogged(true);
    }
  });

  return <div>{logged ? "logout" : "login"}</div>;
};

export default Button;
