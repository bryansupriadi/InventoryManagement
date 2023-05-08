import React from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../Components/SideBar';
import product from '../Components/data/product';
import { Link } from 'react-router-dom';

function ProductBrands() {
  const { name } = useParams();

  // Filter produk yang sesuai dengan sub kategori yang dipilih
  const filteredProducts = product.filter(item => item["Sub Category"] === name);

  const categories = [...new Set(filteredProducts.map(item => item.Category))];

  // Ambil merek produk, jumlah, dan harga yang ada pada produk yang sudah difilter
  const productsInfo = filteredProducts.map(item => ({
    brandName: item["Brand Name"],
    quantity: item["Qty"],
    price: item["Price"]
  }));

  // Tampilkan merek produk, jumlah, dan harga dalam list
  const content = (
    <ul className='list-brands-container'>
      {productsInfo.map(info => (
        <li key={`${info.brandName}-${info.price}`}>
          <Link
            to={`/${name.toLowerCase()}/${info.brandName.toLowerCase()}`}
            style={{ textDecoration: 'none', color: 'white' }}
            className='list-brands'
          >
            <div className='brand-info'>
              <h3>{info.brandName}</h3>
              <h6>Quantity: {info.quantity}</h6>
            </div>
            <div className='price-info'>
              <h6>{info.price}</h6>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className='App'>
      <div className='product-brand-page-container'>
        <div className='navbar-container'>
          <h1>{categories}</h1>
          <SideBar />
        </div>
        <div className='sub-title-product'>
          <h3>{name}</h3>
        </div>
        <div className='content-list'>
          {content}
        </div>
      </div>
    </div>
  );
}

export default ProductBrands;
