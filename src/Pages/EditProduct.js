import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SideBar from "../Components/SideBar";

// import product from "../Components/data/product";

import api from "../api";

function EditProduct() {
  const {
    id,
    brandName,
    subCategorySlug,
    // group: urlGroup,
    // item: urlItem,
    // subCategory: urlSubCategory,
    // brandName: urlBrandName,
  } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [purchaseDate, setPurchaseDate] = useState("");
  const [eachPrice, setEachPrice] = useState(0);
  const [currentLocation, setCurrentLocation] = useState("");
  const [conditionGood, setConditionGood] = useState(0);
  const [conditionBad, setConditionBad] = useState(0);
  const [condition, setCondition] = useState("");

  const [errors, setErrors] = useState("");

  const { Type } = filteredProducts.length > 0 ? filteredProducts[0] : "";

  const handleEditProduct = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!purchaseDate) {
      newErrors.purchaseDate = "Please enter the purchase date!";
    }

    if (!eachPrice) {
      newErrors.eachPrice = "Please enter the price!";
    }

    if (!currentLocation) {
      newErrors.currentLocation = "Please enter the current location!";
    }

    if (!condition) {
      newErrors.condition = "Please enter the condition!";
    } else if (condition !== "Good" && condition !== "Bad") {
      newErrors.condition = 'Condition must be either "Good" or "Bad"!';
    }

    if (Object.keys(newErrors).length === 0) {
      await api
        .post(
          `/v1/products/${id}`,
          {
            purchaseDate,
            eachPrice,
            currentLocation,
            conditionGood,
            conditionBad,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log(res.data);
          setErrors({});

          setShowPopupSuccess(true);
          setSuccessMessage(res.data.msg);

          // navigate(`/active-category/${urlItem}/${urlSubCategory}/${urlBrandName}/${urlId}`);
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    } else {
      setErrors(newErrors);
    }
  };

  const getLoggedIn = () => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getProductById = async () => {
    await api
      .get(`/v1/im/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    getLoggedIn();
    getProductById();

    // Mencari produk berdasarkan subCategory dan brandName
    const filteredProducts = product.filter((item) => {
      const subData = item || [];
      return (
        item.subCategoryName === subCategorySlug &&
        item.brandName === brandName &&
        subData.some((subItem) => subItem._id === id)
      );
    });

    const subData = filteredProducts.length > 0 ? filteredProducts[0] : [];
    const productIdData = subData.filter((subItem) => subItem._id === id);

    setFilteredProducts(productIdData);
  }, [subCategorySlug, brandName, id, navigate]);

  return isLoggedIn ? (
    <div className="App">
      <div className="edit-product-page-container">
        <div className="navbar-container">
          <h1>{subCategorySlug}</h1>
          <SideBar />
        </div>
        <div className="sub-title-product-1">
          <h3>{brandName}</h3>
          <h3>{product.typeProductName}</h3>
        </div>
        <div className="product-type">
          <ul>
            {filteredProducts.map((item) => (
              <li key={item._id}>
                <p>ID Number: {item.productId}</p>
                <p>Vendor: {item.vendorName}</p>
                <div className="form-container">
                  <form onSubmit={handleEditProduct}>
                    <div>
                      <label htmlFor="purchaseDate" className="form-field-1">
                        Purchase Date
                      </label>
                      <input
                        type="date"
                        id="purchaseDate"
                        value={item.purchaseDate}
                        onChange={(e) => setPurchaseDate(e.target.value)}
                        className="input-form"
                      />
                    </div>
                    {errors.purchaseDate && (
                      <div className="error-message-2">
                        {errors.purchaseDate}
                      </div>
                    )}
                    <div>
                      <label htmlFor="price" className="form-field-1">
                        Price
                      </label>
                      <input
                        type="number"
                        id="price"
                        value={eachPrice}
                        onChange={(e) => setEachPrice(e.target.value)}
                        className="input-form"
                      />
                    </div>
                    {errors.price && (
                      <div className="error-message-2">{errors.eachPrice}</div>
                    )}
                    <div>
                      <label htmlFor="currentLocation" className="form-field-1">
                        Current Location
                      </label>
                      <input
                        type="text"
                        id="currentLocation"
                        value={currentLocation}
                        onChange={(e) => setCurrentLocation(e.target.value)}
                        className="input-form"
                      />
                    </div>
                    {errors.currentLocation && (
                      <div className="error-message-2">
                        {errors.currentLocation}
                      </div>
                    )}
                    <div>
                      <label htmlFor="condition" className="form-field-1">
                        Condition
                      </label>
                      <input
                        type="text"
                        id="condition"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        className="input-form"
                      />
                    </div>
                    {errors.condition && (
                      <div className="error-message-2">{errors.condition}</div>
                    )}
                    <button type="submit" className="btn-form-1">
                      Save Changes
                    </button>
                  </form>
                </div>
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

export default EditProduct;
