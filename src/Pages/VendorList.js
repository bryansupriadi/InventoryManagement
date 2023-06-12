import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import SideBar from "../Components/SideBar";
import FloatingActionVendor from "../Components/FloatingAction/FloatingActionVendor";

import data from "../Components/data/vendorData";

import api from "../api";

function VendorList() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [vendor, setVendor] = useState(data);

  // const [vendor, setVendor] = useState([]);
  const [keyword, setKeyword] = useState("");

  const filterVendor = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filteredVendor =
      keyword !== ""
        ? vendor.filter((user) => user.name.toLowerCase().indexOf(keyword) > -1)
        : filteredVendor;

    setVendor(filteredVendor);
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

  // const getDataVendor = async () => {
  //   await api
  //     .get("/v1/im/vendors/", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setVendor(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err, err.message);
  //     });
  // };

  useEffect(() => {
    getLoggedIn();
    // getDataVendor();
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
            {vendor.map((user, index) => (
              <li key={index}>
                <Link
                  to={`/vendor-list/${user.name}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {user.name}
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
