import React from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../Components/SideBar';
import product from '../Components/data/product';
import { Link } from 'react-router-dom';

function ProductBrands() {
  const { group, item, name } = useParams();


  // Filter produk yang sesuai dengan sub kategori yang dipilih
  const filteredProducts = product.filter(item => item["Sub Category"] === name);

  // Ambil merek produk, jumlah, dan harga yang ada pada produk yang sudah difilter
  const productsInfo = filteredProducts.map(item => ({
    brandName: item["Brand Name"],
    quantity: item["Qty"],
    price: item["Total Price"]
  }));

  // Tampilkan merek produk, jumlah, dan harga dalam list
  const content = (
    <ul className='list-brands-container'>
      {productsInfo.map(info => (
        <li
          key={`${info.brandName}-${info.price}`}
          className={info.quantity ? 'has-quantity' : 'no-quantity'}
        >
          <Link
            to={{
              pathname: `/${group}-category/${item}/${name}/${info.brandName}`,
              state: { group: group, subCategory: name, brandName: info.brandName }
            }}
            style={{ textDecoration: 'none', color: 'white' }}
            className='list-brands'
          >
            <div className='brand-info'>
              <h3>{info.brandName}</h3>
              {info.quantity && <h6>Quantity: {info.quantity}</h6>}
            </div>
            <div className='price-info'>
              <h6>${info.price}</h6>
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
          <h1>{item}</h1>
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
