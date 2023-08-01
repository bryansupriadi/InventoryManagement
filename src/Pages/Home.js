import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";

import { Icon } from "@iconify/react";
import logo from "../Assets/logo.png";

import SideBar from "../Components/SideBar";
import Carousel from "../Components/Carousel";
import Dropdown from "../Components/Dropdown";

import api from "../api";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [selected, setSelected] = useState("All time");

  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(product);

  const subtractYears = (date, years) => {
    date.setFullYear(date.getFullYear() - years);

    return date;
  };

  const COLUMNS = [
    {
      Header: "Name",
      accessor: "brandName",
    },
    {
      Header: "Qty",
      accessor: (row) => {
        const product = products.find(
          (item) => item.brandName === row.brandName
        );

        return product ? product.quantity : 0;
      },
    },
    {
      Header: "Price",
      accessor: (row) => {
        const product = products.find(
          (item) => item.brandName === row.brandName
        );

        let totalPrice = 0;
        if (product) {
          product.forEach((subItem) => {
            totalPrice += subItem.eachPrice;
          });
        }
        return totalPrice;
      },
    },
    {
      Header: "Group",
      accessor: "groupName",
    },
  ];

  const [products, setProducts] = useState(product);
  const [keyword, setKeyword] = useState("");
  const [columns, setColumns] = useState(COLUMNS);

  const filterProduct = (e) => {
    const keyword = e.target.value.toLowerCase();

    console.log(keyword);

    const filteredProduct = keyword
      ? products.filter(
          (product) =>
            product.brandName.toLowerCase().includes(keyword.toLowerCase()) ||
            product.groupName.toLowerCase().includes(keyword.toLowerCase())
        )
      : products;

    console.log(filteredProduct);

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
      console.log("last year");

      const date = new Date();

      const lastYear = subtractYears(date, 1);

      const filtered = product.filter((item) => {
        const itemDate = new Date(item.purchaseDate);
        return itemDate >= lastYear;
      });

      setFilteredProducts(filtered);
      setProducts(filtered);
    } else if (option === "Last 3 years") {
      console.log("last 3 year");

      const date = new Date();

      const last3Years = subtractYears(date, 3);

      const filtered = product.filter((item) => {
        const itemDate = new Date(item.purchaseDate);
        return itemDate >= last3Years;
      });

      setFilteredProducts(filtered);
      setProducts(filtered);
    } else if (option === "Last 5 years") {
      console.log("last 5 year");
      const date = new Date();

      const last5Years = subtractYears(date, 5);

      const filtered = product.filter((item) => {
        const itemDate = new Date(item.purchaseDate);
        return itemDate >= last5Years;
      });

      setFilteredProducts(filtered);
    } else if (option === "All time") {
      setFilteredProducts(product);
      setProducts(product);
    }
  };

  const getLoggedIn = () => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getProductData = async () => {
    await api
      .get("/v1/im/products/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    document.title = "Inventory Management - Home";

    getLoggedIn();
    getProductData();

    const updatedColumns = [...columns];

    updatedColumns[1].accessor = (row) => {
      const product = filteredProducts.find(
        (item) => item.brandName === row.brandName
      );

      return product ? product.quantity : 0;
    };

    updatedColumns[2].accessor = (row) => {
      const product = filteredProducts.find(
        (item) => item.brandName === row.brandName
      );

      let totalPrice = 0;

      if (product) {
        totalPrice += row.eachPrice;
      }
      return totalPrice;
    };

    setColumns(updatedColumns);
  }, [filteredProducts, navigate]);

  const data = useMemo(() => filteredProducts, [filteredProducts]);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

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
          {filteredProducts.length === 0 ? (
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
                      const quantity = row.cells[1].value;
                      const eachPrice = row.cells[2].value;

                      if (quantity !== 0 && eachPrice !== 0) {
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
    navigate("/sign-in")
  );
};

export default Home;
