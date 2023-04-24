import React, { useState } from "react";
import { Icon } from '@iconify/react';


function SearchBar(props){

    const[inputValue, setInputValue] = useState('');
    
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        props.handleSearch(e);
    }

    const handleClearButtonClick = () => {
        setInputValue('');
    }

    return(
        <div className="search-bar-container">
            <form action="" className="search" id="search-bar" onClick={handleClearButtonClick}>
            <input 
            type="search" 
            className="search-bar-input" 
            placeholder="Search"
            value={inputValue}
            onChange={handleInputChange}>
            </input>
            {inputValue && (
                <Icon icon="ic:round-search" />
            )}
            {!inputValue && (
                <div className="search-btn" id="search-button">
                    <Icon icon="ic:round-search" className="icon-search" style={{display: inputValue ? 'none' : 'block'}} />
                </div>
            )}
            </form>
        </div>
        )
}

export default SearchBar;