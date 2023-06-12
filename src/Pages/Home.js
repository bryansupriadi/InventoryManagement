import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../Components/SideBar";
import Carousel from "../Components/Carousel";
import Dropdown from "../Components/Dropdown";
import product from "../Components/data/product";
import SearchBar from "../Components/SearchBar";
import { COLUMNS } from "../Components/Table";
import { useTable } from "react-table";
import logo from "../Assets/logo.png";
import { Icon } from '@iconify/react';

const Home = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selected, setSelected] = useState("All time");
  const columns = useMemo(() => COLUMNS, []);

  const [products, setProducts] = useState(product);
  const [keyword, setKeyword] = useState("");

  const filterProduct = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filteredProduct =
    keyword !== ""
      ? products.filter(
        (product) =>
          product.Name.toLowerCase().indexOf(keyword) > -1 ||
          product.Group.toLowerCase().indexOf(keyword) > -1
      )
      : product;
        

      setProducts(filteredProduct);
      setKeyword(keyword);
  };

  const data = useMemo(() => products, [products]);

  const tableInstance = useTable({columns, data});

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const getLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    getLoggedIn();
  }, [navigate]);

  return isLoggedIn ? (
    <div className="App">
      <div className="home-page-container">
        <div className="navbar-container">
          <img src={logo} width="40" height="40" alt="" />
          <SideBar />
        </div>
        <div className="dropdown-home">
        <Dropdown selected={selected} setSelected={setSelected} />
        </div>
        <Carousel />
        <div className="home-title">
          <div className="title-container">
            <h1>Inventory Items</h1>
            <div className="search-bar-container">
            <form action="" className="search" id="search-bar">
            <input
              type="text"
              value={keyword}
              onChange={filterProduct}
              placeholder="Search"
              className="search-bar-input"
            />
            <Icon icon="ic:round-search" />
            </form>
          </div>
          </div>
        </div>
        <div className="table-home-page">
          {products.length === 0 ? (
            <p>No data available</p>
          ) : (
            <div className="scroll-table-1">
            <div className="table-header">
            <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th 
                    className="table-header-cell-1"
                    {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            </table>
            </div>
            <div className="table-body">
            <table>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                  {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td 
                        className="table-body-cell-1" 
                        {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
          </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    navigate("/")
  );
};

export default Home;
