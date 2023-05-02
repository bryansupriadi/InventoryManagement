import React from 'react';
import {Link, useParams} from 'react-router-dom';
import SideBar from '../Components/SideBar';

const ProductDetail = ({ match }) => {

  const {name} = useParams();
  const id = match.useParams.id;

  const product = {
    id: id,
    vendor: 'Tokopedia',
    purchaseDate: '01/03/2020',
    price: '$150',
    currentLocation: 'Binakarsa',
    condition: 'Bad'
  };

  return (
  <div className='App'>
    <div className='product-detail-page-container'>
    <div className='navbar=container'>
    <h1>{name}</h1>
    <SideBar/>
    </div>
    <div className='product-type'>
      <h3>Samsung S22F350H</h3>
    </div>
    <div>
      <h1>Product Detail</h1>
      <p>ID Numbeer: {product.id}</p>
      <p>Vendor: {product.vendor}</p>
      <p>Purchase Date: {product.purchaseDate}</p>
      <p>Price: {product.price}</p>
      <p>Condition: {product.conditionGood} Good, {product.conditionBad} Bad</p>
      <p>Current Location: {product.currentLocation}</p>
      <Link to="/">Back to Home</Link>
    </div>
    </div>  
  </div>
  )
}

export default ProductDetail;
