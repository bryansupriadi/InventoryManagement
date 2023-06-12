import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SideBar from '../Components/SideBar';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ComputerDevices, HouseholdAppliances, Furniture, OfficeSupplies } from '../Components/Slider/SubCategory';

function VendorProduct() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 2.5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2.5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2.5
    },
    mobile: {
      breakpoint: { max: 400, min: 0 },
      items: 2.5
    }
  };

  const { name } = useParams();

  const vendorData = [
    {
      "Id" : "1",
      "Sub Category" : "Monitor",
      "Brand Name" : "Samsung",
      "Vendor" : "Tokopedia",
      "Qty" : 3,
      "Total Price" : "$590",
    },
    {
      "Id" : "2",
      "Sub Category" : "Monitor",
      "Brand Name" : "Samsung",
      "Vendor" : "Shopee",
      "Qty" : 3,
      "Total Price" : "$600",
    },
    {
      "Id" : "3",
      "Sub Category" : "Monitor",
      "Brand Name" : "LG",
      "Vendor" : "Tokopedia",
      "Qty" : 4,
      "Total Price" : "$500",
    },
    {
      "Id" : "4",
      "Sub Category" : "Table",
      "Brand Name" : "Adils",
      "Vendor" : "IKEA",
      "Qty" : 11,
      "Total Price" : "$616",
    },
    {
      "Id" : "5",
      "Sub Category" : "Sofa",
      "Brand Name" : "Willy",
      "Vendor" : "Shopee",
      "Qty" : 2,
      "Total Price" : "$460",
    },
  ]

  const itemNames = [
    ...ComputerDevices.map(item => item.name),
    ...HouseholdAppliances.map(item => item.name),
    ...Furniture.map(item => item.name),
    ...OfficeSupplies.map(item => item.name)
  ];

  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [vendorItems, setVendorItems] = useState([]);

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    const filteredItems = vendorData.filter(item => item['Sub Category'] === subCategory && item['Vendor'] === name);
    setVendorItems(filteredItems);
  }

  useEffect(() => {
    setFilteredItems(vendorData.filter(item => item["Vendor"] === name));
    setVendorItems(vendorData.filter(item => item["Vendor"] === name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const items = (
    <ul className='list-brands-container'>
      {vendorItems.map(info => (
        <li key={`${info['Brand Name']}-${info['Total Price']}`}>
          <Link
            to={{
              pathname: `/vendor-list/${name}/${info['Sub Category']}/${info['Brand Name']}`,
              state: { subCategory: info['Sub Category'], brandName: info['Brand Name']  }
            }}
            style={{ textDecoration: 'none', color: 'white' }}
            className='list-brands'
          >
            <div className='brand-info'>
              <h3>{info['Brand Name']}</h3>
              <h6>Quantity: {info['Qty']}</h6>
            </div>
            <div className='price-info'>
              <h6>{info['Total Price']}</h6>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  const itemStyle = {
    margin: '20px', // Atur jarak antara komponen
    backgroundColor: '#88e2ff', // Atur warna latar belakang
    color: '#002938', // Atur warna teks
    padding: '10px', // Atur ruang internal dalam komponen
  };

  const selectedItemStyle = {
    ...itemStyle,
    backgroundColor: '#00788D',
    color: '#fff',
  }

  return (
    <div className='App'>
      <div className='vendor-product-page-container'>
        <div className='navbar-container'>
          <h1>{name}</h1>
          <SideBar />
        </div>
        <Carousel responsive={responsive} showDots={false} arrows={false}>
        {itemNames.sort((a, b) => a.localeCompare(b)).map((item, index) => (
          <div
            key={index}
            style={selectedSubCategory === item ? selectedItemStyle : itemStyle}
            className='slider-sub-category'
            onClick={() => handleSubCategoryClick(item)}
          >
            {item}
          </div>
        ))}
      </Carousel>
      <div className='vendor-content-container'>
        {items}
      </div>
    </div>
  </div>
);
}

export default VendorProduct;

