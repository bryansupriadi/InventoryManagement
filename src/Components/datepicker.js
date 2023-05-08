import React, { useState } from 'react';

const MonthYearPicker = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = ['2017', '2018', '2019','2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };


  const selectStyle = {
    appearance: 'none',
  };

  return (
    <div className='dropdown-date-picker'>
      <select value={selectedMonth} onChange={handleMonthChange} style={selectStyle} className='dropdown-month'>
        <option value=''> Month</option>
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
      <select value={selectedYear} onChange={handleYearChange} className='dropdown-year'>
        <option value=''> Year</option>
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthYearPicker;
