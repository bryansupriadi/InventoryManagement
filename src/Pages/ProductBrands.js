import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import SideBar from "../Components/SideBar";
// import product from "../Components/data/product";

import api from "../api";

function ProductBrands() {
  const { categorySlug, subCategorySlug, productSlug } = useParams();

  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [product, setProduct] = useState([]);

  // Filter produk yang sesuai dengan sub kategori yang dipilih
  const filteredProducts = product.filter(
    (item) => item.subCategory.subCategoryName === subCategorySlug
  );

  // Ambil merek produk, jumlah, dan harga yang ada pada produk yang sudah difilter
  const productsInfo = filteredProducts.map((item) => ({
    brandName: item.brandName,
    quantity: item.quantity,
    eachPrice: item.eachPrice,
  }));

  // Tampilkan merek produk, jumlah, dan harga dalam list
  const content = (
    <ul className="list-brands-container">
      {productsInfo.map((info) => (
        <li
          key={`${info.brandName}-${info.price}`}
          className={info.quantity ? "has-quantity" : "no-quantity"}
        >
          <Link
            to={{
              pathname: `/${productsInfo.group}-category/${categorySlug}/${subCategorySlug}/${productSlug}`,
            }}
            style={{ textDecoration: "none", color: "white" }}
            className="list-brands"
          >
            <div className="brand-info">
              <h3>{info.brandName}</h3>
              {info.quantity && <h6>Quantity: {info.quantity}</h6>}
            </div>
            <div className="price-info">
              <h6>{info.eachPrice}</h6>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="App">
      <div className="product-brand-page-container">
        <div className="navbar-container">
          <h1>{product.categoryName}</h1>
          <SideBar />
        </div>
        <div className="sub-title-product">
          <h3>{product.brandName}</h3>
        </div>
        <div className="content-list">{content}</div>
      </div>
    </div>
  );
}

export default ProductBrands;
