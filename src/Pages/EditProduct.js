import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../Components/SideBar';
import product from '../Components/data/product';

function EditProduct() {
  const { subCategory: urlSubCategory, brandName: urlBrandName, id: urlId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [purchaseDate, setPurchaseDate] = useState('');
  const [price, setPrice] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [condition, setCondition] = useState('');
  const [errors, setErrors] = useState('')

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

  const handleEditProduct = (event) => {
    event.preventDefault();
    const newErrors = {};

    if(!purchaseDate) {
      newErrors.purchaseDate = 'Please enter the purchase date!'
    }
    if(!price) {
      newErrors.price = 'Please enter the price!'
    }
    if(!currentLocation) {
      newErrors.currentLocation = 'Please enter the current location!'
    }
    if (!condition) {
      newErrors.condition = 'Please enter the condition!';
    } else if (condition !== 'Good' && condition !== 'Bad') {
      newErrors.condition = 'Condition must be either "Good" or "Bad"!';
    }
    if (Object.keys(newErrors).length === 0) {
      setErrors(errors);
    } else {
      setErrors(newErrors);
    }
    // Setelah penyimpanan berhasil, lakukan reset nilai form
    setPurchaseDate('');
    setPrice('');
    setCurrentLocation('');
    setCondition('');
  };

  return (
    <div className="App">
      <div className="edit-product-page-container">
        <div className="navbar-container">
          <h1>{urlSubCategory}</h1>
          <SideBar />
        </div>
        <div className="sub-title-product-1">
          <h3>{urlBrandName}</h3>
          <h3>{Type}</h3>
        </div>
        <div className="product-type">
          <ul>
            {filteredProducts.map((item) => (
              <li key={item['Product Id']}>
                <p>ID Number: {item['Product Id']}</p>
                <p>Vendor: {item['Vendor']}</p>
                <div className='form-container'>
                <form onSubmit={handleEditProduct}>
                  <div>
                    <label htmlFor="purchaseDate" className='form-field-1'>Purchase Date</label>
                    <input
                      type="date"
                      id="purchaseDate"
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
                      className='input-form'
                    />
                  </div>
                  {errors.purchaseDate && <div className='error-message-2'>{errors.purchaseDate}</div>}
                  <div>
                    <label htmlFor="price" className='form-field-1'>Price</label>
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className='input-form'
                    />
                  </div>
                  {errors.price && <div className='error-message-2'>{errors.price}</div>}
                  <div>
                    <label htmlFor="currentLocation" className='form-field-1'>Current Location</label>
                    <input
                      type="text"
                      id="currentLocation"
                      value={currentLocation}
                      onChange={(e) => setCurrentLocation(e.target.value)}
                      className='input-form'
                    />
                  </div>
                  {errors.currentLocation && <div className='error-message-2'>{errors.currentLocation}</div>}
                  <div>
                    <label htmlFor="condition" className='form-field-1'>Condition</label>
                    <input
                    type="text"
                    id="condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className='input-form'
                  />
                </div>
                {errors.condition && <div className='error-message-2'>{errors.condition}</div>}
                <button type="submit" className='btn-form-1'>Save Changes</button>
              </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
}

export default EditProduct;

