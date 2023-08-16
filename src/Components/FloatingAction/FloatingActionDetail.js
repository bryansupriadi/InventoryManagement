import React, { useState } from "react";
import { Link } from "react-router-dom";

function FloatingActionDetail({ group, category, subCategory, product }) {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="floating-action-detail-container">
      <button className="floating-action-button" onClick={toggleOptions}>
        <span>+</span>
      </button>
      {showOptions && (
        <div className="floating-action-button-options">
          <div className="fab-option-container">
            <span>
              <Link
                to={`/${group}-category/${category}/${subCategory}/${product}/add-product-type`}
                style={{ textDecoration: "none", color: "#002938" }}
              >
                Add Product Type
              </Link>
            </span>
            <button className="fab-option">
              <Link
                to={`/${group}-category/${category}/${subCategory}/${product}/add-product-type`}
                style={{ textDecoration: "none", color: "#002938" }}
              >
                1
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FloatingActionDetail;
