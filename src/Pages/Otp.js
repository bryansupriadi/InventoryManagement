import React, { useState, useRef, useEffect } from "react";
import logoverif from "../Assets/verifyotp.png";
import { Link, useNavigate } from "react-router-dom";

import api from "../api";

function Otp() {
  const navigate = useNavigate();

  const [otp, setOTP] = useState(["", "", "", ""]);
  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const [timer, setTimer] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const correctOTP = ["1", "2", "3", "4"];
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showPopupInvalid, setShowPopupInvalid] = useState(false);
  const [resendAttemps, setResendAttemps] = useState(0);
  const [showPopupResend, setShowPopupResend] = useState(false);
  // const [showBorder, setShowBorder] = useState(false);

  const handleChange = (event, index) => {
    const { value } = event.target;
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    if (index < refs.length - 1 && value) {
      refs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0) {
      const newOTP = [...otp];
      newOTP[index - 1] = "";
      setOTP(newOTP);
      refs[index - 1].current.focus();
    } else if (event.key === "ArrowLeft" && index > 0) {
      refs[index - 1].current.focus();
    } else if (event.key === "ArrowRight" && index < otp.length - 1) {
      refs[index + 1].current.focus();
    }
  };

  // useEffect(()=>{

  //   let timeoutId;

  //       if(timer > 0){
  //           timeoutId = setTimeout(() => {
  //             setTimer(timer - 1);
  //           }, 1000)
  //       }
  //       else{
  //         setShowPopup(false);
  //       }
  //       return () => clearTimeout(timeoutId);
  // }, [timer, disabled]);

  const handleResend = async (event) => {
    event.preventDefault();

    console.log("Sending request....");

    await api
      .get("/v1/im/users/resendOTP")
      .then((res) => {
        console.log(res.data);
        console.log(res.data.msg);

        setOTP(["", "", "", ""]);
        setDisabled(true);
        setResendAttemps(resendAttemps + 1); // nonaktifkan button saat sedang mengirim ulang kode OTP
        setShowPopupResend(true);
        setTimeout(() => {
          setShowPopupResend(false);
        }, 4000);

        if (resendAttemps >= 3) {
          navigate("/otp-failed");
        }
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  // useEffect(() => {
  //   let intervalId;

  //   if (showPopup && popupTimer > 0) {
  //     intervalId = setInterval(() => {
  //       setPopupTimer(popupTimer - 1);
  //     }, 1000);
  //   } else if (showPopup && popupTimer === 0) {
  //     setShowPopup(false);
  //   }

  //   return () => clearInterval(intervalId);
  // }, [showPopup, popupTimer]);

  // const showPopupWithTimer = () => {
  //   setPopupTimer(5); // set timer ke 5 detik
  //   setShowPopup(true);
  //   const intervalId = setInterval(() => {
  //     setPopupTimer(prevTimer => prevTimer - 1);
  //   }, 1000);
  //   setTimeout(() => {
  //     setShowPopup(false);
  //     clearInterval(intervalId);
  //   }, 5000);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Sending request....");
    console.log(otp);

    if (!otp.join("") || !correctOTP.join("")) {
      setIsInvalid(true);
      setShowPopupInvalid(true);
      setTimeout(() => setShowPopupInvalid(false), 4000);
      // showPopupWithTimer();
      setShowPopupInvalid(true);
      setOTP(["", "", "", ""]);
      setFailedAttempts(failedAttempts + 1);
      if (failedAttempts >= 3) {
        navigate("/otp-failed");
      }
    } else {
      await api
        .post("/v1/im/users/verified", { otp })
        .then((res) => {
          console.log(res.data);
          console.log(res.data.msg);

          localStorage.setItem("token", res.data.token);

          setIsInvalid(false);
          navigate("/otp-successful");
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    }
  };

  // const handleFocus = (event) => {
  //   event.target.style.border = "2px solid red";
  //   setTimeout(() => {event.target.border = ""
  // }, 1000);
  // };

  useEffect(() => {
    document.title = "Inventory Management - OTP";
    if (resendAttemps === 1) {
      setFailedAttempts(0);
    }
  }, [resendAttemps]);

  const fontWeight = "bold";

  return (
    <div className="App">
      <div className="otp-page-container">
        <div className="otp-logo">
          <img src={logoverif} alt="" />
        </div>
        <div className="otp-text-header">
          <h1 style={{ fontWeight }}>Verification Code</h1>
          <h6>We have sent the code to your email</h6>
        </div>
        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              type="text"
              maxLength="1"
              key={index}
              value={digit}
              ref={refs[index]}
              onChange={(event) => handleChange(event, index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onSubmit={handleSubmit}
              // onFocus={handleFocus}
              // style={isInvalid || showBorder ? {borderColor: 'red'} : {}}
            />
          ))}
        </div>
        <div className="resend-otp">
          <h3>
            Didn't receive the code?
            <a href="/otp" disabled={disabled} onClick={handleResend}>
              Resend Code
            </a>
          </h3>
        </div>
        {showPopupResend && (
          <div className="popup">
            <div className="popup-box-resend">
              <h4>Code Resend!</h4>
              <h6>Please check your email for the new OTP Code</h6>
            </div>
          </div>
        )}
        <div className="otp-submit">
          <button type="submit" onClick={handleSubmit}>
            Verify Email
          </button>
        </div>
        {showPopupInvalid && (
          <div className="popup">
            <div className="popup-box">
              <h4>Invalid Code!</h4>
              <h6>Please click resend OTP to get OTP Code again</h6>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Otp;
