import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart } from "react-minimal-pie-chart";

import SideBar from "../Components/SideBar";
import DropdownReport from "../Components/DropdownReport";
import product from "../Components/data/product";

import api from "../api";

function Report() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [reportData, setReportData] = useState([]);

  const [selected, setSelected] = useState("All time");
  const [filteredProducts, setFilteredProducts] = useState(product);

  const setSelectedOption = (option) => {
    setSelected(option);
    if (option === "Last year") {
      const lastYear = new Date();
      lastYear.setFullYear(lastYear.getFullYear() - 1);
      const filtered = product.filter((item) => {
        const date = new Date(item["Sub Data"][0].Date);
        return date >= lastYear;
      });
      setFilteredProducts(filtered);
    } else if (option === "Last 3 years") {
      const last3Years = new Date();
      last3Years.setFullYear(last3Years.getFullYear() - 3);
      const filtered = product.filter((item) => {
        const date = new Date(item["Sub Data"][0].Date);
        return date >= last3Years;
      });
      setFilteredProducts(filtered);
    } else if (option === "Last 5 years") {
      const last5Years = new Date();
      last5Years.setFullYear(last5Years.getFullYear() - 6);
      const filtered = product.filter((item) => {
        const date = new Date(item["Sub Data"][0].Date);
        return date >= last5Years;
      });
      setFilteredProducts(filtered);
    } else if (option === "Last 10 years") {
      const last10Years = new Date();
      last10Years.setFullYear(last10Years.getFullYear() - 10);
      const filtered = product.filter((item) => {
        const date = new Date(item["Sub Data"][0].Date);
        return date >= last10Years;
      });
      setFilteredProducts(filtered);
    } else if (option === "All time") {
      setFilteredProducts(product);
    }
  };

  const totalQty = filteredProducts.reduce(
    (total, item) => total + item.Qty,
    0
  );
  const totalPrice = filteredProducts.reduce(
    (total, item) => total + parseInt(item["Total Price"].slice(1)),
    0
  );
  const totalGood = filteredProducts.reduce(
    (total, item) => total + item.Good,
    0
  );
  const totalBad = filteredProducts.reduce(
    (total, item) => total + item.Bad,
    0
  );
  const filteredCount = filteredProducts.length;
  const percentGood = ((totalGood / filteredCount) * 100).toFixed(2);
  const percentBad = ((totalBad / filteredCount) * 100).toFixed(2);
  const data = [
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

  const getReportData = () => {
    api
      .get("/v1/im/products/report-data", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setReportData(res.data.data);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  useEffect(() => {
    // getLoggedIn();
    // getReportData();
  }, []);

  return (
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
            data={data}
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
  );
}

export default Report;
