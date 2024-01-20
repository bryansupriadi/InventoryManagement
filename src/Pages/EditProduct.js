import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SideBar from "../Components/SideBar";

// import product from "../Components/data/product";

import api from "../api";

function EditProduct() {
  const { id, groupSlug, categorySlug, subCategorySlug, productSlug } =
    useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [dataDetail, setDataDetail] = useState({
    type: "",
    brandName: "",
    subCategoryName: "",
  });

  const [values, setValues] = useState({
    productTypeId: "",
    combinedId: "",
    vendorName: "",
    purchaseDate: "",
    eachPrice: 0,
    currentLocation: "",
    productCondition: "",
  });

  const [errors, setErrors] = useState("");

  const handleChangeProduct = (e) => {
    const { name, value } = e.target;

    setValues({ ...values, [name]: value });
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!values.purchaseDate) {
      newErrors.purchaseDate = "Please enter the purchase date!";
    }

    if (!values.eachPrice) {
      newErrors.eachPrice = "Please enter the price!";
    }

    if (!values.currentLocation) {
      newErrors.currentLocation = "Please enter the current location!";
    }

    if (!values.productCondition) {
      newErrors.condition = "Please enter the condition!";
    } else if (
      values.productCondition !== "Good" &&
      values.productCondition !== "Bad"
    ) {
      newErrors.condition = 'Condition must be either "Good" or "Bad"!';
    }

    if (Object.keys(newErrors).length === 0) {
      await api
        .patch(
          `/v1/im/productTypes/${values.productTypeId}`,
          {
            purchaseDateProductType: values.purchaseDate,
            eachPriceProductType: values.eachPrice,
            currentLocationProductType: values.currentLocation,
            productTypeCondition: values.productCondition,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log(res.data);
          setErrors({});

          setShowPopupSuccess(true);
          setSuccessMessage(res.data.msg);

          navigate(
            `/${groupSlug}-category/${categorySlug}/${subCategorySlug}/${productSlug}/${id}`
          );
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

        const data = res.data.data;

        setValues({
          productTypeId: data.typeProduct._id,
          combinedId: data.combinedId,
          vendorName: data.typeProduct.vendor.vendorName,
          purchaseDate: data.typeProduct.purchaseDateProductType,
          eachPrice: data.typeProduct.eachPriceProductType,
          currentLocation: data.typeProduct.currentLocationProductType,
          productCondition: data.typeProduct.productTypeCondition,
        });

        setDataDetail({
          type: data.typeProduct.type,
          brandName: data.brandName,
          subCategoryName: data.subCategory.subCategoryName,
        });
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    document.title = "Inventory Management - Edit Product";

    getLoggedIn();
    getProductById();
  }, [groupSlug, categorySlug, subCategorySlug, productSlug, id, navigate]);

  return isLoggedIn ? (
    <div className="App">
      <div className="edit-product-page-container">
        <div className="navbar-container">
          <h1>{subCategorySlug}</h1>
          <SideBar />
        </div>
        <div className="sub-title-product-1">
          <h3>{dataDetail.brandName}</h3>
          <h3>{dataDetail.type}</h3>
        </div>
        <div className="product-type">
          <ul>
            <li>
              <p>ID Number: {values.combinedId}</p>
              <p>Vendor: {values.vendorName}</p>
              <div className="form-container">
                <form onSubmit={handleEditProduct}>
                  <div>
                    <label htmlFor="purchaseDate" className="form-field-1">
                      Purchase Date
                    </label>
                    <input
                      type="date"
                      id="purchaseDate"
                      name="purchaseDate"
                      value={values.purchaseDate}
                      onChange={handleChangeProduct}
                      className="input-form"
                    />
                  </div>
                  {errors.purchaseDate && (
                    <div className="error-message-2">{errors.purchaseDate}</div>
                  )}
                  <div>
                    <label htmlFor="price" className="form-field-1">
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="eachPrice"
                      value={values.eachPrice}
                      onChange={handleChangeProduct}
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
                      name="currentLocation"
                      value={values.currentLocation}
                      onChange={handleChangeProduct}
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
                      name="productCondition"
                      value={values.productCondition}
                      onChange={handleChangeProduct}
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
          </ul>
        </div>
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
}

export default EditProduct;
