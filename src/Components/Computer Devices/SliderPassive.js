import React from 'react';
import { Link } from 'react-router-dom';
import {Furniture, OfficeSupplies} from './ComputerDevices';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductTemp from './ProductTemp';

function SliderPassive() {
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
  


  const furniture = Furniture.map((item) => (
    <Link to={`/passive-category/furniture/${item.name}`} key={item.id}>
      <ProductTemp 
        name={item.name} 
        icon={item.icon} 
      />
    </Link>
  ));

  const supplies = OfficeSupplies.map((item) => (
    <Link to={`/passive-category/office-supplies/${item.name}`} key={item.id}>
      <ProductTemp 
        name={item.name} 
        icon={item.icon} 
      />
    </Link>
  ));

  return (
    <div className='product-category-container'>
    <h4>Furniture</h4>
    <h6><Link to="/passive-category/furniture" style={{textDecoration: 'none', color: '#D9C5C5', fontWeight: 'lighter'}}>See All</Link></h6>
    <div className='carousel-items'>
      <Carousel responsive={responsive} showDots={false} arrows={false}>
      {furniture}
      </Carousel>
    </div>
    <h4>Office Supplies</h4>
    <h6><Link to="/passive-category/household-appliances"  style={{textDecoration: 'none', color: '#D9C5C5', fontWeight: 'lighter'}}>See All</Link></h6>
    <div className='carousel-items'>
      <Carousel responsive={responsive} showDots={false} arrows={false}>
      {supplies}
      </Carousel>
    </div>
    </div>
  );
}



export default SliderPassive;
