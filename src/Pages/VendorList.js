import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import SideBar from "../Components/SideBar";
import FloatingActionVendor from "../Components/FloatingAction/FloatingActionVendor";

// import data from "../Components/data/vendorData";

import api from "../api";

function VendorList() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const [vendor, setVendor] = useState(data);

  const [vendors, setVendors] = useState([]);
  const [keyword, setKeyword] = useState("");

  const filterVendor = (event) => {
    const keyword = event.target.value.toLowerCase();
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
          <ul>
            {vendors.map((vendor, index) => (
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
        </div>
      </div>
      <div className="floating-action-button-container">
        <FloatingActionVendor />
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
}

export default VendorList;
