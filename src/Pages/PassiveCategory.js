import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import FloatingActionCategory from "../Components/FloatingAction/FloatingActionCategory";
import SideBar from "../Components/SideBar";

import api from "../api";

function PassiveCategory() {
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [subCategoryData, setSubCategoryData] = useState([]);

  const getLoggedIn = () => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getAllSubCategoryByGroup = async () => {
    await api
      .get("/v1/im/subCategories", {
        headers: { Authorization: `Bearer ${token}` },
        params: { groupSlug: "passive" },
      })
      .then((res) => {
        console.log(res.data);

        setSubCategoryData(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    document.title = "Inventory Management - Passive Category";

    getLoggedIn();

    getAllSubCategoryByGroup();
  }, [navigate]);

  function ProductTemp({ id, subCategoryName, subCategoryImage }) {
    return (
      <div className="card" key={id}>
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
      <div className="passive-page-container">
        <div className="navbar-container">
          <h1>Passive</h1>
          <SideBar />
        </div>
        <div className="content-container">
          {subCategoryData.map((item) => (
            <div className="product-category-container">
              <h4>{item.categoryName}</h4>
              <h6>
                <Link
                  to={`/${item.groupSlug}-category/${item.categorySlug}`}
                  style={{
                    textDecoration: "none",
                    color: "#D9C5C5",
                    fontWeight: "lighter",
                  }}
                >
                  See All
                </Link>
              </h6>
              <div className="carousel-items">
                <Carousel
                  responsive={responsive}
                  showDots={false}
                  arrows={false}
                >
                  {subCategoryData.map((item) => (
                    <Link
                      to={`/${item.groupSlug}-category/${item.category.categorySlug}/${item.subCategorySlug}`}
                    >
                      <ProductTemp
                        id={item._id}
                        subCategoryName={item.subCategoryName}
                        subCategoryImage={item.subCategoryImage}
                      />
                    </Link>
                  ))}
                </Carousel>
              </div>
            </div>
          ))}
        </div>
        <div className="fab-btn">
          <FloatingActionCategory type="passive" />
        </div>
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
}

export default PassiveCategory;
