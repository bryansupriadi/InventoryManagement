import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";

import SideBar from "../Components/SideBar";
import DropdownReport from "../Components/DropdownReport";

import api from "../api";

function Report() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [product, setProduct] = useState([]);

  const [selected, setSelected] = useState("All time");
  const [filteredProducts, setFilteredProducts] = useState(product);

  const subtractYears = (date, years) => {
    date.setFullYear(date.getFullYear() - years);

    return date;
  };

  const setSelectedOption = (option) => {
    setSelected(option);
    let filtered = [];

    if (option === "Last year") {
      const date = new Date();

      const lastYear = subtractYears(date, 1);

      filtered = product.filter((item) => {
        const itemDate = new Date(item.purchaseDate);
        return itemDate >= lastYear;
      });
    } else if (option === "Last 3 years") {
      const date = new Date();

      const last3Year = subtractYears(date, 3);

      filtered = product.filter((item) => {
        const itemDate = new Date(item.purchaseDate);
        return itemDate >= last3Year;
      });
    } else if (option === "Last 5 years") {
      const date = new Date();

      const last5Year = subtractYears(date, 5);

      filtered = product.filter((item) => {
        const itemDate = new Date(item.purchaseDate);
        return itemDate >= last5Year;
      });
    } else if (option === "All time") {
      filtered = product;
    }

    setFilteredProducts(filtered);
  };

  const totalQty = filteredProducts.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = filteredProducts.reduce(
    (total, item) => total + parseInt(item.eachPrice),
    0
  );

  const totalGood = filteredProducts.reduce(
    (total, item) => total + item.conditionGood,
    0
  );

  const totalBad = filteredProducts.reduce(
    (total, item) => total + item.conditionBad,
    0
  );

  const percentGood = ((totalGood / totalQty) * 100).toFixed(2);

  const percentBad = ((totalBad / totalQty) * 100).toFixed(2);

  const pieData = [
    {
      title: "Good",
      value: totalGood,
      color: "#3456D0",
    },
    {
      title: "Bad",
      value: totalBad,
      color: "#2C428D",
    },
  ];

  const getLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getProduct = () => {
    api
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
    document.title = "Inventory Management - Report";

    getLoggedIn();
    getProduct();
  }, []);

  return isLoggedIn ? (
    <div className="App">
      <div className="report-page-container">
        <div className="navbar-container">
          <h1>Report</h1>
          <SideBar />
        </div>
        <div>
          <DropdownReport selected={selected} setSelected={setSelectedOption} />
        </div>
        <div className="content-box-container">
          <div className="box-content-1">
            <h3>Total Quantity</h3>
            <p>{totalQty}</p>
          </div>
          <div className="box-content-2">
            <h3>Total Price</h3>
            <p>${totalPrice}</p>
          </div>
        </div>
        <div className="box-content-3">
          <h3>Condition</h3>
          <div className="condition-table">
            <div className="condition-good-table">
              <h4>Good</h4>
              <p>
                {totalGood} ({percentGood}%)
              </p>
            </div>
            <div className="condition-divider"></div>
            <div className="condition-bad-table">
              <h4>Bad</h4>
              <p>
                {totalBad} ({percentBad}%)
              </p>
            </div>
          </div>
        </div>
        <div className="chart-container">
          <PieChart
            className="pie-chart"
            data={pieData}
            lengthAngle={360}
            label={({ dataEntry }) => {
              const percent =
                totalQty > 0
                  ? ((dataEntry.value / totalQty) * 100).toFixed(2)
                  : 0;
              return `${dataEntry.title} (${percent}%)`;
            }}
            labelPosition={50}
            labelStyle={{
              fontSize: "4px",
              fontWeight: "800",
            }}
          />
        </div>
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
}

export default Report;
