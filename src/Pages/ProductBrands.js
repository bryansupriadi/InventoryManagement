import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import SideBar from "../Components/SideBar";

import api from "../api";

function ProductBrands() {
  const navigate = useNavigate();
  const { categorySlug, subCategorySlug } = useParams();

  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [product, setProduct] = useState([]);

  // Filter produk yang sesuai dengan sub kategori yang dipilih
  const filteredProducts = product.filter(
    (item) => item.subCategorySlug === subCategorySlug
  );

  // Ambil merek produk, jumlah, dan harga yang ada pada produk yang sudah difilter
  const productsInfo = filteredProducts.map((item) => ({
    _id: item._id,
    brandName: item.brandName,
    categoryName: item.categoryName,
    subCategoryName: item.subCategoryName,
    groupSlug: item.groupSlug,
    productSlug: item.productSlug,
    quantity: item.quantity,
    eachPrice: item.eachPrice,
  }));

  const getLoggedIn = () => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getAllProductBrands = async () => {
    await api
      .get(`/v1/im/products?subCategorySlug=${subCategorySlug}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    document.title = "Inventory Management - Product Brands";

    getLoggedIn();
    getAllProductBrands();
  }, [navigate, categorySlug, subCategorySlug]);

  // Tampilkan merek produk, jumlah, dan harga dalam list
  // Tampilkan merek produk, jumlah, dan harga dalam list
  // const content = (
  //   <ul className='list-brands-container'>
  //     {productsInfo.map(info => (
  //       <li
  //         key={`${info.brandName}-${info.price}`}
  //         className={info.quantity ? 'has-quantity' : 'no-quantity'}
  //       >
  //         <Link
  //           to={{
  //             pathname: `/${group}-category/${item}/${name}/${info.brandName}`,
  //             state: { group: group, subCategory: name, brandName: info.brandName }
  //           }}
  //           style={{ textDecoration: 'none', color: 'white' }}
  //           className='list-brands'
  //         >
  //           <div className='brand-info'>
  //             <h3>{info.brandName}</h3>
  //             {info.quantity && <h6>Quantity: {info.quantity}</h6>}
  //           </div>
  //           <div className='price-info'>
  //             <h6>${info.price}</h6>
  //           </div>
  //         </Link>
  //       </li>
  //     ))}
  //   </ul>
  // );

  return isLoggedIn ? (
    <div className="App">
      <div className="product-brand-page-container">
        <div className="navbar-container">
          <h1>{productsInfo.categoryName}</h1>
          <SideBar />
        </div>
        <div className="sub-title-product">
          <h3>{productsInfo.brandName}</h3>
        </div>
        <div className="content-list">
          <ul className="list-brands-container">
            {productsInfo.map((info) => (
              <li
                key={`${info.brandName}-${info.eachPrice}`}
                className={info.quantity ? "has-quantity" : "no-quantity"}
              >
                <Link
                  to={`/${info.groupSlug}-category/${categorySlug}/${subCategorySlug}/${info.productSlug}/${info._id}`}
                  style={{ textDecoration: "none", color: "white" }}
                  className="list-brands"
                >
                  <div className="brand-info">
                    <h3>{info.brandName}</h3>
                    {info.quantity && <h6>Quantity: {info.quantity}</h6>}
                  </div>
                  <div className="price-info">
                    <h6>{info.eachPrice}</h6>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
}

export default ProductBrands;
