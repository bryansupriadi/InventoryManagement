import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import product from "../Components/data/product";
import SideBar from "../Components/SideBar";
import FloatingActionProduct from "../Components/FloatingAction/FloatingActionProduct";

import api from "../api";

const ProductDetail = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [productData, setProductData] = useState([]);

  const {
    subCategory: urlSubCategory,
    brandName: urlBrandName,
    id: urlId,
  } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { Type } = filteredProducts.length > 0 ? filteredProducts[0] : "";

  const getLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getProductDetail = (id) => {
    api
      .get(`/v1/im/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setProductData(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    // getLoggedIn();
    // getProductDetail();

    // Mencari produk berdasarkan subCategory dan brandName
    const filteredProducts = product.filter((item) => {
      const subData = item["Sub Data"] || [];
      return (
        item["Sub Category"] === urlSubCategory &&
        item["Brand Name"] === urlBrandName &&
        subData.some((subItem) => subItem["Product Id"] === urlId)
      );
    });

    const subData =
      filteredProducts.length > 0 ? filteredProducts[0]["Sub Data"] : [];
    const productIdData = subData.filter(
      (subItem) => subItem["Product Id"] === urlId
    );

    setFilteredProducts(productIdData);
  }, [urlSubCategory, urlBrandName, urlId, navigate]);

  return (
    <div className="App">
      <div className="product-detail-page-container">
        <div className="navbar-container">
          <h1>{urlSubCategory}</h1>
          <SideBar />
        </div>
        <div className="sub-title-product-1">
          <h3>{urlBrandName}</h3>
          <h3>{Type}</h3>
        </div>
        <div className="product-type">
          <ul>
            {filteredProducts.map((item) => (
              <li key={item["Product Id"]}>
                <p>ID Number : {item["Product Id"]}</p>
                <p>Vendor : {item["Vendor"]}</p>
                <p>Purchase Date : {item["Date"]}</p>
                <p>Price : {item["Price"]}</p>
                <p>Current Location : {item["Location"]}</p>
                <p>Condition : {item["Condition"]}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="fab-btn">
          <FloatingActionProduct />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
