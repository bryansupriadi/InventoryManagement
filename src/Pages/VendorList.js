import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import SideBar from "../Components/SideBar";

// import FloatingActionVendor from "../Components/FloatingAction/FloatingActionVendor";

// import data from "../Components/data/vendorData";

import api from "../api";

function VendorList() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [vendors, setVendors] = useState([]);
  const [vendorName, setVendorName] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [keyword, setKeyword] = useState("");

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

          getDataVendor();
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    } else {
      setErrors(newErrors);
    }
  };

  const filterVendor = (e) => {
    const keyword = e.target.value.toLowerCase();
    const filteredVendor =
      keyword !== ""
        ? vendors.filter(
            (vendor) => vendor.vendorName.toLowerCase().indexOf(keyword) > -1
          )
        : filteredVendor;

    setVendors(filteredVendor);
    setKeyword(keyword);
  };

  const getLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getDataVendor = async () => {
    await api
      .get("/v1/im/vendors/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setVendors(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    getLoggedIn();
    getDataVendor();
  }, [navigate]);

  const Popup = ({ message }) => {
    return (
      <div className="popup-success">
        <div className="popup-success-content">
          <div className="popup-success-message">{message}</div>
        </div>
      </div>
    );
  };

  return isLoggedIn ? (
    <div className="App">
      <div className="vendor-list-page-container">
        <div className="navbar-container">
          <h1>Vendor list</h1>
          <SideBar />
        </div>
        <div className="search-vendor-container">
          <input
            type="text"
            value={keyword}
            onChange={filterVendor}
            placeholder="Search"
            className="search-vendor"
          />
        </div>
        <div className="vendor-list-container">
          {vendors.length > 0 ? (
            <ul>
              {vendors.map((vendor) => (
                <li key={vendor._id}>
                  <Link
                    to={`/vendor-list/${vendor.vendorSlug}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {vendor.vendorName}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No vendor found</p>
          )}
        </div>
      </div>
      <div className="floating-action-button-container">
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
                    <div className="error-message-vendor">
                      {errors.vendorName}
                    </div>
                  )}
                  <button type="submit">Save</button>
                </form>
              </div>
            )}
          </div>
          {showPopupSuccess && <Popup message={successMessage} />}
        </div>
        ;
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
}

export default VendorList;
