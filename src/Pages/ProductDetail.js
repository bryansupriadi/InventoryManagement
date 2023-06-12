import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import SideBar from "../Components/SideBar";

// import api from "../api";

const ProductDetail = ({ match }) => {
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [productData, setProductData] = useState([]);

  const { name } = useParams();
  const id = match.useParams.id;

  const product = {
    id: id,
    vendorName: "Tokopedia",
    purchaseDate: "01/03/2020",
    price: "$150",
    currentLocation: "Binakarsa",
    condition: "Bad",
  };

  // const getLoggedIn = () => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsLoggedIn(true);
  //   } else {
  //     navigate("/sign-in");
  //   }
  // };

  // const getProductDetail = () => {
  //   api
  //     .get(`/v1/im/products/${id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setProductData(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err, err.message);
  //     });
  // };

  // useEffect(() => {
  //   getLoggedIn();
  //   getProductDetail();
  // }, [navigate]);

  return (
    <div className="App">
      <div className="product-detail-page-container">
        <div className="navbar=container">
          <h1>{name}</h1>
          <SideBar />
        </div>
        <div className="product-type">
          <h3>Samsung S22F350H</h3>
        </div>
        <div>
          <h1>Product Detail</h1>
          <p>ID Numbeer: {product.id}</p>
          <p>Vendor: {product.vendorName}</p>
          <p>Purchase Date: {product.purchaseDate}</p>
          <p>Price: {product.price}</p>
          <p>
            Condition: {product.conditionGood} Good, {product.conditionBad} Bad
          </p>
          <p>Current Location: {product.currentLocation}</p>
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
