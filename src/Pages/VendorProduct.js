import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

import SideBar from "../Components/SideBar";

import api from "../api";

function VendorProduct() {
  const navigate = useNavigate();
  const { vendorSlug } = useParams();

  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const [data, setData] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [filteredItems, setFilteredItems] = useState([]);

  const [vendorItems, setVendorItems] = useState([]);

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);

    const filteredItems = data.filter(
      (item) =>
        item.subCategoryName === subCategory && item.vendorSlug === vendorSlug
    );
    setVendorItems(filteredItems);
  };

  const getLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getData = async () => {
    await api
      .get(`/v1/im/products?vendor.vendorSlug=${vendorSlug}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    document.title = "Inventory Management - Vendor Product";

    getLoggedIn();
    getData();

    setFilteredItems(data.filter((item) => item.vendorSlug === vendorSlug));

    setVendorItems(data.filter((item) => item.vendorSlug === vendorSlug));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, vendorSlug]);

  const itemStyle = {
    margin: "20px", // Atur jarak antara komponen
    backgroundColor: "#88e2ff", // Atur warna latar belakang
    color: "#002938", // Atur warna teks
    padding: "10px", // Atur ruang internal dalam komponen
  };

  const selectedItemStyle = {
    ...itemStyle,
    backgroundColor: "#00788D",
    color: "#fff",
  };

  return isLoggedIn ? (
    <div className="App">
      <div className="vendor-product-page-container">
        <div className="navbar-container">
          <h1>{vendorSlug}</h1>
          <SideBar />
        </div>

        <Carousel responsive={responsive} showDots={false} arrows={false}>
          {data
            .sort((a, b) => a.localeCompare(b))
            .map((item, index) => (
              <div
                key={item._id}
                style={
                  selectedSubCategory === item.subCategory.subCategoryName
                    ? selectedItemStyle
                    : itemStyle
                }
                className="slider-sub-category"
                onClick={() => handleSubCategoryClick(item)}
              >
                {item.subCategory.subCategoryName}
              </div>
            ))}
        </Carousel>

        <div className="vendor-content-container">
          {data.length > 0 ? (
            <>
              {data.map((info) => (
                <ul className="list-brands-container">
                  <li key={`${info.brandName}-${info.eachPrice}`}>
                    <Link
                      to={`/vendor-list/${vendorSlug}/${info.subCategory.subCategorySlug}/${info.productSlug}`}
                      style={{ textDecoration: "none", color: "white" }}
                      className="list-brands"
                    >
                      <div className="brand-info">
                        <h3>{info.brandName}</h3>
                        <h6>Quantity: {info.quantity}</h6>
                      </div>
                      <div className="price-info">
                        <h6>{info.eachPrice}</h6>
                      </div>
                    </Link>
                  </li>
                </ul>
              ))}
            </>
          ) : (
            <p>No data found</p>
          )}
        </div>
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
}

export default VendorProduct;
