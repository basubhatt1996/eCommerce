import { useState,useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const collectForLogin = async () => {
    let result = await fetch("http://localhost:4000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result
      .json()
      .then((app) => {
        if (app.auth) {
          localStorage.setItem("user", JSON.stringify(app.user));
          localStorage.setItem("token",JSON.stringify(app.auth))
          navigate("/");
        }
      })
      .catch((e) => {
        alert("No user found");
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        className="inputBox"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter your Email"
      />
      <input
        type="password"
        className="inputBox"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Enter your Password"
      />
      <button className="inputBoxButton" onClick={collectForLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
