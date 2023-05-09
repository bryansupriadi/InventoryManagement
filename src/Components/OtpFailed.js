import React from "react";
import veriffailed from "../Assets/warning.png";
import { Link } from "react-router-dom";

function OtpFailed() {
  const fontWeight = "bold";

  return (
    <div className="App">
      <div className="otpf-page-container">
        <div className="otpf-logo">
          <img src={veriffailed} alt="" />
        </div>
        <div className="otpf-text-header">
          <h1 style={{ fontWeight }}>Verification Failed</h1>
          <h6>
            Too many failed OTP input attempt. Please wait 1x24 hour to
            re-verify.
          </h6>
        </div>
        <div className="otpf-submit">
          <button>
            <Link
              to="/sign-in"
              style={{ textDecoration: "none", color: "white" }}
            >
              Back to Sign In Page
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OtpFailed;
