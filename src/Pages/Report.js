import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PieChart } from "react-minimal-pie-chart";

import SideBar from "../Components/SideBar";
import product from "../Components/data/product";
import DatePicker from "../Components/datepicker";

import api from "../api";

function Report() {
  // const navigate = useNavigate();

  // const token = localStorage.getItem("token");

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [reportData, setReportData] = useState([]);

  const totalQty = product.reduce((total, item) => total + item.Qty, 0);
  const totalPrice = product.reduce(
    (total, item) => total + parseInt(item.Price.slice(1)),
    0
  );
  const totalGood = product.reduce((total, item) => total + item.Good, 0);
  const totalBad = product.reduce((total, item) => total + item.Bad, 0);
  const percentGood = ((totalGood / totalQty) * 100).toFixed(2);
  const percentBad = ((totalBad / totalQty) * 100).toFixed(2);
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

  // const getLoggedIn = () => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsLoggedIn(true);
  //   } else {
  //     navigate("/sign-in");
  //   }
  // };

  // const getReportData = () => {
  //   api
  //     .get("/v1/im/products/report-data", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setReportData(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err, err.message);
  //     });
  // };

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
          <DatePicker />
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
