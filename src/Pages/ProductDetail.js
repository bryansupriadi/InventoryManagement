import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import product from '../Components/data/product';
import SideBar from '../Components/SideBar';
import FloatingActionProduct from '../Components/FloatingAction/FloatingActionProduct';

const ProductDetail = () => {
  const { subCategory: urlSubCategory, brandName: urlBrandName, id: urlId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Mencari produk berdasarkan subCategory dan brandName
    const filteredProducts = product.filter((item) => {
      const subData = item['Sub Data'] || [];
      return (
        item['Sub Category'] === urlSubCategory &&
        item['Brand Name'] === urlBrandName &&
        subData.some((subItem) => subItem['Product Id'] === urlId)
      );
    });

    const subData = filteredProducts.length > 0 ? filteredProducts[0]['Sub Data'] : [];
    const productIdData = subData.filter((subItem) => subItem['Product Id'] === urlId);

    setFilteredProducts(productIdData);
  }, [urlSubCategory, urlBrandName, urlId]);

  const { Type } = filteredProducts.length > 0 ? filteredProducts[0] : '';

  return (
    <div className='App'>
      <div className='product-detail-page-container'>
        <div className='navbar-container'>
          <h1>{urlSubCategory}</h1>
          <SideBar/>
        </div>
        <div className='sub-title-product-1'>
          <h3>{urlBrandName}</h3>
          <h3>{Type}</h3>
        </div>
        <div className='product-type'>
          <ul>
            {filteredProducts.map((item) => (
              <li key={item['Product Id']}>
                <p>ID Number : {item['Product Id']}</p>
                <p>Vendor : {item['Vendor']}</p>
                <p>Purchase Date : {item['Date']}</p>
                <p>Price : {item['Price']}</p>
                <p>Current Location : {item['Location']}</p>
                <p>Condition : {item['Condition']}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className='fab-btn'>
        <FloatingActionProduct/>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
