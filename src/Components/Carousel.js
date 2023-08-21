import React, { useMemo, useEffect, useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ products }) => {
  // const nonZeroQtyProducts = useMemo(() => {
  //   return products.filter((item) => item.length > 0);
  // }, [products]);

  // const nonZeroQtyProducts = products.filter((item) => item.length > 0);

  // const totalProduct = nonZeroQtyProducts.length;

  // const outOfStock = nonZeroQtyProducts.reduce((count, item) => {w
  //   if (item.length < 5) {
  //     return count + 1;
  //   } else {
  //     return count;
  //   }
  // }, 0);

  // const totalQty = nonZeroQtyProducts.reduce(
  //   (total, item) => total + item.length,
  //   0
  // );

  // const totalPrice = nonZeroQtyProducts.reduce((total, item) => {
  //   return (
  //     total +
  //     item.reduce((subTotal, subItem) => subTotal + subItem.eachPrice, 0)
  //   );
  // }, 0);

  // const totalProduct = useMemo(
  //   () => nonZeroQtyProducts.length,
  //   [nonZeroQtyProducts]
  // );

  // const outOfStock = useMemo(() => {
  //   return nonZeroQtyProducts.reduce((count, item) => {
  //     if (item.length < 5) {
  //       return count + 1;
  //     } else {
  //       return count;
  //     }
  //   }, 0);
  // }, [nonZeroQtyProducts]);

  // const totalQty = useMemo(() => {
  //   return nonZeroQtyProducts.reduce((total, item) => total + item.length, 0);
  // }, [nonZeroQtyProducts]);

  // const totalPrice = useMemo(() => {
  //   return nonZeroQtyProducts.reduce((total, item) => {
  //     return (
  //       total +
  //       item.reduce((subTotal, subItem) => subTotal + subItem.eachPrice, 0)
  //     );
  //   }, 0);
  // }, [nonZeroQtyProducts]);

  const totalProduct = products.length;
  const totalQty = products.reduce(
    (total, product) => total + product.length,
    0
  );
  const totalPrice = products.reduce(
    (total, product) => total + product.length * product.eachPrice,
    0
  );
  const outOfStock = products.filter((product) => product.length < 5).length;

  const [isTabletView, setIsTabletView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletView(window.innerWidth >= 800 && window.innerWidth <= 1300);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isTabletView) {
    return (
      <div className="carousel-wrapper">
        <div className="carousel-container">
          <div className="carousel-slide-1">
            <h3>Total Product</h3>
            <p>{totalProduct}</p>
          </div>
          <div className="carousel-slide-2">
            <h3>Total Quantity</h3>
            <p>{totalQty}</p>
          </div>
          <div className="carousel-slide-3">
            <h3>Total Price</h3>
            <p>${totalPrice}</p>
          </div>
          <div className="carousel-slide-4">
            <h3>Out of Stock</h3>
            <p>{outOfStock}</p>
          </div>
        </div>
      </div>
    );
  }

  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    arrows: false,
  };

  return (
    <div className="carousel-wrapper">
      <Slider {...settings} className="carousel-container">
        <div className="carousel-slide-1">
          <h3>Total Product</h3>
          <p>{totalProduct}</p>
        </div>
        <div className="carousel-slide-2">
          <h3>Total Quantity</h3>
          <p>{totalQty}</p>
        </div>
        <div className="carousel-slide-3">
          <h3>Total Price</h3>
          <p>Rp. {totalPrice}</p>
        </div>
        <div className="carousel-slide-4">
          <h3>Out of Stock</h3>
          <p>{outOfStock}</p>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
