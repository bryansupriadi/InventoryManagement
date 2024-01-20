import React, { useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import QRCode from "qrcode.react";

import api from "../../api";

function FloatingActionProduct({
  productTypeId,
  groupSlug,
  categorySlug,
  subCategorySlug,
  productSlug,
}) {
  console.log(productTypeId);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [showOptions, setShowOptions] = useState(false);
  const [showPopupQR, setShowPopupQR] = useState(false);
  const [showPopupDelete, setShowPopupDelete] = useState(false);

  const location = useLocation();
  const { pathname } = location;

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const togglePopupQR = () => {
    setShowPopupQR(!showPopupQR);
  };

  const togglePopupDelete = () => {
    console.log("Delete product with ID:", productTypeId);
    setShowPopupDelete(!showPopupDelete);
  };

  const handleDelete = async () => {
    togglePopupDelete();

    setShowPopupDelete(!showPopupDelete);

    // api
    await api
      .delete(`/v1/im/productTypes/${productTypeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        navigate(
          `/${groupSlug}-category/${categorySlug}/${subCategorySlug}/${productSlug}/`
        );
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  const isVendorListPath = pathname.match(/^\/vendor-list\//);

  // Render FloatingActionProduct only if the pathname is not "/vendor-list/:name/:subCategory/:brandName/:id"
  if (isVendorListPath) {
    return null;
  }

  return (
    <div className="floating-action-product-container">
      <button className="floating-action-button" onClick={toggleOptions}>
        <span>+</span>
      </button>
      {showOptions && (
        <div className="floating-action-button-options">
          <div className="fab-option-container">
            <span onClick={togglePopupDelete}>Delete Product</span>
            <button className="fab-option" onClick={togglePopupDelete}>
              3
            </button>
          </div>
          <div className="fab-option-container">
            <span>
              <Link
                to={`${pathname}/edit-product`}
                style={{ textDecoration: "none", color: "#002938" }}
              >
                Edit Product Type
              </Link>
            </span>
            <button className="fab-option">
              <Link
                to={`${pathname}/edit-product`}
                style={{ textDecoration: "none", color: "#002938" }}
              >
                2
              </Link>
            </button>
          </div>
          <div className="fab-option-container">
            <span onClick={togglePopupQR}>Generate ID</span>
            <button className="fab-option" onClick={togglePopupQR}>
              1
            </button>
          </div>

          {showPopupQR && (
            <div className="popup-generate-container">
              <h1>QR Code</h1>
              <div className="qr-code-container">
                <QRCode value={pathname} size={210} />
              </div>
              <button onClick={togglePopupQR}>Close</button>
            </div>
          )}

          {showPopupDelete && (
            <div className="popup-delete-container">
              <h3>Are you sure you want to delete this product?</h3>
              <div className="button-container">
                <button className="cancel-button" onClick={togglePopupDelete}>
                  Cancel
                </button>
                <button className="delete-button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FloatingActionProduct;
