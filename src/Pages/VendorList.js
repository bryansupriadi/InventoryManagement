import React, { useState } from 'react';
import data from '../Components/data/vendorData';
import SideBar from '../Components/SideBar';
import { Link } from 'react-router-dom';

function VendorList() {
  const [vendor, setVendor] = useState(data);
  const [keyword, setKeyword] = useState('');

  const filterVendor = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filteredVendor = keyword !== ''
    ? vendor.filter((user) => user.name.toLowerCase().indexOf(keyword) > -1)
    : data;
    setVendor(filteredVendor);
    setKeyword(keyword);
  };

  return (
    <div className='App'>
    <div className='vendor-list-page-container'>
    <div className='navbar-container'>
    <h1>Vendor list</h1>
    <SideBar/>
    </div>
    <div className='search-vendor-container'>
      <input 
      type="text" 
      value={keyword} 
      onChange={filterVendor} 
      placeholder='Search'
      className='search-vendor'/>
      </div>
      <div className='vendor-list-container'>
      <ul>
        {vendor.map((user, index) => (
          <li key={index}>
          <Link to={`/vendor-list/${user.name}`} style={{textDecoration: 'none', color: 'white'}}>{user.name}</Link>
          </li>
        ))}
      </ul>
      </div>
    </div>
    </div>
  );
}

export default VendorList;