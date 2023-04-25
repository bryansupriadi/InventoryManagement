import React from 'react';
import { Link } from 'react-router-dom';
import ComputerDevices from './ComputerDevices';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductTemp from './ProductTemp';

function SliderCD() {
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
  
  const devices = ComputerDevices.map((item) => (
    <Link to={`/active-category/${item.name}`} key={item.id}>
      <ProductTemp 
        name={item.name} 
        icon={item.icon} 
      />
    </Link>
  ));

  return (
    <div className='product-category-container'>
    <h4>Computer Devices</h4>
    <h6><Link to="/computer-devices" style={{textDecoration: 'none', color: '#D9C5C5', fontWeight: 'lighter'}}>See All</Link></h6>
    <div className='carousel-items'>
      <Carousel responsive={responsive} showDots={false} arrows={false}>
        {devices}
      </Carousel>
    </div>
    </div>
  );
}

export default SliderCD;
