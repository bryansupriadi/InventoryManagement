import React from "react";
import { useParams } from "react-router-dom";

function CategoryProduct() {
  const name = useParams();

  return (
    <div className="App">
      <div className="category-product-page-container">
        <div className="navbar-container">
          <h1>{name}</h1>
        </div>
      </div>
    </div>
  );
}

export default CategoryProduct;
