import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import SideBar from "../Components/SideBar";

import api from "../api";

const AddProductForm = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formValues, setFormValues] = useState({
    brandName: "",
    group: "",
    categoryName: "",
    subCategoryName: "",
    typeProductName: "",
    vendorName: "",
    purchaseDate: "",
    quantity: 0,
    eachPrice: 0,
    currentLocation: "",
    conditionGood: 0,
    conditionBad: 0,
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [vendors, setVendors] = useState([]);

  const [errors, setErrors] = useState({});

  const group = [
    { value: "Active", label: "Active" },
    { value: "Passive", label: "Passive" },
  ];

  const categoriesOptions = categories.map((category) => {
    return { value: category.categoryName, label: category.categoryName };
  });

  const subCategoriesOptions = subCategories.map((subCategory) => {
    return {
      value: subCategory.subCategoryName,
      label: subCategory.subCategoryName,
    };
  });

  const vendorOptions = vendors.map((vendor) => {
    return { value: vendor.vendorName, label: vendor.vendorName };
  });

  const handleSelectChange = (name, selectedOption) => {
    setFormValues((prevState) => ({ ...prevState, [name]: selectedOption }));

    if (name === "group") {
      if (formValues.group.value === "Active") {
        console.log("Active");

        getAllCategories();
      } else if (formValues.group.value === "Passive") {
        console.log("Passive");

        getAllCategories();
      }
    }

    if (name === "categoryName") {
      if (formValues.categoryName.value) {
        getAllSubCategories(formValues.categoryName.value);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const resetForm = () => {
    setFormValues((prevState) => ({ ...prevState, brandName: "" }));
    setFormValues((prevState) => ({ ...prevState, group: "" }));
    setFormValues((prevState) => ({ ...prevState, categoryName: "" }));
    setFormValues((prevState) => ({ ...prevState, subCategoryName: "" }));
    setFormValues((prevState) => ({ ...prevState, typeProductName: "" }));
    setFormValues((prevState) => ({ ...prevState, vendorName: "" }));
    setFormValues((prevState) => ({ ...prevState, purchaseDate: "" }));
    setFormValues((prevState) => ({ ...prevState, quantity: "" }));
    setFormValues((prevState) => ({ ...prevState, eachPrice: "" }));
    setFormValues((prevState) => ({ ...prevState, currentLocation: "" }));
    setFormValues((prevState) => ({ ...prevState, conditionGood: "" }));
    setFormValues((prevState) => ({ ...prevState, conditionBad: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // handle form submission
    const newErrors = {};

    if (!formValues.brandName) {
      newErrors.brandName = "Please enter the product name!";
    }

    if (!formValues.group.value) {
      newErrors.group = "Please choose the group!";
    }

    if (!formValues.categoryName.value) {
      setErrors((prevState) => ({
        ...prevState,
        categoryName: "Fill the group first!",
      }));
    }

    if (!formValues.subCategoryName.value) {
      setErrors((prevState) => ({
        ...prevState,
        subCategoryName: "Fill the category first!",
      }));
    }

    if (!formValues.typeProductName) {
      newErrors.typeProductName = "Please enter the type of the product!";
    }

    if (!formValues.vendorName.value) {
      newErrors.vendorName = "Please select the vendor!";
    }

    if (!formValues.quantity) {
      newErrors.quantity = "Please enter the numbers of product!";
    }

    if (!formValues.purchaseDate) {
      newErrors.purchaseDate = "Please enter the purchase date!";
    }

    if (!formValues.eachPrice) {
      newErrors.eachPrice = "Please enter the product unit price!";
    }

    if (!formValues.currentLocation) {
      newErrors.currentLocation =
        "Please enter the current locantion of the product";
    }

    if (!formValues.conditionGood || !formValues.conditionBad) {
      newErrors.condition = "Please enter the condition of product!";
    } else if (
      parseInt(formValues.conditionGood) + parseInt(formValues.conditionBad) !==
      parseInt(formValues.quantity)
    ) {
      newErrors.condition =
        "The total of good and bad condition must be equal to quantity!";
    }

    // add product api
    await api
      .post(
        "/v1/im/products",
        {
          brandName: formValues.brandName,
          group: formValues.group.value,
          categoryName: formValues.categoryName.value,
          subCategoryName: formValues.subCategoryName.value,
          typeProductName: formValues.typeProductName,
          vendorName: formValues.vendorName.value,
          purchaseDate: formValues.purchaseDate,
          quantity: formValues.quantity,
          eachPrice: formValues.eachPrice,
          currentLocation: formValues.currentLocation,
          conditionGood: formValues.conditionGood,
          conditionBad: formValues.conditionBad,
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
        resetForm();
        setTimeout(() => {
          setShowPopupSuccess(false);

          const { categorySlug, subCategorySlug } = res.data.data;

          if (formValues.group.value === "Active") {
            navigate(`/active-category/${categorySlug}/${subCategorySlug}`);
          } else if (formValues.group.value === "Passive") {
            navigate(`/passive-category/${categorySlug}/${subCategorySlug}`);
          }
        }, 3500);
      })
      .catch((err) => {
        console.log(err, err.message);

        setTimeout(() => {
          setErrors({});
        }, 3500);

        setSuccessMessage("");
      });
  };

  const getLoggedIn = () => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getAllCategories = async () => {
    await api
      .get("/v1/im/categories/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  const getAllSubCategories = async (categoryName) => {
    await api
      .get(`/v1/im/subCategories?categoryName=${categoryName}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setSubCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
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
    getLoggedIn();
    getAllVendors();
  }, [navigate]);

  const Popup = ({ message }) => {
    return (
      <div className="popup-success">
        <div className="popup-success-content">
          <div className="popup-success-message">{message}</div>
        </div>
      </div>
    );
  };

  console.log(formValues);

  return isLoggedIn ? (
    <div className="App">
      <div className="add-product-page-container">
        <div className="navbar-container">
          <h1>Add Product</h1>
          <SideBar />
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="form-field">
                Brand Name
                <input
                  type="text"
                  name="brandName"
                  value={formValues.brandName}
                  onChange={handleInputChange}
                  className="input-form"
                />
              </label>
            </div>
            {errors.brandName && (
              <div className="error-message-ctgry">{errors.brandName}</div>
            )}
            <div>
              <label className="form-field">
                Group
                <Select
                  options={group}
                  name="group"
                  value={formValues.group}
                  onChange={(selectedOption) =>
                    handleSelectChange("group", selectedOption)
                  }
                  className="select-form"
                />
              </label>
            </div>
            {errors.group && (
              <div className="error-message-ctgry">{errors.group}</div>
            )}
            <div>
              <label className="form-field">
                Category
                <Select
                  name="categoryName"
                  options={categoriesOptions}
                  value={formValues.categoryName}
                  onChange={(selectedOption) =>
                    handleSelectChange("categoryName", selectedOption)
                  }
                  className="select-form"
                />
              </label>
            </div>
            {errors.categoryName && (
              <div className="error-message-ctgry">{errors.categoryName}</div>
            )}
            <div>
              <label className="form-field">
                Sub Category
                <Select
                  options={subCategoriesOptions}
                  name="subCategory"
                  value={formValues.subCategoryName}
                  onChange={(selectedOption) =>
                    handleSelectChange("subCategoryName", selectedOption)
                  }
                  className="select-form"
                />
              </label>
            </div>
            {errors.subCategoryName && (
              <div className="error-message-ctgry">
                {errors.subCategoryName}
              </div>
            )}
            <div>
              <label className="form-field">
                Type
                <input
                  type="text"
                  name="typeProductName"
                  value={formValues.typeProductName}
                  onChange={handleInputChange}
                  className="input-form"
                />
              </label>
            </div>
            {errors.typeProductName && (
              <div className="error-message-ctgry">
                {errors.typeProductName}
              </div>
            )}
            <div>
              <label className="form-field">
                Vendor
                <Select
                  options={vendorOptions}
                  name="vendor"
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
                  name="purchaseDate"
                  value={formValues.purchaseDate}
                  onChange={handleInputChange}
                  className="input-form"
                />
              </label>
            </div>
            {errors.purchaseDate && (
              <div className="error-message-ctgry">{errors.purchaseDate}</div>
            )}
            <div>
              <label className="form-field">
                Quantity
                <input
                  type="number"
                  name="quantity"
                  value={formValues.quantity}
                  onChange={handleInputChange}
                  className="input-form"
                />
              </label>
            </div>
            {errors.quantity && (
              <div className="error-message-ctgry">{errors.quantity}</div>
            )}
            <div>
              <label className="form-field">
                Each Price
                <input
                  type="number"
                  name="eachPrice"
                  value={formValues.eachPrice}
                  onChange={handleInputChange}
                  className="input-form"
                />
              </label>
            </div>
            {errors.eachPrice && (
              <div className="error-message-ctgry">{errors.eachPrice}</div>
            )}
            <div>
              <label className="form-field">
                Current location
                <input
                  type="text"
                  name="currentLocation"
                  value={formValues.currentLocation}
                  onChange={handleInputChange}
                  className="input-form"
                />
              </label>
              {errors.currentLocation && (
                <div className="error-message-ctgry">
                  {errors.currentLocation}
                </div>
              )}
            </div>
            <div>
              <label className="form-field">
                Condition
                <div className="condition-input">
                  <span>Good</span>
                  <input
                    type="number"
                    name="conditionGood"
                    value={formValues.conditionGood}
                    onChange={handleInputChange}
                    className="good"
                  />
                  <span>Bad</span>
                  <input
                    type="number"
                    name="conditionBad"
                    value={formValues.conditionBad}
                    onChange={handleInputChange}
                    className="bad"
                  />
                </div>
              </label>
              {errors.condition && (
                <div className="error-message-ctgry">{errors.condition}</div>
              )}
            </div>
            <button type="submit" className="btn-form">
              Add Product
            </button>
          </form>
        </div>
        {showPopupSuccess && <Popup message={successMessage} />}
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
};

export default AddProductForm;
