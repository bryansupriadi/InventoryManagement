import React, { useState, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import SideBar from "../Components/SideBar";

function Scanner() {
  const [scanResult, setScanResult] = useState("");

  useEffect(() => {
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
  }, []);

  //   function stopScanning() {
  //     const video = document.querySelector('video');
  //     if (video && video.srcObject) {
  //       const stream = video.srcObject;
  //       const tracks = stream.getTracks();
  //       tracks.forEach((track) => {
  //         track.stop();
  //       });
  //       video.srcObject = null;
  //     }
  //   }

  return (
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
          <h6>You can see the products detaile by scanning product qr code</h6>
        </div>
      </div>
    </div>
  );
}

export default Scanner;
