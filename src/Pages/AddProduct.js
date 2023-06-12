import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import SideBar from "../Components/SideBar";

import api from "../api";

const AddProductForm = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formValues, setFormValues] = useState({
    brandName: "",
    group: null,
    categoryName: null,
    subCategoryName: null,
    typeProductName: "",
    vendorName: null,
    purchaseDate: "",
    quantity: "",
    eachPrice: "",
    currentLocation: "",
    condition: "",
  });

  const [productId, setProductId] = useState("");
  const [categories, setCategories] = useState("");
  // const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoriesOptions, setSubCategoryOptions] = useState([]);
  const [vendorOptions, setVendorOptions] = useState([]);
  const [errors, setErrors] = useState({});

  const group = [
    { value: "active", label: "Active" },
    { value: "passive", label: "Passive" },
  ];

  const categoriesOptions = categories.map((item) => {
    return { value: item.categoryName, label: item.categoryName };
  });

  // const subCategories = {
  //   computerdevices: [
  //     { value: "monitor", label: "Monitor" },
  //     { value: "mouse", label: "Mouse" },
  //     { value: "printer", label: "Printer" },
  //     { value: "cpu", label: "CPU" },
  //     { value: "keyboard", label: "Keyboard" },
  //   ],
  //   householdappliances: [
  //     { value: "fridge", label: "Fridge" },
  //     { value: "ac", label: "AC" },
  //   ],
  //   furniture: [
  //     { value: "chair", label: "Chair" },
  //     { value: "table", label: "Table" },
  //     { value: "cupboard", label: "Cupboard" },
  //   ],
  //   officesupplies: [
  //     { value: "archfile", label: "Arch File" },
  //     { value: "scissors", label: "Scissors" },
  //   ],
  // };

  // const vendors = [
  //   { value: "ikea", label: "IKEA" },
  //   { value: "shopee", label: "Shopee" },
  //   { value: "tokopedia", label: "Tokopedia" },
  // ];

  const handleSelectChange = (name, selectedOption) => {
    setFormValues((prevState) => ({ ...prevState, [name]: selectedOption }));

    // if (selectedOption.value === "active") {
    //   setCategoryOptions(categories.active);
    // } else if (selectedOption.value === "passive") {
    //   setCategoryOptions(categories.passive);
    // }

    // if (selectedOption.value === "computerdevices") {
    //   setSubCategoryOptions(subCategories.computerdevices);
    // } else if (selectedOption.value === "householdappliances") {
    //   setSubCategoryOptions(subCategories.householdappliances);
    // } else if (selectedOption.value === "furniture") {
    //   setSubCategoryOptions(subCategories.furniture);
    // } else if (selectedOption.value === "officesupplies") {
    //   setSubCategoryOptions(subCategories.officesupplies);
    // }

    if (name === "group") {
      setFormValues((prevState) => ({
        ...prevState,
        category: null,
        subCategory: null,
      }));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let idString = "";
    if (formValues.group && formValues.category) {
      if (formValues.group.value === "active") {
        idString += "1";
      } else if (formValues.group.value === "passive") {
        idString += "0";
      }
      if (formValues.category.value === "computerdevices") {
        idString += "01";
      } else if (formValues.category.value === "householdappliances") {
        idString += "02";
      } else if (formValues.category.value === "furniture") {
        idString += "03";
      } else if (formValues.category.value === "officesupplies") {
        idString += "04";
      }

      idString += productId;

      console.log(idString);
    }

    // handle form submission
    const newErrors = {};

    if (!formValues.brandName) {
      newErrors.brandName = "Please enter the product name!";
    }
    if (!formValues.group) {
      newErrors.group = "Please choose the group!";
    }
    if (!formValues.category) {
      setErrors((prevState) => ({
        ...prevState,
        category: "Fill the group first!",
      }));
    }
    if (!formValues.subCategory) {
      setErrors((prevState) => ({
        ...prevState,
        subCategory: "Fill the category first!",
      }));
    }
    if (!formValues.type) {
      newErrors.type = "Please enter the type of the product!";
    }
    if (!formValues.vendor) {
      newErrors.vendor = "Please select the vendor!";
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
    if (Object.keys(newErrors).length === 0) {
      setErrors(errors);
      setProductId((prevId) => prevId + 1);
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

  useEffect(() => {
    getLoggedIn();
    getAllCategories();
  }, [navigate]);

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
                  options={categoriesOptions}
                  name="categoryName"
                  value={formValues.categoryName}
                  onChange={(selectedOption) =>
                    handleSelectChange("categoryName", selectedOption)
                  }
                  className="select-form"
                />
              </label>
            </div>
            {errors.category && (
              <div className="error-message-ctgry">{errors.category}</div>
            )}
            <div>
              <label className="form-field">
                Sub Category
                <Select
                  options={subCategoriesOptions}
                  name="subCategory"
                  value={formValues.subCategory}
                  onChange={(selectedOption) =>
                    handleSelectChange("subCategory", selectedOption)
                  }
                  className="select-form"
                />
              </label>
            </div>
            {errors.subCategories && (
              <div className="error-message-ctgry">{errors.subCategories}</div>
            )}
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
                  name="vendor"
                  value={formValues.vendor}
                  onChange={(selectedOption) =>
                    handleSelectChange("vendor", selectedOption)
                  }
                  className="select-form"
                />
              </label>
            </div>
            {errors.vendor && (
              <div className="error-message-ctgry">{errors.vendor}</div>
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
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
};

export default AddProductForm;
