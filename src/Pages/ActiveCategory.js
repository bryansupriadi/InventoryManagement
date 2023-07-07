import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import FloatingActionCategory from "../Components/FloatingAction/FloatingActionCategory";
import SideBar from "../Components/SideBar";

// import ProductTemp from "../Components/Slider/ProductTemp";
// import SliderActive from "../Components/Slider/SliderActive";

import api from "../api";

function ActiveCategory() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 2.5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2.5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2.5,
    },
    mobile: {
      breakpoint: { max: 400, min: 0 },
      items: 2.5,
    },
  };

  const groupSlug = "active";

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);

  const getLoggedIn = () => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getAllCategoryByGroup = async () => {
    await api
      .get("/v1/im/categories/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setCategoryData(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  const getAllSubCategoryByGroup = async () => {
    await api
      .get(
        `/v1/im/subCategories?category.categorySlug=${categoryData.categorySlug}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setSubCategoryData(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    getLoggedIn();
    getAllCategoryByGroup();
    getAllSubCategoryByGroup();
  }, [navigate]);

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

  return isLoggedIn ? (
    <div className="App">
      <div className="active-page-container">
        <div className="navbar-container">
          <h1>Active</h1>
          <SideBar />
        </div>
        <div className="content-container">
          {categoryData.map((item) => (
            <div className="product-category-container">
              <h4>{item.categoryName}</h4>
              <h6>
                <Link
                  to={`/active-category/${item.categorySlug}`}
                  style={{
                    textDecoration: "none",
                    color: "#D9C5C5",
                    fontWeight: "lighter",
                  }}
                >
                  See All
                </Link>
              </h6>
              {subCategoryData.length > 0 ? (
                <div className="carousel-items">
                  <Carousel
                    responsive={responsive}
                    showDots={false}
                    arrows={false}
                  >
                    {subCategoryData.map((subCategory) => (
                      <Link
                        to={`/${groupSlug}-category/${subCategory.category.categorySlug}/${subCategory.subCategorySlug}`}
                        key={subCategory._id}
                      >
                        <ProductTemp
                          subCategoryName={subCategory.subCategoryName}
                          subCategoryImage={subCategory.subCategoryImage}
                        />
                      </Link>
                    ))}
                  </Carousel>
                </div>
              ) : (
                <p>No data found</p>
              )}
            </div>
          ))}
        </div>
        <div className="fab-btn">
          <FloatingActionCategory type="active" />
        </div>
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
}

export default ActiveCategory;
