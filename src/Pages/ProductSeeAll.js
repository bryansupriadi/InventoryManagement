import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import SideBar from "../Components/SideBar";

import api from "../api";

function ProductSeeAll() {
  const navigate = useNavigate();
  const { groupSlug, categorySlug } = useParams();

  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [products, setProducts] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);

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
      .get(`/v1/im/products?category.categorySlug=${categorySlug}`, {
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

    // Reset selected sub-category when urlCategory changes
    setSelectedSubCategory(null);
  }, [groupSlug, categorySlug, navigate]);

  return isLoggedIn ? (
    <div className="App">
      <div className="see-all-page-container">
        <div className="navbar-container">
          <h1>{groupSlug}</h1>
          <SideBar />
        </div>
        <div className="sub-title-product">
          <h3>{categorySlug}</h3>
        </div>
        <div className="see-all-list-container">
          <ul className="see-all-list">
            {products.map((subCategory, index) => (
              <li
                key={subCategory._id}
                className={`sub-category-item ${
                  subCategory === selectedSubCategory ? "active" : ""
                }`}
                onClick={() => handleSubCategoryClick(subCategory)}
              >
                <Link
                  to={`/${groupSlug}-category/${categorySlug}/${subCategory.subCategorySlug}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {subCategory.subCategoryName}
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
