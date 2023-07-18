import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import SideBar from "../Components/SideBar";

import api from "../api";

function ProductSeeAll() {
  const navigate = useNavigate();
  const { groupSlug, categorySlug, subCategorySlug } = useParams();

  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [products, setProducts] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);

  const subCategory = products.map(
    (product) => product.subCategory.subCategorySlug
  );

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const getLoggedIn = () => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getAllProducts = async () => {
    await api
      .get("/v1/im/products/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    document.title = "Inventory Management - Product See All";

    getLoggedIn();
    getAllProducts();

    // Filter products based on the urlCategory
    let filteredProducts = [];
    if (categorySlug === products.category.categorySlug) {
      filteredProducts = products.category.categorySlug;
    }

    setProducts(filteredProducts);

    // Reset selected sub-category when urlCategory changes
    setSelectedSubCategory(null);
  }, [groupSlug, categorySlug, subCategorySlug, navigate]);

  return isLoggedIn ? (
    <div className="App">
      <div className="see-all-page-container">
        <div className="navbar-container">
          <h1>{products.group}</h1>
          <SideBar />
        </div>
        <div className="sub-title-product">
          <h3>{products.category.categoryName}</h3>
        </div>
        <div className="see-all-list-container">
          <ul className="see-all-list">
            {subCategory.map((subCategory, index) => (
              <li
                key={subCategory._id}
                className={`sub-category-item ${
                  subCategory === selectedSubCategory ? "active" : ""
                }`}
                onClick={() => handleSubCategoryClick(subCategory)}
              >
                <Link
                  to={`/${groupSlug}-category/${categorySlug}/${subCategorySlug}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {subCategory.subCategory.subCategorySlug}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
}

export default ProductSeeAll;
