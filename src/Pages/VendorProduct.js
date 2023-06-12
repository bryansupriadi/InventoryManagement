import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SideBar from "../Components/SideBar";

import api from "../api";

function VendorProduct() {
  const { name } = useParams();
  // vendorSlug.toLowerCase();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const [data, setData] = useState([]);

  const getLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  // const getData = async () => {
  //   await api
  //     .get(`/v1/im/vendors/${vendorSlug}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setData(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err, err.message);
  //     });
  // };

  useEffect(() => {
    getLoggedIn();
    // getData();
  }, [navigate]);

  return isLoggedIn ? (
    <div className="App">
      <div className="vendor-product-page-container">
        <div className="navbar-container">
          <h1>{name}</h1>
          <SideBar />
        </div>
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
}

export default VendorProduct;
