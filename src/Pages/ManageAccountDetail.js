import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import logo from '../Assets/logo.png';
import { user } from '../Components/data/userdata';

function ManageAccountDetail() {
    const {id: urlId} = useParams();
    const [filteredUser, setFilteredUser] = useState([]);
    const [showPopupDelete, setShowPopupDelete] = useState(false);

    useEffect(() => {
      const foundUser = user.find((userData) => userData.id === parseInt(urlId));
    setFilteredUser(foundUser);
    }, [urlId]);

    const togglePopupDelete = () => {
      setShowPopupDelete(!showPopupDelete);
    }

    const handleDelete = () => {
      console.log('Delete product with ID:', urlId);
      togglePopupDelete();
    }

      
    return (
    <div className='App'>
    <div className='manage-account-detail-container'>
    <div className='navbar-super-admin-container'>
    <img src={logo} width="40" height="40" alt="" />
    <h1>
      <Link
        to="/"
        // onClick={handleSignOut}
        style={{ textDecoration: "none", color: "#ff3333" }}
      >
        Sign Out
      </Link>
    </h1>
    </div>
    <div className='user-detail'>
    <ul>
    {filteredUser ? (
        <li key={filteredUser.id}>
        <p>ID: {filteredUser.id}</p>
        <p>Name: {filteredUser.name}</p>
        <p>Email: {filteredUser.email}</p>
        <p>Role: {filteredUser.role}</p>
        </li>
    ) : (
      <p>user not found</p>
    )}
    </ul>
    </div>
    <button type="submit" className="btn-user-detail" onClick={togglePopupDelete}>
    Delete
    </button>
    </div>
    {showPopupDelete && (
      <div className='popup-delete-container'>
      <h3>Are you sure you want to delete this user?</h3>
      <div className="button-container">
        <button className="cancel-button" onClick={togglePopupDelete}>Cancel</button>
        <button className="delete-button" onClick={handleDelete}>Delete</button>
      </div>
      </div>
    )}
    </div>
  )
}

export default ManageAccountDetail
