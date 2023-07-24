import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../api";

function FloatingActionButton(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [showOptions, setShowOptions] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [errors, setErrors] = useState({});

  const [categoryName, setCategoryName] = useState("");

  const type = props.type;
  const url = `/add-sub-category/${type}`;

  console.log(type);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleCategoryInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const resetForm = () => {
    setCategoryName("");
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (categoryName.trim() === "") {
      newErrors.category = "Category name is required";
    }

    if (Object.keys(newErrors).length === 0) {
      await api
        .post(
          `/v1/im/categories/${type}/`,
          { categoryName },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          console.log(res.data);

          // TODO: process the categoryInput value
          setErrors("");
          setSuccessMessage("Category successfully added!");
          setShowPopupSuccess(true);
          resetForm();
          setTimeout(() => {
            setShowPopupSuccess(false);

            navigate(`/${type}-category`);
          }, 3500);
          togglePopup();
        })
        .catch((err) => {
          console.log(err, err.message);
        });
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
    <div className="floating-action-button-container">
      <button className="floating-action-button" onClick={toggleOptions}>
        <span>+</span>
      </button>
      {showOptions && (
        <div className="floating-action-button-options">
          <div className="fab-option-container">
            <span onClick={togglePopup}>Add Category</span>
            <button className="fab-option" onClick={togglePopup}>
              2
            </button>
          </div>
          <div className="fab-option-container">
            <span>
              <Link
                to={url}
                style={{ textDecoration: "none", color: "#002938" }}
              >
                Add Sub Category
              </Link>
            </span>
            <button className="fab-option">
              <Link
                to={url}
                style={{ textDecoration: "none", color: "#002938" }}
              >
                1
              </Link>
            </button>
          </div>
        </div>
      )}
      <div className="show-popup">
        {showPopup && (
          <div className="popup-container">
            <form onSubmit={handleAddCategory}>
              <h1>Add Category</h1>
              <input
                type="text"
                placeholder="category name.."
                value={categoryName}
                onChange={handleCategoryInputChange}
              />
              {errors.category && (
                <div className="error-message-vendor">{errors.category}</div>
              )}
              <button type="submit">Save</button>
            </form>
          </div>
        )}
      </div>
      {showPopupSuccess && <Popup message={successMessage} />}
    </div>
  );
}

export default FloatingActionButton;
