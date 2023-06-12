import React from 'react'
import SideBar from '../Components/SideBar';
import SliderPassive from '../Components/Slider/SliderPassive';
import FloatingActionCategory from '../Components/FloatingAction/FloatingActionCategory';

function PassiveCategory() {
  return (
    <div className='App'>
      <div className='passive-page-container'>
        <div className='navbar-container'>
        <h1>Passive</h1>
        <SideBar/>
      </div>
      <SliderPassive/>
      <div className='fab-btn'>
        <FloatingActionCategory type ='passive'/>
      </div>
    </div>
  </div>
  )
}

export default PassiveCategory;
