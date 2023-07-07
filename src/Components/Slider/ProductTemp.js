import React from "react";

function ProductTemp({ subCategoryName, subCategoryImage }) {
  return (
    <div className="card">
      <img
        className="product--image"
        src={subCategoryImage}
        alt={subCategoryName}
      />
      <h2>{subCategoryName}</h2>
    </div>
  );
}

export default ProductTemp;
