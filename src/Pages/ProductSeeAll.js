import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import SideBar from "../Components/SideBar";
import {
  ComputerDevices,
  HouseholdAppliances,
  Furniture,
  OfficeSupplies,
} from "../Components/Slider/SubCategory";

import api from "../api";

function ProductSeeAll() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { group: urlGroup, item: urlCategory } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const subCategory = products.map((product) => product.name);

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const getLoggedIn = () => {
    const token = localStorage.getItem("token");
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
    getLoggedIn();
    getAllProducts();

    // Filter products based on the urlCategory
    let filteredProducts = [];
    if (urlCategory === "Computer Devices") {
      filteredProducts = ComputerDevices;
    } else if (urlCategory === "Household Appliances") {
      filteredProducts = HouseholdAppliances;
    } else if (urlCategory === "Furniture") {
      filteredProducts = Furniture;
    } else if (urlCategory === "OfficeSupplies") {
      filteredProducts = OfficeSupplies;
    }
    setProducts(filteredProducts);

    // Reset selected sub-category when urlCategory changes
    setSelectedSubCategory(null);
  }, [urlCategory]);

  return isLoggedIn ? (
    <div className="App">
      <div className="see-all-page-container">
        <div className="navbar-container">
          <h1>{urlGroup}</h1>
          <SideBar />
        </div>
        <div className="sub-title-product">
          <h3>{urlCategory}</h3>
        </div>
        <div className="see-all-list-container">
          <ul className="see-all-list">
            {subCategory.map((subCategory, index) => (
              <li
                key={index}
                className={`sub-category-item ${
                  subCategory === selectedSubCategory ? "active" : ""
                }`}
                onClick={() => handleSubCategoryClick(subCategory)}
              >
                <Link
                  to={`/${urlGroup}-category/${urlCategory}/${subCategory}`}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {subCategory}
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
