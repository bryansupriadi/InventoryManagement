import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Moment from "moment";

import SideBar from "../Components/SideBar";
import FloatingActionProduct from "../Components/FloatingAction/FloatingActionProduct";

import api from "../api";

const ProductDetail = () => {
  const navigate = useNavigate();

  const {
    vendorSlug,
    groupSlug,
    categorySlug,
    subCategorySlug,
    productSlug,
    id,
  } = useParams();

  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [dataDetail, setDataDetail] = useState({
    productTypeId: "",
    type: "",
    brandName: "",
    subCategoryName: "",
    combinedId: "",
    vendorName: "",
    purchaseDate: "",
    eachPrice: "",
    currentLocation: "",
    productCondition: "",
  });

  const getLoggedIn = () => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getProductDetail = () => {
    api
      .get(`/v1/im/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        const data = res.data.data;

        setDataDetail({
          productTypeId: data.typeProduct._id,
          type: data.typeProduct.type,
          brandName: data.brandName,
          subCategoryName: data.subCategory.subCategoryName,
          combinedId: data.combinedId,
          vendorName: data.vendor.vendorName,
          purchaseDate: data.typeProduct.purchaseDateProductType,
          eachPrice: data.typeProduct.eachPriceProductType,
          currentLocation: data.typeProduct.currentLocationProductType,
          productCondition: data.typeProduct.productTypeCondition,
        });
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    document.title = "Inventory Management - Product Detail";

    getLoggedIn();
    getProductDetail();

    if (showPopupSuccess) {
      setSuccessMessage(successMessage);
      setShowPopupSuccess(true);
    }

    if (showPopupSuccess) {
      const timer = setTimeout(() => {
        setShowPopupSuccess(false);
      }, 3500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [
    vendorSlug,
    groupSlug,
    categorySlug,
    subCategorySlug,
    productSlug,
    id,
    navigate,
    showPopupSuccess,
  ]);

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
      <div className="product-detail-page-container">
        <div className="navbar-container">
          <h1>{dataDetail.subCategoryName}</h1>
          <SideBar />
        </div>
        <div className="sub-title-product-1">
          <h3>{dataDetail.brandName}</h3>
          <h3>{dataDetail.type}</h3>
        </div>
        <div className="product-type">
          <ul>
            <li>
              <p>ID Number: {dataDetail.combinedId}</p>
              <p>Vendor: {dataDetail.vendorName}</p>
              <p>
                Purchase Date:{" "}
                {Moment(dataDetail.purchaseDate).local().format("DD/MM/YYYY")}
              </p>
              <p>Price: {dataDetail.eachPrice}</p>
              <p>
                Current Location: {""}
                {dataDetail.currentLocation}
              </p>
              <p>Condition: {dataDetail.productCondition}</p>
            </li>
          </ul>
        </div>
        <div className="fab-btn">
          <FloatingActionProduct
            productTypeId={dataDetail.productTypeId}
            groupSlug={groupSlug}
            categorySlug={categorySlug}
            subCategorySlug={subCategorySlug}
            productSlug={productSlug}
          />
        </div>
      </div>
      {showPopupSuccess && <Popup message={successMessage} />}
    </div>
  ) : (
    navigate("/sign-in")
  );
};

export default ProductDetail;
