import React from 'react'
import { useParams } from 'react-router-dom'
import SideBar from '../Components/SideBar';

function VendorProduct() {

    const {name} =useParams();

  return (
    <div className='App'>
    <div className='vendor-product-page-container'>
    <div className='navbar-container'>
    <h1>{name}</h1>
    <SideBar/>
    </div>
    </div>
    
    </div>
  )
}

export default VendorProduct
