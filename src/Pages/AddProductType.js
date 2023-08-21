import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

import SideBar from "../Components/SideBar";

import api from "../api";

function AddProductType() {
  const navigate = useNavigate();

  const { groupSlug, categorySlug, subCategorySlug, productSlug } = useParams();

  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formValues, setFormValues] = useState({
    type: "",
    vendorName: "",
    purchaseDateProductType: "",
    quantityProductType: "",
    eachPriceProductType: "",
    currentLocationProductType: "",
    conditionGoodProductType: 0,
    conditionBadProductType: 0,
  });

  const [vendors, setVendors] = useState([]);

  const vendorOptions = vendors.map((vendor) => {
    return { value: vendor.vendorName, label: vendor.vendorName };
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormValues((prevState) => ({ ...prevState, type: "" }));
    setFormValues((prevState) => ({ ...prevState, vendor: "" }));
    setFormValues((prevState) => ({ ...prevState, purchaseDate: "" }));
    setFormValues((prevState) => ({ ...prevState, quantity: "" }));
    setFormValues((prevState) => ({ ...prevState, eachPrice: "" }));
    setFormValues((prevState) => ({ ...prevState, currentLocation: "" }));
    setFormValues((prevState) => ({ ...prevState, condition: "" }));
    setFormValues((prevState) => ({ ...prevState, conditionGood: "" }));
    setFormValues((prevState) => ({ ...prevState, conditionBad: "" }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: selectedOption,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // handle form submission
    const newErrors = {};

    if (!formValues.type) {
      newErrors.type = "Please enter the type of the product!";
    }

    if (!formValues.vendorName.value) {
      newErrors.vendorName = "Please select the vendor!";
    }

    if (!formValues.quantityProductType) {
      newErrors.quantityProductType = "Please enter the numbers of product!";
    }

    if (!formValues.purchaseDateProductType) {
      newErrors.purchaseDateProductType = "Please enter the purchase date!";
    }

    if (!formValues.eachPriceProductType) {
      newErrors.eachPriceProductType = "Please enter the product unit price!";
    }

    if (!formValues.currentLocationProductType) {
      newErrors.currentLocationProductType =
        "Please enter the current locantion of the product";
    }

    if (
      !formValues.conditionGoodProductType ||
      !formValues.conditionBadProductType
    ) {
      newErrors.condition = "Please enter the condition of product!";
    } else if (
      parseInt(formValues.conditionGoodProductType) +
        parseInt(formValues.conditionBadProductType) !==
      parseInt(formValues.quantityProductType)
    ) {
      newErrors.condition =
        "The total of good and bad condition must be equal to quantity!";
    }

    // add api
    await api
      .post(
        "/v1/im/productTypes",
        {
          type: formValues.type,
          vendorName: formValues.vendorName.value,
          quantityProductType: formValues.quantityProductType,
          eachPriceProductType: formValues.eachPriceProductType,
          currentLocationProductType: formValues.currentLocationProductType,
          conditionGoodProductType: formValues.conditionGoodProductType,
          conditionBadProductType: formValues.conditionBadProductType,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setErrors({});

        setSuccessMessage(res.data.msg);
        setShowPopupSuccess(true);

        // redirect to product list
        navigate(
          `/${groupSlug}-category/${categorySlug}/${subCategorySlug}/${productSlug}`
        );
      })
      .catch((err) => {
        console.log(err, err.message);
        setErrors(newErrors);
      });
  };

  const getLoggedIn = () => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getAllVendors = async () => {
    await api
      .get("/v1/im/vendors/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setVendors(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    document.title = "Inventory Management - Add Product Type";

    getLoggedIn();
    getAllVendors();
  }, [navigate]);

  console.log(formValues);

  const Popup = ({ message }) => {
    return (
      <div className="popup-success">
        <div className="popup-success-content">
          <div className="popup-success-message">{message}</div>
        </div>
      </div>
    );
  };

  return isLoggedIn ? (
    <div className="App">
      <div className="add-product-type-container">
        <div className="navbar-container">
          <h1>Add Product Type</h1>
          <SideBar />
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="form-field">
                Type
                <input
                  type="text"
                  name="type"
                  value={formValues.type}
                  onChange={handleInputChange}
                  className="input-form"
                />
              </label>
            </div>
            {errors.type && (
              <div className="error-message-ctgry">{errors.type}</div>
            )}
            <div>
              <label className="form-field">
                Vendor
                <Select
                  options={vendorOptions}
                  name="vendorName"
                  value={formValues.vendorName}
                  onChange={(selectedOption) =>
                    handleSelectChange("vendorName", selectedOption)
                  }
                  className="select-form"
                />
              </label>
            </div>
            {errors.vendorName && (
              <div className="error-message-ctgry">{errors.vendorName}</div>
            )}
            <div>
              <label className="form-field">
                Purchase Date
                <input
                  type="date"
                  name="purchaseDateProductType"
                  value={formValues.purchaseDateProductType}
                  onChange={handleInputChange}
                  className="input-form"
                />
              </label>
            </div>
            {errors.purchaseDateProductType && (
              <div className="error-message-ctgry">
                {errors.purchaseDateProductType}
              </div>
            )}
            <div>
              <label className="form-field">
                Quantity
                <input
                  type="number"
                  name="quantityProductType"
                  value={formValues.quantityProductType}
                  onChange={handleInputChange}
                  className="input-form"
                />
              </label>
            </div>
            {errors.quantityProductType && (
              <div className="error-message-ctgry">
                {errors.quantityProductType}
              </div>
            )}
            <div>
              <label className="form-field">
                Each Price
                <input
                  type="number"
                  name="eachPriceProductType"
                  value={formValues.eachPriceProductType}
                  onChange={handleInputChange}
                  className="input-form"
                />
              </label>
            </div>
            {errors.eachPriceProductType && (
              <div className="error-message-ctgry">
                {errors.eachPriceProductType}
              </div>
            )}
            <div>
              <label className="form-field">
                Current Location
                <input
                  type="text"
                  name="currentLocationProductType"
                  value={formValues.currentLocationProductType}
                  onChange={handleInputChange}
                  className="input-form"
                />
              </label>
            </div>
            {errors.currentLocationProductType && (
              <div className="error-message-ctgry">
                {errors.currentLocationProductType}
              </div>
            )}
            <div>
              <label className="form-field">
                Condition
                <div className="condition-input">
                  <span>Good</span>
                  <input
                    type="number"
                    name="conditionGoodProductType"
                    value={formValues.conditionGoodProductType}
                    onChange={handleInputChange}
                    className="good"
                  />
                  <span>Bad</span>
                  <input
                    type="number"
                    name="conditionBadProductType"
                    value={formValues.conditionBadProductType}
                    onChange={handleInputChange}
                    className="bad"
                  />
                </div>
              </label>
              {errors.condition && (
                <div className="error-message-ctgry">{errors.condition}</div>
              )}
            </div>
            <div>
              <button type="submit" className="btn-product-type-form">
                Submit
              </button>
            </div>
          </form>
        </div>
        {showPopupSuccess && <Popup message={successMessage} />}
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
}

export default AddProductType;
