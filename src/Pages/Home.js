import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { Icon } from "@iconify/react";
import logo from "../Assets/logo.png";
import SideBar from "../Components/SideBar";
import Carousel from "../Components/Carousel";
import Dropdown from "../Components/Dropdown";
import SearchBar from "../Components/SearchBar";
import { COLUMNS } from "../Components/Table";

import product from "../Components/data/product";

import api from "../api";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selected, setSelected] = useState("All time");

  const [filteredProducts, setFilteredProducts] = useState(product);

  const COLUMNS = [
    {
      Header: "Name",
      accessor: "Name",
    },
    {
      Header: "Qty",
      accessor: (row) => {
        const product = products.find((item) => item.Name === row.Name);
        return product ? product["Sub Data"].length : 0;
      },
    },
    {
      Header: "Price",
      accessor: (row) => {
        const product = products.find((item) => item.Name === row.Name);
        let totalPrice = 0;
        if (product) {
          product["Sub Data"].forEach((subItem) => {
            totalPrice += subItem.Price;
          });
        }
        return totalPrice;
      },
    },
    {
      Header: "Group",
      accessor: "Group",
    },
  ];

  const [products, setProducts] = useState(product);
  const [keyword, setKeyword] = useState("");
  // const [columns, setColumns] = useState(COLUMNS);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => products, [products]);

  const filterProduct = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filteredProduct =
      keyword !== ""
        ? products.filter(
            (product) =>
              product.Name.toLowerCase().indexOf(keyword) > -1 ||
              product.Group.toLowerCase().indexOf(keyword) > -1
          )
        : products;

    setFilteredProducts(filteredProduct);
    setKeyword(keyword);

    if (keyword === "") {
      setFilteredProducts(product);
      setProducts(product);
    }
  };

  const setSelectedOption = (option) => {
    setSelected(option);

    if (option === "Last year") {
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      const filtered = product.map((item) => {
        const subData = item["Sub Data"].filter((subItem) => {
          const subItemDate = new Date(subItem.Date);
          return subItemDate >= lastYear;
        });
        return { ...item, "Sub Data": subData };
      });
      setFilteredProducts(filtered);
      setProducts(filtered); // Perbarui nilai products
    } else if (option === "Last 3 years") {
      const last3Years = new Date();
      last3Years.setFullYear(last3Years.getFullYear() - 3);
      const filtered = product.map((item) => {
        const subData = item["Sub Data"].filter((subItem) => {
          const subItemDate = new Date(subItem.Date);
          return subItemDate >= last3Years;
        });
        return { ...item, "Sub Data": subData };
      });
      setFilteredProducts(filtered);
      setProducts(filtered); // Perbarui nilai products
    } else if (option === "Last 5 years") {
      const last5Years = new Date();
      last5Years.setFullYear(last5Years.getFullYear() - 5);
      const filtered = product.map((item) => {
        const subData = item["Sub Data"].filter((subItem) => {
          const subItemDate = new Date(subItem.Date);
          return subItemDate >= last5Years;
        });
        return { ...item, "Sub Data": subData };
      });
      setFilteredProducts(filtered);
      setProducts(filtered); // Perbarui nilai products
    } else if (option === "All time") {
      setFilteredProducts(product);
      setProducts(product); // Perbarui nilai products
    }
  };

  useEffect(() => {
    const updatedColumns = [...columns];
    updatedColumns[1].accessor = (row) => {
      const product = filteredProducts.find((item) => item.Name === row.Name);
      return product ? product["Sub Data"].length : 0;
    };
    updatedColumns[2].accessor = (row) => {
      const product = filteredProducts.find((item) => item.Name === row.Name);
      let totalPrice = 0;
      if (product) {
        product["Sub Data"].forEach((subItem) => {
          totalPrice += subItem.Price;
        });
      }
      return totalPrice;
    };
    setColumns(updatedColumns);
  }, [filteredProducts, columns]);

  const data = useMemo(() => filteredProducts, [filteredProducts]);

  const tableInstance = useTable({ columns, data });

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

  // const getProductData = async () => {
  //   await api
  //     .get("/v1/im/products/", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setProductData(res.data.data);
  //     });
  // };

  useEffect(() => {
    getLoggedIn();
    // getProductData();
  }, [navigate]);

  return isLoggedIn ? (
    <div className="App">
      <div className="home-page-container">
        <div className="navbar-container">
          <img src={logo} width="40" height="40" alt="" />
          <SideBar />
        </div>
        <div className="dropdown-home">
          <Dropdown selected={selected} setSelected={setSelectedOption} />
        </div>
        <Carousel products={filteredProducts} />
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
                            {...column.getHeaderProps()}
                          >
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
                    {rows.map((row, index) => {
                      prepareRow(row);
                      const qty = row.cells[1].value;
                      const price = row.cells[2].value;

                      if (qty !== 0 && price !== 0) {
                        return (
                          <tr {...row.getRowProps()} key={index}>
                            {row.cells.map((cell, index) => {
                              return (
                                <td
                                  className="table-body-cell-1"
                                  {...cell.getCellProps()}
                                  key={index}
                                >
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      }
                      return null;
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
