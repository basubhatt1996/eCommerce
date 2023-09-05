import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const collectData = async () => {
   
    let result = await fetch("http://localhost:4000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    //console.warn(result);
    //localStorage.setItem("user", JSON.stringify(result));
    if (result) {
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input
        type="text"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Enter your Name"
      />

      <input
        type="email"
        className="inputBox"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter Email"
      />

      <input
        type="password"
        className="inputBox"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter Password"
      />

      <button className="inputBoxButton" onClick={collectData}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
