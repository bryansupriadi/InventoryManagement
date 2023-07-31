import React, { useState } from 'react';
import SideBar from '../Components/SideBar';
import DropdownReport from '../Components/DropdownReport';
import { PieChart } from 'react-minimal-pie-chart';
import product from '../Components/data/product';

function Report() {
  const [selected, setSelected] = useState('All time');
  const [filteredProducts, setFilteredProducts] = useState(product);3

  const setSelectedOption = (option) => {
    setSelected(option);
    let filtered = [];

    if (option === 'Last year') {
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      filtered = product.map((item) => {
        const subData = item['Sub Data'].filter((subItem) => {
          const date = new Date(subItem.Date);
          return date >= lastYear;
        });
        return { ...item, 'Sub Data': subData };
      });
    } else if (option === 'Last 3 years') {
      const last3Years = new Date();
      last3Years.setFullYear(last3Years.getFullYear() - 3);
      filtered = product.map((item) => {
        const subData = item['Sub Data'].filter((subItem) => {
          const date = new Date(subItem.Date);
          return date >= last3Years;
        });
        return { ...item, 'Sub Data': subData };
      });
    } else if (option === 'Last 5 years') {
      const last5Years = new Date();
      last5Years.setFullYear(last5Years.getFullYear() - 5);
      filtered = product.map((item) => {
        const subData = item['Sub Data'].filter((subItem) => {
          const date = new Date(subItem.Date);
          return date >= last5Years;
        });
        return { ...item, 'Sub Data': subData };
      });
    } else if (option === 'All time') {
      filtered = product;
    }

    setFilteredProducts(filtered);
  };

  const totalQty = filteredProducts.reduce((total, item) => total + item['Sub Data'].length, 0);
  const totalPrice = filteredProducts.reduce((total, item) => {
    const subDataTotalPrice = item['Sub Data'].reduce((subTotal, subItem) => subTotal + subItem.Price, 0);
    return total + subDataTotalPrice;
  }, 0);
  const totalGood = filteredProducts.reduce((total, item) => total + item.Good, 0);
  const totalBad = filteredProducts.reduce((total, item) => total + item.Bad, 0);
  const percentGood = ((totalGood / totalQty) * 100).toFixed(2);
  const percentBad = ((totalBad / totalQty) * 100).toFixed(2);
  const data = [
    {
      title: 'Good',
      value: totalGood,
      color: '#3456D0',
    },
    {
      title: 'Bad',
      value: totalBad,
      color: '#2C428D',
    },
  ];

  const totalGoodFormatted = totalGood.toLocaleString();
  const totalBadFormatted = totalBad.toLocaleString();
  const percentGoodFormatted = ((totalGood / totalQty) * 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const percentBadFormatted = ((totalBad / totalQty) * 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });


  return (
    <div className='App'>
      <div className='report-page-container'>
        <div className='navbar-container'>
          <h1>Report</h1>
          <SideBar />
        </div>
        <div>
          <DropdownReport selected={selected} setSelected={setSelectedOption} />
        </div>
        <div className='content-box-container'>
          <div className='box-content-1'>
            <h3>Total Quantity</h3>
            <p>{totalQty}</p>
          </div>
          <div className='box-content-2'>
            <h3>Total Price</h3>
            <p>${totalPrice}</p>
          </div>
        </div>
        <div className='box-content-3'>
          <h3>Condition</h3>
          <div className='condition-table'>
            <div className='condition-good-table'>
              <h4>Good</h4>
              <p>
                {totalGoodFormatted} ({percentGoodFormatted}%)
              </p>
            </div>
            <div className='condition-divider'></div>
            <div className='condition-bad-table'>
              <h4>Bad</h4>
              <p>
                {totalBadFormatted} ({percentBadFormatted}%)
              </p>
            </div>
          </div>
        </div>
        <div className='chart-container'>
          <PieChart
            className='pie-chart'
            data={data}
            lengthAngle={360}
            label={({ dataEntry }) => {
              const percent = totalQty > 0 ? ((dataEntry.value / totalQty) * 100).toFixed(2) : 0;
              return `${dataEntry.title} (${percent}%)`;
            }}
            labelPosition={50}
            labelStyle={{
              fontSize: '4px',
              fontWeight: '800',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Report;
