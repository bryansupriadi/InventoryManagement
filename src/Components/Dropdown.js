import React, { useState } from 'react';
import { Icon } from '@iconify/react';

function Dropdown({selected, setSelected}) {
    const [isActive, setIsActive] = useState(false);
    const options = ["Last 7 days", "Last month", "Last 6 month", "Last year", "All time"]
  
    return (
    <div className='dropdown-container'>
    <div className='dropdown-page'>
      <div className='dropdown-btn' onClick={(e) =>
        setIsActive(!isActive)}>
      {selected}
      <Icon icon="gridicons:dropdown" width="35" height="35" />
      </div>
      {isActive && (
        <div className='dropdown-content'>
            {options.map((option, index) => (
                <div 
                key={index }
                onClick={(e) => {
                    setSelected(option);
                    setIsActive(false);
                }} 
                className='dropdown-item'>
                {option}
                </div>
            ))}
        </div>
      )}
    </div>
  </div>

  )
}

export default Dropdown;

