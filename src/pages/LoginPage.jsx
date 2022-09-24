import React, { useState, useEffect } from "react";
import "../styles/LoginStyles/loginpage.styles.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../services/reducers/actions/authActions/loginAction";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";

import { setLoggedIn } from "../services/reducers/actions/authActions/loginAction";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const loggedIn = useSelector((state) => state.userLogin.loggedIn);

  const handleLogIn = async (e) => {
    e.preventDefault();
    const data = {
      email: email.toLowerCase(),
      password: password,
    };
    await dispatch(loginUser(data));
    setEmail("");
    setPassword("");

    // localStorage.setItem("userFname", userDetails.first_name);
    // localStorage.setItem("userLname", userDetails.last_name);
    // localStorage.setItem("userEmail", userDetails.email);

    // setTimeout(() => {
    //   if (loggedIn) {
    //     navigate("/home");
    //   }
    // }, "1000");

    let userDetails = jwt_decode(localStorage.getItem("accessToken"));
    localStorage.setItem("userId", userDetails.id);
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/home");
    }
  }, [loggedIn]);

  const loginDetails = useSelector((state) => state.userLogin.details);

  return (
    <div>
      {loginDetails && <h1 className="login-details">{loginDetails}</h1>}

      <form
        className="login-page-container"
        onSubmit={handleLogIn}
        autoComplete="email"
      >
        <label className="login-label">Email</label>
        <input
          type="email"
          className="login-input"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label className="login-label">Password</label>
        <input
          type="password"
          className="login-input"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="login-button" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
