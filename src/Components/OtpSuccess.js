import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import verifsuccess from "../Assets/verified.png";

import api from "../api";

function OtpSuccess() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userData, setUserData] = useState([]);

  const fontWeight = "bold";

  const getLoggedIn = () => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getUserData = async () => {
    if (token) {
      await api
        .get("/v1/im/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);

          const { data } = res.data;

          setUserData({
            username: data.username,
            role: data.role,
          });
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    }
  };

  useEffect(() => {
    document.title = "Inventory Management - OTP Successful";

    getLoggedIn();
    getUserData();
  }, [navigate]);

  return isLoggedIn ? (
    <div className="App">
      <div className="otps-page-container">
        <div className="otps-logo">
          <img src={verifsuccess} alt="" />
        </div>
        <div className="otps-text-header">
          <h1 style={{ fontWeight }}>Verification Success</h1>
          <h6>Your account has been verified</h6>
        </div>
        <div className="otps-submit">
          {userData.role === "Super Admin" ? (
            <button>
              <Link
                to="/manage-account"
                style={{ textDecoration: "none", color: "white" }}
              >
                Go to Home Page
              </Link>
            </button>
          ) : (
            <button>
              <Link
                to="/home"
                style={{ textDecoration: "none", color: "white" }}
              >
                Go to Home Page
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
}

export default OtpSuccess;
