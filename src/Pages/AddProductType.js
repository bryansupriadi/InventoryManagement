import React, { useState, useEffect } from 'react';
import SideBar from '../Components/SideBar';
import Select from 'react-select';

function AddProductType() {

  const [productId, setProductId] =useState('');
  const [errors, setErrors] = useState({});
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('')

  const [formValues, setFormValues] = useState({
    type: '',
    vendor: null,
    purchaseDate: '',
    quantity: '',
    eachPrice: '',
    currentLocation: '',
    condition: '',
  });

  const vendors = [
    { value: 'ikea', label: 'IKEA' },
    { value: 'shopee', label: 'Shopee' },
    { value: 'tokopedia', label: 'Tokopedia' },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormValues((prevState) => ({ ...prevState, type: '' })) 
    setFormValues((prevState) => ({ ...prevState, vendor: '' })) 
    setFormValues((prevState) => ({ ...prevState, purchaseDate: '' })) 
    setFormValues((prevState) => ({ ...prevState, quantity: '' })) 
    setFormValues((prevState) => ({ ...prevState, eachPrice: '' })) 
    setFormValues((prevState) => ({ ...prevState, currentLocation: '' })) 
    setFormValues((prevState) => ({ ...prevState, condition: '' }))
    setFormValues((prevState) => ({ ...prevState, conditionGood: '' })) 
    setFormValues((prevState) => ({ ...prevState, conditionBad: '' })) 
  }

  const handleSelectChange = (name, selectedOption) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: selectedOption.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let idString = '';
    if(formValues.group && formValues.category){
      if(formValues.group.value === 'active'){
        idString += '1';
      } else if (formValues.group.value === 'passive'){
        idString += '0';
      }
      if (formValues.category.value === 'computerdevices'){
        idString += '01';
      } else if (formValues.category.value === 'householdappliances'){
        idString += '02';
      } else if (formValues.category.value === 'furniture') {
        idString += '03';
      } else if (formValues.category.value === 'officesupplies') {
        idString += '04';
      }

      idString += productId;

      console.log (idString);
    }

    // handle form submission
    const newErrors = {};
  
    if (!formValues.type){
      newErrors.type = 'Please enter the type of the product!';
    }
    if (!formValues.vendor){
      newErrors.vendor = 'Please select the vendor!';
    }
    if (!formValues.quantity){
      newErrors.quantity = 'Please enter the numbers of product!';
    }    
    if (!formValues.purchaseDate){
      newErrors.purchaseDate = 'Please enter the purchase date!';
    }
    if (!formValues.eachPrice){
      newErrors.eachPrice = 'Please enter the product unit price!';
    }
    if (!formValues.currentLocation){
      newErrors.currentLocation = 'Please enter the current locantion of the product';
    }
    if (!formValues.conditionGood || !formValues.conditionBad) {
      newErrors.condition = 'Please enter the condition of product!';
    } else if (parseInt(formValues.conditionGood) + parseInt(formValues.conditionBad) !== parseInt(formValues.quantity)) {
      newErrors.condition = 'The total of good and bad condition must be equal to quantity!';
    }
    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      setProductId((prevId) => prevId + 1)
      setSuccessMessage('Product Type successfully added!');
      setShowPopupSuccess(true);
      resetForm();
      setTimeout(() => {
        setShowPopupSuccess(false);
      },3500);
    } else{
      setErrors(newErrors);
      setSuccessMessage('');
    }
  };

    useEffect(() => {
    if (showPopupSuccess) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showPopupSuccess]);

  const Popup = ({ message }) => {
    return (
      <div className="popup-success">
        <div className="popup-success-content">
          <div className="popup-success-message">{message}</div>
        </div>
      </div>
    );
  };


  return (
    <div className='App'>
      <div className='add-product-type-container'>
        <div className='navbar-container'>
          <h1>Add Product Type</h1>
          <SideBar />
        </div>
        <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <div>
              <label className='form-field'>
                Type
                <input
                  type='text'
                  name='type'
                  value={formValues.type}
                  onChange={handleInputChange}
                  className='input-form'
                />
              </label>
            </div>
            {errors.type && <div className='error-message-ctgry'>{errors.type}</div>}
            <div>
              <label className='form-field'>
                Vendor
                <Select 
                options={vendors} 
                name="vendor" 
                defaultValue={formValues.vendor} 
                onChange={(selectedOption) => handleSelectChange('vendor', selectedOption)}  
                className='select-form'
                />
              </label>
            </div>
            {errors.vendor && <div className='error-message-ctgry'>{errors.vendor}</div>}
            <div>
              <label className='form-field'>
                Purchase Date
                <input
                  type='date'
                  name='purchaseDate'
                  value={formValues.purchaseDate}
                  onChange={handleInputChange}
                  className='input-form'
                />
              </label>
            </div>
            {errors.purchaseDate && <div className='error-message-ctgry'>{errors.purchaseDate}</div>}
            <div>
              <label className='form-field'>
                Quantity
                <input
                  type='number'
                  name='quantity'
                  value={formValues.quantity}
                  onChange={handleInputChange}
                  className='input-form'
                />
              </label>
            </div>
            {errors.quantity && <div className='error-message-ctgry'>{errors.quantity}</div>}
            <div>
              <label className='form-field'>
                Each Price
                <input
                  type='number'
                  name='eachPrice'
                  value={formValues.eachPrice}
                  onChange={handleInputChange}
                  className='input-form'
                />
              </label>
            </div>
            {errors.eachPrice && <div className='error-message-ctgry'>{errors.eachPrice}</div>}
            <div>
              <label className='form-field'>
                Current Location
                <input
                  type='text'
                  name='currentLocation'
                  value={formValues.currentLocation}
                  onChange={handleInputChange}
                  className='input-form'
                />
              </label>
            </div>
            {errors.currentLocation && <div className='error-message-ctgry'>{errors.currentLocation}</div>}
            <div>
              <label className='form-field'>
                Condition
                <div className="condition-input">
                  <span>Good</span>
                  <input type="number" name="conditionGood" value={formValues.conditionGood} onChange={handleInputChange} className='good' />
                  <span>Bad</span>
                  <input type="number" name="conditionBad" value={formValues.conditionBad} onChange={handleInputChange} className='bad' />
                </div>
              </label>
              {errors.condition && <div className='error-message-ctgry'>{errors.condition}</div>}
            </div>
            <div>
              <button type='submit' className='btn-product-type-form'>
                Submit
              </button>
            </div>
          </form>
        </div>
        {showPopupSuccess && (
          <Popup
          message={successMessage}
          />
        )}    
      </div>
    </div>
  );
}

export default AddProductType;
