import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useTable } from "react-table";

import SideBar from "../Components/SideBar";

import api from "../api";

function VendorTable() {
  const { vendorSlug, subCategorySlug, productSlug } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [product, setProduct] = useState([]);

  const columns = useMemo(
    () => [
      { Header: "Date", accessor: "purchaseDate" },
      { Header: "Price", accessor: "eachPrice" },
      { Header: "Type", accessor: "typeProductName" },
      { Header: "Location", accessor: "currentLocation" },
      { Header: "Condition", accessor: "productCondition" },
    ],
    []
  );

  // const tableData = useMemo(() => {
  //   const filteredProducts = product.filter((item) => {
  //     const subData = item || [];
  //     return (
  //       item.subCategorySlug === subCategorySlug &&
  //       item.productSlug === productSlug &&
  //       subData.some((subItem) => subItem.vendorSlug === vendorSlug)
  //     );
  //   });

  //   const subData = filteredProducts.length > 0 ? filteredProducts : [];

  //   const vendorData = subData.filter(
  //     (subItem) => subItem.vendorSlug === vendorSlug
  //   );

  //   return vendorData.map((item) => ({ ...item }));
  // }, [subCategorySlug, productSlug, vendorSlug]);

  const handleRowClick = (id) => {
    navigate(
      `/vendor-list/${product.categorySlug}/${subCategorySlug}/${productSlug}/${id}`
    );
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: product });

  const getLoggedIn = () => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getAllProducts = async () => {
    await api
      .get(`/v1/im/products?vendor.vendorSlug=${vendorSlug}`, {
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
    document.title = "Inventory Management - Vendor Table";

    getLoggedIn();
    getAllProducts();
  }, [navigate, vendorSlug, subCategorySlug, productSlug]);

  return isLoggedIn ? (
    <div className="App">
      <div className="vendor-table-page-container">
        <div className="navbar-container">
          <h1>{vendorSlug}</h1>
          <SideBar />
        </div>
        <div className="sub-title-product-1">
          <h3>{subCategorySlug}</h3>
          <h3>{productSlug}</h3>
        </div>
        <div className="product-detail-table-container">
          <table {...getTableProps()} className="product-table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      style={{ padding: "10px" }}
                      className="table-header-cell"
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    onClick={() => handleRowClick(row.original._id)}
                    style={{ cursor: "pointer" }}
                  >
                    {row.cells.map((cell) => (
                      <td
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        className="table-body-cell"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
}

export default VendorTable;
