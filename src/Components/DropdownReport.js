import React, { useState } from 'react';
import { Icon } from '@iconify/react';

function DropdownReport({selected, setSelected}) {
    const [isActive, setIsActive] = useState(false);
    const options = ["Last year", "Last 3 years", "Last 5 years", "Last 10 years", "All time"]
  
    return (
    <div className='dropdown-container'>
    <div className='dropdown-page'>
      <div className='dropdown-btn-1' onClick={(e) =>
        setIsActive(!isActive)}>
      {selected}
      <Icon icon="gridicons:dropdown" width="35" height="35" />
      </div>
      {isActive && (
        <div className='dropdown-content-1'>
            {options.map((option, index) => (
                <div 
                key={index }
                onClick={(e) => {
                    setSelected(option);
                    setIsActive(false);
                }} 
                className='dropdown-item-1'>
                {option}
                </div>
            ))}
        </div>
      )}
    </div>
  </div>

  )
}

export default DropdownReport;

