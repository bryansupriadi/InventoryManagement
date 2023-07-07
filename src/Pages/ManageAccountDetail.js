import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../Assets/logo.png";

// import { user } from "../Components/data/userdata";

import api from "../api";

function ManageAccountDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filteredUser, setFilteredUser] = useState([]);
  const [showPopupDelete, setShowPopupDelete] = useState(false);

  const toggleCancelPopupDelete = () => {
    setShowPopupDelete(!showPopupDelete);
  };

  const togglePopupDelete = () => {
    setShowPopupDelete(showPopupDelete);
  };

  const handleDelete = async (id) => {
    console.log("Delete user with ID:", id);

    // api handle delete user
    await api
      .delete(`/v1/im/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        navigate("/manage-account");
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  const handleSignOut = async () => {
    await api
      .get("/v1/im/users/signOut")
      .then((res) => {
        console.log(res.data);
        console.log(res.data.msg);

        localStorage.removeItem("token");

        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  const getLoggedIn = () => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getUserData = async () => {
    await api
      .get(`/v1/im/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setFilteredUser(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    getLoggedIn();
    getUserData();

    const foundUser = filteredUser.find(
      (userData) => userData._id === parseInt(id)
    );
    setFilteredUser(foundUser);
  }, [id, navigate]);

  const PopupDelete = () => {
    return (
      <div className="popup-delete-container">
        <h3>Are you sure you want to delete this user?</h3>
        <div className="button-container">
          <button className="cancel-button" onClick={toggleCancelPopupDelete}>
            Cancel
          </button>
          <button
            className="delete-button"
            onClick={handleDelete(filteredUser._id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  return isLoggedIn ? (
    <div className="App">
      <div className="manage-account-detail-container">
        <div className="navbar-super-admin-container">
          <img src={logo} width="40" height="40" alt="" />
          <h1>
            <Link
              // to="/"
              onClick={handleSignOut}
              style={{ textDecoration: "none", color: "#ff3333" }}
            >
              Sign Out
            </Link>
          </h1>
        </div>
        <div className="user-detail">
          <ul>
            {filteredUser ? (
              <li key={filteredUser._id}>
                <p>ID: {filteredUser.userId}</p>
                <p>Name: {filteredUser.username}</p>
                <p>Email: {filteredUser.emailAddress}</p>
                <p>Role: {filteredUser.role}</p>
              </li>
            ) : (
              <p>user not found</p>
            )}
          </ul>
        </div>
        <button
          type="submit"
          className="btn-user-detail"
          onClick={togglePopupDelete}
        >
          Delete
        </button>
      </div>
      {showPopupDelete && <PopupDelete />}
    </div>
  ) : (
    navigate("/sign-in")
  );
}

export default ManageAccountDetail;
