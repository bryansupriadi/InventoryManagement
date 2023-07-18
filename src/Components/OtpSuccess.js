import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import verifsuccess from "../Assets/verified.png";

function OtpSuccess() {
  const fontWeight = "bold";

  useEffect(() => {
    document.title = "Inventory Management - OTP Successful";
  }, []);

  return (
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
          <button>
            <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
              Go to Home Page
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OtpSuccess;
