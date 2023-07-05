import React, { useState } from "react";

import Popup from "../Component/Popup";
import SideBar from "../Components/SideBar";

export function AddSubCategoryActive() {
  const categories = [
    {
      type: "active",
      values: [
        { value: "computerdevices", label: "Computer Devices" },
        { value: "householdappliances", label: "Household Appliances" },
      ],
    },
    {
      type: "passive",
      values: [
        { value: "furniture", label: "Furniture" },
        { value: "officesupplies", label: "Office Supplies" },
      ],
    },
  ];

  const activeCategories = categories.find(
    (category) => category.type === "active"
  ).values;

  const [category, setCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryImage, setSubCategoryImage] = useState("");
  const [errors, setErrors] = useState({});
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubCategoryNameChange = (event) => {
    setSubCategoryName(event.target.value);
  };

  const handleSubCategoryImageChange = (event) => {
    setSubCategoryImage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // tambahkan kode untuk melakukan submit form
  };

  return (
    <div className="App">
      <div className="add-sub-category-page-container">
        <div className="navbar-container">
          <h1>Add Sub Category</h1>
          <SideBar />
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="form-field">
                Category Name
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="select-ctgry-form"
                >
                  {activeCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label className="form-field">
                Sub category Name
                <input
                  type="text"
                  value={subCategoryName}
                  onChange={handleSubCategoryNameChange}
                  className="input-form"
                />
              </label>
            </div>
            <div>
              <label className="form-field">
                Sub category Image
                <input
                  type="file"
                  value={subCategoryImage}
                  onChange={handleSubCategoryImageChange}
                />
              </label>
            </div>
            <div>
              <button type="submit" className="btn-ctgry-form">
                Submit
              </button>
            </div>
          </form>
          {showPopupSuccess && <Popup message={successMessage} />}
        </div>
      </div>
    </div>
  );
}

export function AddSubCategoryPassive() {
  const categories = [
    {
      type: "active",
      values: [
        { value: "computerdevices", label: "Computer Devices" },
        { value: "householdappliances", label: "Household Appliances" },
      ],
    },
    {
      type: "passive",
      values: [
        { value: "furniture", label: "Furniture" },
        { value: "officesupplies", label: "Office Supplies" },
      ],
    },
  ];

  const passiveCategories = categories.find(
    (category) => category.type === "passive"
  ).values;

  const [category, setCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryImage, setSubCategoryImage] = useState("");
  const [errors, setErrors] = useState({});
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubCategoryNameChange = (event) => {
    setSubCategoryName(event.target.value);
  };

  const handleSubCategoryImageChange = (event) => {
    setSubCategoryImage(event.target.value);
  };

  const resetForm = () => {
    setCategory("");
    setSubCategoryName("");
    setSubCategoryImage("");
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!subCategoryName) {
      newErrors.subCategoryName = "Please enter the sub category name!";
    }
    if (!subCategoryImage) {
      newErrors.subCategoryImage = "Please insert the photo!";
    }

    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      setSuccessMessage("Sub Category successfully added!");
      setShowPopupSuccess(true);
      resetForm();
      setTimeout(() => {
        setShowPopupSuccess(false);
      }, 3500);
    } else {
      setErrors(newErrors);
      setSuccessMessage("");
    }
  };

  const Popup = ({ message }) => {
    return (
      <div className="popup-success">
        <div className="popup-success-content">
          <div className="popup-success-message">{message}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="add-sub-category-page-container">
        <div className="navbar-container">
          <h1>Add Sub Category</h1>
          <SideBar />
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="form-field">
                Category Name
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="select-ctgry-form"
                >
                  {passiveCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label className="form-field">
                Sub category Name
                <input
                  type="text"
                  value={subCategoryName}
                  onChange={handleSubCategoryNameChange}
                  className="input-form"
                />
              </label>
              {errors.subCategoryName && (
                <div className="error-message-1">{errors.subCategoryName}</div>
              )}
            </div>
            <div>
              <label className="form-field">
                Sub category Image
                <input
                  type="file"
                  value={subCategoryImage}
                  onChange={handleSubCategoryImageChange}
                />
              </label>
              {errors.subCategoryImage && (
                <div className="error-message-1">{errors.subCategoryImage}</div>
              )}
            </div>
            <div>
              <button type="submit" className="btn-ctgry-form">
                Submit
              </button>
            </div>
          </form>
          {showPopupSuccess && <Popup message={successMessage} />}
        </div>
      </div>
    </div>
  );
}
