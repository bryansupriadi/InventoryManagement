import React from 'react'
import SideBar from '../Components/SideBar';
import SliderPassive from '../Components/Computer Devices/SliderPassive';
import FloatingActionCategory from '../Components/FloatingActionCategory';

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
        <FloatingActionCategory/>
      </div>
    </div>
  </div>
  )
}

export default PassiveCategory;
