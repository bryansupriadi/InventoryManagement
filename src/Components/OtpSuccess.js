import React from "react";
import verifsuccess from "../Assets/verified.png";
import { Link, useLocation } from "react-router-dom";

function OtpSuccess() {
  const fontWeight = "bold";
  const location = useLocation();

  // Mengekstrak email dari parameter URL
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  // Fungsi untuk mengarahkan ke halaman yang sesuai berdasarkan alamat email
  const redirectToPage = () => {
    if (email === "bryansupriadi@gmail.com") {
      return "/manage-account";
    } else {
      return "/home";
    }
  };

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
            <Link
              to={redirectToPage()}
              style={{ textDecoration: "none", color: "white" }}
            >
              Go to {email === "bryansupriadi@gmail.com" ? "Manage Account" : "Home"} Page
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default OtpSuccess;
