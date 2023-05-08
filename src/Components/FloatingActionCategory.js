import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function FloatingActionButton(props) {
  const [showOptions, setShowOptions] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [category, setCategory] = useState('');
  const type = props.type;
  const url = `/add-sub-category/${type}`;

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleCategoryInputChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAddCategory = (event) => {
    event.preventDefault();
    // TODO: process the categoryInput value
    setCategory('');
    togglePopup();
  };

  return (
    <div className="floating-action-button-container">
      <button className="floating-action-button" onClick={toggleOptions}>
        <span>+</span>
      </button>
      {showOptions && (
        <div className="floating-action-button-options">
          <div className='fab-option-container'>
          <span onClick={togglePopup}>Add Category</span>
          <button className='fab-option' onClick={togglePopup}>
          2
          </button>
          </div>
          <div className='fab-option-container'>
          <span><Link to={url} style={{textDecoration: 'none', color: '#002938'}}>Add Sub Category</Link></span>
          <button className='fab-option'>
          <Link to={url} style={{textDecoration: 'none', color: '#002938'}}>1</Link>
          </button>
          </div>
          </div>
      )}
      <div className='show-popup'>
      {showPopup && (
        <div className="popup-container">
          <form onSubmit={handleAddCategory}>
            <h1>Add Category</h1>
            <input type="text" placeholder="category name.." value={category} onChange={handleCategoryInputChange} />
            <button type="submit">Save</button>
          </form>
        </div>
      )}
      </div>
    </div>
  );
}

export default FloatingActionButton;
