import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api";

function FloatingActionVendor() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [vendorName, setVendorName] = useState("");

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleVendorInputChange = (e) => {
    setVendorName(e.target.value);
  };

  const resetForm = () => {
    setVendorName("");
    setErrors({});
  };

  const handleAddVendor = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (vendorName.trim() === "") {
      newErrors.vendorName = "Vendor name is required";
    }

    if (Object.keys(newErrors).length === 0) {
      // TODO: process the categoryInput value

      await api
        .post(
          "/v1/im/vendors/",
          { vendorName: vendorName },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log(res.data);

          setErrors({});
          setSuccessMessage(res.data.msg);
          setShowPopupSuccess(true);
          resetForm();
          setTimeout(() => {
            setShowPopupSuccess(false);
          }, 3500);
          togglePopup();

          navigate("/vendor-list");
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    } else {
      setErrors(newErrors);
    }
  };

  const Popup = ({ message }) => {
    return (
      <div className="popup-success">
        <div className="popup-success-content">
          <div className="popup-success-message">{message}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="floating-action-vendor-container">
      <button className="floating-action-button" onClick={togglePopup}>
        <span>+</span>
      </button>
      <div className="show-popup">
        {showPopup && (
          <div className="popup-container">
            <form onSubmit={handleAddVendor}>
              <h1>Add Vendor</h1>
              <input
                type="text"
                name="vendorName"
                placeholder="vendor name.."
                value={vendorName}
                onChange={handleVendorInputChange}
              />
              {errors.vendorName && (
                <div className="error-message-vendor">{errors.vendorName}</div>
              )}
              <button type="submit">Save</button>
            </form>
          </div>
        )}
      </div>
      {showPopupSuccess && <Popup message={successMessage} />}
    </div>
  );
}

export default FloatingActionVendor;
