import React from 'react'
import FloatingActionCategory from '../Components/FloatingAction/FloatingActionCategory';
import SideBar from '../Components/SideBar';
import SliderActive from '../Components/Slider/SliderActive';




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
            <FloatingActionCategory type='active'/>
            </div>
        </div>
    </div>
  )
}

export default ActiveCategory;
