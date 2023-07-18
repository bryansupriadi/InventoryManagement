import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useTable } from "react-table";

import SideBar from "../Components/SideBar";

function VendorTable() {
  const { vendorSlug, categorySlug, subCategorySlug, productSlug } =
    useParams();

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [product, setProduct] = useState([]);

  const columns = useMemo(
    () => [
      { Header: "Date", accessor: "purchaseDate" },
      { Header: "Price", accessor: "eachPrice" },
      { Header: "Type", accessor: "typeProduct" },
      { Header: "Location", accessor: "location" },
      { Header: "Condition", accessor: "productCondition" },
    ],
    []
  );

  const tableData = useMemo(() => {
    const filteredProducts = product.filter((item) => {
      const subData = item || [];
      return (
        item.subCategory === subCategorySlug &&
        item.brandName === productSlug &&
        subData.some((subItem) => subItem.vendor === vendorSlug)
      );
    });

    const subData = filteredProducts.length > 0 ? filteredProducts : [];
    const vendorData = subData.filter(
      (subItem) => subItem.vendor === vendorSlug
    );

    return vendorData.map((item) => ({ ...item }));
  }, [subCategorySlug, productSlug, vendorSlug]);

  const handleRowClick = (id) => {
    navigate(
      `/vendor-list/${categorySlug}/:${subCategorySlug}/${productSlug}/:${id}`
    );
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });

  return (
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
                    onClick={() => handleRowClick(row.original)}
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
  );
}

export default VendorTable;
