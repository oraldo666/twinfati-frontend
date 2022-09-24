import React, { useState } from "react";
import "../styles/RegisterUserStyles/registerpage.styles.css";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { registerUserAction } from "../services/reducers/actions/authActions/registerUserActions";

function RegisterUser() {
  const [userRegisterData, setUserRegisterData] = useState({
    first_name: "",
    lname: "",
    email: "",
    password: "",
    password2: "",
  });

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const handleRegisterInputs = (e) => {
    console.log(e.target.value);
    setUserRegisterData({
      ...userRegisterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserRegistration = (e) => {
    e.preventDefault();
    console.log(userRegisterData);

    dispatch(registerUserAction(userRegisterData));

    setUserRegisterData({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password2: "",
    });
    navigate("/");
  };

  return (
    <div>
      <div className="register-form-container">
        <form className="user-register-form">
          <label className="user-register-label">First Name</label>
          <input
            className="user-register-input"
            type="text"
            placeholder="First Name"
            name="first_name"
            onChange={(e) => handleRegisterInputs(e)}
            value={userRegisterData.first_name}
          />

          <label className="user-register-label">Last Name</label>
          <input
            className="user-register-input"
            type="text"
            placeholder="Last Name"
            name="last_name"
            onChange={(e) => handleRegisterInputs(e)}
            value={userRegisterData.last_name}
          />

          <label className="user-register-label">Email</label>
          <input
            className="user-register-input"
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleRegisterInputs(e)}
            value={userRegisterData.email}
          />

          <label className="user-register-label">Password </label>
          <input
            className="user-register-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => handleRegisterInputs(e)}
            value={userRegisterData.password}
          />

          <label className="user-register-label">Enter Password Again</label>
          <input
            className="user-register-input"
            type="password"
            name="password2"
            placeholder="Confirm your password"
            onChange={(e) => handleRegisterInputs(e)}
            value={userRegisterData.password2}
          />

          <button
            className="button-55"
            type="submit"
            onClick={handleUserRegistration}
          >
            Click to Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;
