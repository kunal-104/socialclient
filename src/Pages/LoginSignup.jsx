import React, { useEffect, useState } from "react";
import "./CSS/LoginSignup.css";
import { Link, useNavigate } from "react-router-dom";
const LoginSignup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      navigate("/");
    }
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    console.log({ email, password });
    let result = await fetch("https://socialserver-r3k1.onrender.com/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result.auth) {
      localStorage.setItem("users", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("please enter correct details");
    }
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <center>
          <h1>Log In</h1>
          <div className="loginsignup-fields">
            {/* <input type="text" placeholder='Your Name' /> */}
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button onClick={handleLogin}>Login</button>
          <p className="loginsignup-login">
            <div>
            Don't have an account?{" "}
            </div>
            <span>
              {" "}
              <Link className="link" to="/signup">
                <button>Signup Here</button>
              </Link>{" "}
            </span>
          </p>
          <div className="loginsignup-agree"></div>
        </center>
      </div>
    </div>
  );
};

export default LoginSignup;
