import React, { useState } from 'react';

function FloatingActionVendor() {
    const [vendor, setVendor] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [errors, setErrors] = useState({});

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleVendorInputChange = (event) => {
        setVendor(event.target.value);
    }

    const handleAddVendor = (event) => {
        event.preventDefault();
        const newErrors = {};

        if (vendor.trim() === '') {
            newErrors.vendor = 'Vendor name is required';
        }

        if (Object.keys(newErrors).length === 0) {
            // TODO: process the categoryInput value
            setVendor('');
            togglePopup();
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className='floating-action-vendor-container'>
            <button className='floating-action-button' onClick={togglePopup}>
                <span>+</span>
            </button>
            <div className='show-popup'>
                {showPopup && (
                    <div className='popup-container'>
                        <form onSubmit={handleAddVendor}>
                            <h1>Add Vendor</h1>
                            <input type='text' placeholder='vendor name..' value={vendor} onChange={handleVendorInputChange}/>
                            {errors.vendor && <div className="error-message-vendor">{errors.vendor}</div>}
                            <button type='submit'>Save</button>
                        </form>
                    </div>
                )}
            </div>    
        </div>
    )
}

export default FloatingActionVendor;
