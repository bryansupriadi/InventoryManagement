import React, { useState } from "react";
import LogoIM from "../Assets/logo.png";
import { useNavigate, Link } from "react-router-dom";

import api from "../api";

function SignIn() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(email, role);

    // Lakukan validasi form dan proses login
    await api
      .post("/v1/im/users/signIn", {
        role,
        emailAddress: email,
      })
      .then((res) => {
        if (!email || res.data.status === 1) {
          console.log(res.data);
          console.log(res.data.message);

          setErrorMessage("Please enter the valid email!");
        } else {
          console.log(res.data);
          console.log(res.data.msg);
          navigate("/otp");
        }
      })
      .catch((err) => console.log(err, err.message));
  };

  return (
    <div className="App">
      <div className="login-page-container">
        <div className="login-image-container">
          <img src={LogoIM} alt="" />
        </div>
        <div className="login-form-container">
          <h2>Sign in to your account</h2>
          <h6>Welcome back! Please Enter Your Details.</h6>
          <form onSubmit={handleSubmit}>
            <div className="role-form">
              <label htmlFor="role">Role</label>
              <select id="role" value={role} onChange={handleRoleChange}>
                <option selected>Choose your role</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>
            <div className="email-form">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <button type="submit">Sign in</button>
          </form>
          <h5>
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              style={{ textDecoration: "none", fontWeight: "bold" }}
            >
              Sign Up
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
