import React, { useState } from 'react';
import { useMemo } from 'react';
import SideBar from '../Components/SideBar';
import Carousel from '../Components/Carousel';
import Dropdown from '../Components/Dropdown';
import product from '../Components/data/product';
import SearchBar from "../Components/SearchBar";
import { COLUMNS } from '../Components/Table';
import {useTable} from 'react-table';
import logo from '../Assets/logo.png';

function Home() {
  const [selected, setSelected] = useState("All time");
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => product, []);
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (e) => {
    const value = e.target.value;
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setFilteredData(data);
    else {
      const filteredItems = data.filter((item) =>
        item.name && item.name.toLowerCase().includes(lowercasedValue)
      );
      setFilteredData(filteredItems);
    }
  };
  

  const tableInstance = useTable({
    columns,
    data: filteredData,
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <div className="App">
      <div className="home-page-container">
        <div className='navbar-container'>
        <img 
          src= {logo} 
          width='45'
          height='45'
          alt='' />
        <SideBar/>
      </div>
        <Dropdown selected={selected} setSelected={setSelected}/>
        <Carousel/>
        <div className="home-title">
          <div className='title-container'>
            <h1>Inventory Items</h1>
            <SearchBar handleSearch={handleSearch}/>
          </div>
        </div>
        <div className='table-home-page'>
        <table {...getTableProps()} className='table-container'>
          <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row)
                return(
                  <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default Home;
