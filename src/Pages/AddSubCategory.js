import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SideBar from "../Components/SideBar";

import api from "../api";

// active sub category

export function AddSubCategoryActive() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [errors, setErrors] = useState({});
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [categories, setCategories] = useState([]);

  const [formValues, setFormValues] = useState({
    categoryName: null,
    subCategoryName: "",
  });

  const [subCategoryImage, setSubCategoryImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubCategoryImageChange = (e) => {
    setSubCategoryImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formValues.categoryName) {
      newErrors.categoryName = "Please enter the category first!";
    }

    if (!formValues.subCategoryName) {
      newErrors.subCategoryName = "Please enter the sub category first!";
    }

    if (!subCategoryImage) {
      newErrors.subCategoryImage = "Please enter the sub category image first!";
    }

    const formData = new FormData();
    formData.append("categoryName", formValues.categoryName);
    formData.append("subCategoryName", formValues.subCategoryName);
    formData.append("subCategoryImage", subCategoryImage);

    // tambahkan kode untuk melakukan submit form
    await api
      .post("/v1/im/subCategories", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setShowPopupSuccess(true);
        setSuccessMessage(res.data.msg);

        navigate("/active-category");
      })
      .catch((err) => {
        console.log(err, err.message);

        setErrors(newErrors);
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
      .get("/v1/im/categories", {
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
    document.title = "Inventory Management - Add Sub Category Product";

    getLoggedIn();
    getAllCategories();
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
                  name="categoryName"
                  value={formValues.categoryName}
                  onChange={handleInputChange}
                  className="select-ctgry-form"
                >
                  <option selected>Choose category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {errors.categoryName && (
              <div className="error-message-ctgry">{errors.categoryName}</div>
            )}
            <div>
              <label className="form-field">
                Sub category Name
                <input
                  type="text"
                  name="subCategoryName"
                  value={formValues.subCategoryName}
                  onChange={handleInputChange}
                  className="input-form"
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
                Sub category Image
                <input
                  type="file"
                  name="subCategoryImage"
                  onChange={handleSubCategoryImageChange}
                />
              </label>
            </div>
            {errors.subCategoryImage && (
              <div className="error-message-ctgry">
                {errors.subCategoryImage}
              </div>
            )}
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
  ) : (
    navigate("/sign-in")
  );
}

export function AddSubCategoryPassive() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [errors, setErrors] = useState({});
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [categories, setCategories] = useState([]);

  const [formValues, setFormValues] = useState({
    categoryName: null,
    subCategoryName: "",
  });

  const [subCategoryImage, setSubCategoryImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubCategoryImageChange = (e) => {
    setSubCategoryImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formValues.categoryName) {
      newErrors.categoryName = "Please enter the category first!";
    }

    if (!formValues.subCategoryName) {
      newErrors.subCategoryName = "Please enter the sub category first!";
    }

    if (!subCategoryImage) {
      newErrors.subCategoryImage = "Please enter the sub category image first!";
    }

    const formData = new FormData();
    formData.append("categoryName", formValues.categoryName);
    formData.append("subCategoryName", formValues.subCategoryName);
    formData.append("subCategoryImage", subCategoryImage);

    // tambahkan kode untuk melakukan submit form
    await api
      .post("/v1/im/subCategories", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setShowPopupSuccess(true);
        setSuccessMessage(res.data.msg);

        navigate("/passive-category");
      })
      .catch((err) => {
        console.log(err, err.message);

        setErrors(newErrors);
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
      .get("/v1/im/categories", {
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
    document.title = "Inventory Management - Add Sub Category Product";

    getLoggedIn();
    getAllCategories();
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
                  name="categoryName"
                  value={formValues.categoryName}
                  onChange={handleInputChange}
                  className="select-ctgry-form"
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category.categoryName}>
                      {category.categoryName}
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
                  name="subCategoryName"
                  value={formValues.subCategoryName}
                  onChange={handleInputChange}
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
                  name="subCategoryImage"
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
        </div>
        {showPopupSuccess && <Popup message={successMessage} />}
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
}
