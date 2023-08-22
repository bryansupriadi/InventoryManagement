import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import useScanDetection from "use-scan-detection";
import { BrowserMultiFormatReader } from "@zxing/library";

import SideBar from "../Components/SideBar";

function Scanner() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [scanResult, setScanResult] = useState("");

  const getLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    document.title = "Inventory Management - Scanner";
    getLoggedIn();

    const codeReader = new BrowserMultiFormatReader();

    codeReader
      .decodeFromInputVideoDevice(undefined, "video", {
        videoFacingMode: "environment",
      })
      .then((result) => {
        setScanResult(result.getText());
      })
      .catch((err) => {
        console.error(err);
      });

    if (scanResult) {
      navigate(scanResult);
    }
  }, [scanResult, navigate]);

  return isLoggedIn ? (
    <div className="App">
      <div className="scanner-page-container">
        <div className="navbar-container">
          <h1>Scan QR Code</h1>
          <SideBar />
        </div>
        <div className="product-qr-scan">
          <video
            id="video"
            style={{ width: "100%", transform: "scaleX(-1)" }}
          ></video>
          <div>{scanResult}</div>
          <h6>
            You can see the product details by scanning the product QR code
          </h6>
        </div>
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
}

export default Scanner;
