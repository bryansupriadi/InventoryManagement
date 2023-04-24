import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { product } from './data/product';

class AutoCarousel extends React.Component {
  render() {
    const totalProduct = product.length;
    const totalQty = product.reduce((total, item) => total + item.Qty, 0);
    const totalPrice = product.reduce(
      (total, item) => total + parseInt(item.Price.slice(1)), 0
    );
    const outOfStock = product.filter(item => item.Qty <= 5).length;

    const settings = {
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3500,
      slidesToShow: 1,
      arrows: false,
    };
    
    return (
      <div className='carousel-wrapper'>
        <Slider {...settings} className='carousel-container'>
          <div className='carousel-slide-1'>
            <h3>Total Product</h3>
            <p>{totalProduct}</p>
          </div>
          <div className='carousel-slide-2'>
            <h3>Total Quantity</h3>
            <p>{totalQty}</p>
          </div>
          <div className='carousel-slide-3'>
            <h3>Total Price</h3>
            <p>${totalPrice}</p>
          </div>
          <div className='carousel-slide-4'>
            <h3>Out of Stock</h3>
            <p>{outOfStock}</p>
          </div>
        </Slider>
      </div>
    );
  }
}

export default AutoCarousel;
