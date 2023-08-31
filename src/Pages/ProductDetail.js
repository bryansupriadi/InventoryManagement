import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

  const [productData, setProductData] = useState([]);

  const [dataDetail, setDataDetail] = useState({
    type: "",
    brandName: "",
    subCategoryName: "",
  });

  const [filteredProducts, setFilteredProducts] = useState([]);

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
        setProductData(res.data.data);

        const data = res.data.data;

        setDataDetail({
          type: data.typeProduct.type,
          brandName: data.brandName,
          subCategoryName: data.subCategory.subCategoryName,
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

    // Mencari produk berdasarkan subCategory dan brandName
    const filteredProducts = productData.filter((item) => {
      const subData = item || [];
      return (
        item.groupSlug === groupSlug &&
        item.vendorSlug === vendorSlug &&
        item.categorySlug === categorySlug &&
        item.subCategorySlug === subCategorySlug &&
        item.productSlug === productSlug &&
        subData.some((subItem) => subItem._id === id)
      );
    });

    const subData = filteredProducts.length > 0 ? filteredProducts : [];

    const productIdData = subData.filter((subItem) => subItem._id === id);

    setFilteredProducts(productIdData);

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
            {filteredProducts.map((item) => (
              <li key={item._id}>
                <p>ID Number : {item.combinedId}</p>
                <p>Vendor : {item.vendorName}</p>
                <p>Purchase Date : {item.purchaseDate}</p>
                <p>Price : {item.eachPrice}</p>
                <p>Current Location : {item.location}</p>
                <p>Condition : {item.productCondition}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="fab-btn">
          <FloatingActionProduct
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
