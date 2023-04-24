import React from 'react'
import FloatingActionCategory from '../Components/FloatingActionCategory';
import SideBar from '../Components/SideBar';
import { Link } from 'react-router-dom';
import SliderCD from '../Components/Computer Devices/SliderCD';




function ActiveCategory() {
  return (
    <div className='App'>
        <div className='active-page-container'>
            <div className='navbar-container'>
                <h1>Active</h1>
                <SideBar/>
            </div>
            <div className='product-category-container'>
                <h4>Computer Devices</h4>
                <h6><Link to="/computer-devices" style={{textDecoration: 'none', color: '#D9C5C5', fontWeight: 'lighter'}}>See All</Link></h6>
                <SliderCD/>
            </div>
            <div>
            <h4>Household Appliances</h4>
            <h6><Link to="/computer-devices" style={{textDecoration: 'none', color: '#D9C5C5', fontWeight: 'lighter'}}>See All</Link></h6>
            </div>
            <div className='fab-btn'>
            <FloatingActionCategory/>
            </div>
        </div>
    </div>
  )
}

export default ActiveCategory;
