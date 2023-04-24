import React, { useState } from "react";
import LogoIM from "../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // const emailAlreadyRegistered = (email) => {
  //   const users = database.getUsers();
  //   const userWithEmail = users.find((user) => user.email === email);
  //   if (userWithEmail){
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!name) {
      newErrors.name = "Please enter your name!";
    }
    if (!email) {
      newErrors.email = "Please enter your email!";
    }
    //   else if (emailAlreadyRegistered(email)) {
    //   newErrors.email = 'This email has already been registered!';
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      await axios
        .post("http://localhost:5000/v1/im/users/signUp", {
          username: name,
          emailAddress: email,
        })
        .then((res) => {
          if (res.data.status === 0) {
            console.log(res.data);
            console.log(res.data.msg);

            navigate("/otp");
          } else if (res.data.status === 1 || res.data.status === 2) {
            console.log(res.data);
            console.log(res.data.message);
          }
        })
        .then((err) => {
          console.log(err, err.message);
        });
    }
    // Lakukan validasi form dan proses login
  };

  return (
    <div className="App">
      <div className="signup-page-container">
        <div className="signup-image-container">
          <img src={LogoIM} alt="" />
        </div>
        <div className="signup-form-container">
          <h2>Create an account</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Username</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            {errors.name && <div className="error-message">{errors.name}</div>}
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
            <button type="submit">Sign Up</button>
          </form>
          <h5>
            Already have an account?{" "}
            <Link
              to="/sign-in"
              style={{ textDecoration: "none", fontWeight: "bold" }}
            >
              Sign In
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
