import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SideBar from "../Components/SideBar";

import api from "../api";

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

// export function AddSubCategoryPassive() {
//   const categories = [
//     {
//       type: "active",
//       values: [
//         { value: "computerdevices", label: "Computer Devices" },
//         { value: "householdappliances", label: "Household Appliances" },
//       ],
//     },
//     {
//       type: "passive",
//       values: [
//         { value: "furniture", label: "Furniture" },
//         { value: "officesupplies", label: "Office Supplies" },
//       ],
//     },
//   ];

//   const passiveCategories = categories.find(
//     (category) => category.type === "passive"
//   ).values;

//   const [category, setCategory] = useState("");
//   const [subCategoryName, setSubCategoryName] = useState("");
//   const [subCategoryImage, setSubCategoryImage] = useState("");
//   const [errors, setErrors] = useState({});
//   const [showPopupSuccess, setShowPopupSuccess] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleCategoryChange = (event) => {
//     setCategory(event.target.value);
//   };

//   const handleSubCategoryNameChange = (event) => {
//     setSubCategoryName(event.target.value);
//   };

//   const handleSubCategoryImageChange = (event) => {
//     setSubCategoryImage(event.target.value);
//   };

//   const resetForm = () => {
//     setCategory("");
//     setSubCategoryName("");
//     setSubCategoryImage("");
//     setErrors({});
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const newErrors = {};

//     if (!subCategoryName) {
//       newErrors.subCategoryName = "Please enter the sub category name!";
//     }
//     if (!subCategoryImage) {
//       newErrors.subCategoryImage = "Please insert the photo!";
//     }

//     if (Object.keys(newErrors).length === 0) {
//       setErrors({});
//       setSuccessMessage("Sub Category successfully added!");
//       setShowPopupSuccess(true);
//       resetForm();
//       setTimeout(() => {
//         setShowPopupSuccess(false);
//       }, 3500);
//     } else {
//       setErrors(newErrors);
//       setSuccessMessage("");
//     }
//   };

//   const Popup = ({ message }) => {
//     return (
//       <div className="popup-success">
//         <div className="popup-success-content">
//           <div className="popup-success-message">{message}</div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="App">
//       <div className="add-sub-category-page-container">
//         <div className="navbar-container">
//           <h1>Add Sub Category</h1>
//           <SideBar />
//         </div>
//         <div className="form-container">
//           <form onSubmit={handleSubmit}>
//             <div>
//               <label className="form-field">
//                 Category Name
//                 <select
//                   value={category}
//                   onChange={handleCategoryChange}
//                   className="select-ctgry-form"
//                 >
//                   {passiveCategories.map((category) => (
//                     <option key={category.value} value={category.value}>
//                       {category.label}
//                     </option>
//                   ))}
//                 </select>
//               </label>
//             </div>
//             <div>
//               <label className="form-field">
//                 Sub category Name
//                 <input
//                   type="text"
//                   value={subCategoryName}
//                   onChange={handleSubCategoryNameChange}
//                   className="input-form"
//                 />
//               </label>
//               {errors.subCategoryName && (
//                 <div className="error-message-1">{errors.subCategoryName}</div>
//               )}
//             </div>
//             <div>
//               <label className="form-field">
//                 Sub category Image
//                 <input
//                   type="file"
//                   value={subCategoryImage}
//                   onChange={handleSubCategoryImageChange}
//                 />
//               </label>
//               {errors.subCategoryImage && (
//                 <div className="error-message-1">{errors.subCategoryImage}</div>
//               )}
//             </div>
//             <div>
//               <button type="submit" className="btn-ctgry-form">
//                 Submit
//               </button>
//             </div>
//           </form>
//           {showPopupSuccess && <Popup message={successMessage} />}
//         </div>
//       </div>
//     </div>
//   );
// }
