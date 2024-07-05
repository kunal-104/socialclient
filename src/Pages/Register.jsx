import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import all_product from "../Components/Assets/all_product";
import { ShopContext } from "../Context/ShopContext";

const Register = () => {
  const { getDefaultCart } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  //   const getDefaultCart = ()=>{
  //    let cart = {};
  //    for(let index=0; index< all_product.length+1; index++){
  //        cart[index] = 0;
  //    }
  //    return cart;
  //  }
  const [cart, setCart] = useState(getDefaultCart());

  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      navigate("/");
    }
  });

  const handleSignup = async () => {
    console.log(name, password, email);
    let result = await fetch("https://socialserver-r3k1.onrender.com/signup", {
      method: "post",
      body: JSON.stringify({ name, email, password, cart }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result.auth) {
      localStorage.setItem("users", JSON.stringify(result.result));
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
          <h1>Sign Up</h1>
          <p>Create your account</p>

          <div className="loginsignup-fields">
            <input
              type="name"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div> */}
          <button onClick={handleSignup}>Continue</button>
          <p className="loginsignup-login">Already have an account? </p>
          <span className="loginsignup-login">
            {" "}
            <Link className="link" to="/login">
              <button>Login Here</button>
            </Link>{" "}
          </span>
        </center>
      </div>
    </div>
  );
};

export default Register;
