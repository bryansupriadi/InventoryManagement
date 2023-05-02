import React from 'react'
import FloatingActionCategory from '../Components/FloatingActionCategory';
import SideBar from '../Components/SideBar';
import { Link } from 'react-router-dom';
import SliderActive from '../Components/Computer Devices/SliderActive';




function ActiveCategory() {
  return (
    <div className='App'>
        <div className='active-page-container'>
            <div className='navbar-container'>
                <h1>Active</h1>
                <SideBar/>
            </div>
            <div className='content-container'>
              <SliderActive/>
            </div>
            <div className='fab-btn'>
            <FloatingActionCategory/>
            </div>
        </div>
    </div>
  )
}

export default ActiveCategory;
