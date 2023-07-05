import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

function Dropdown({selected, setSelected}) {
    const [isActive, setIsActive] = useState(false);
    const options = ["Last year", "Last 3 years", "Last 5 years", "All time"]
 
    const handleOptionClick = (option) => {
      setSelected(option);
      setIsActive(false);
    }

    useEffect(() => {
      setIsActive(false);
    }, [selected]);
    
    return (
    <div className='dropdown-container'>
    <div className='dropdown-page'>
      <div className='dropdown-btn' onClick={(e) => setIsActive(!isActive)}>
      {selected}
      <Icon icon="gridicons:dropdown" width="35" height="35" />
      </div>
      {isActive && (
        <div className='dropdown-content'>
            {options.map((option, index) => (
                <div 
                key={index }
                onClick={() => handleOptionClick(option)}
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

