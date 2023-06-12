import React, { useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTable } from "react-table";

import product from "../Components/data/product";
import SideBar from "../Components/SideBar";
import FloatingActionDetail from "../Components/FloatingAction/FloatingActionDetail";

function ProductBrandsDetail() {
  const {
    group,
    item,
    subCategory: urlSubCategory,
    brandName: urlBrandName,
  } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // Filter product array based on subCategory and brandName
  const tableData = useMemo(() => {
    // Filter product array based on subCategory and brandName
    const filteredProducts = product.filter(
      (item) =>
        item["Sub Category"] === urlSubCategory &&
        item["Brand Name"] === urlBrandName
    );

    // Mengubah struktur sub data menjadi array objek yang sesuai dengan format tabel
    const subData =
      filteredProducts.length > 0 ? filteredProducts[0]["Sub Data"] : [];

    return subData.map((item) => ({ ...item }));
  }, [urlSubCategory, urlBrandName]);

  const handleRowClick = (product) => {
    navigate(`${location.pathname}/${product["Product Id"]}`);
  };

  // Kolom-kolom tabel
  const columns = useMemo(() => [
    { Header: "Date", accessor: "Date" },
    { Header: "Price", accessor: "Price" },
    { Header: "Type", accessor: "Type" },
    { Header: "Vendor", accessor: "Vendor" },
    { Header: "Location", accessor: "Location" },
    { Header: "Condition", accessor: "Condition" },
  ]);

  // Create an instance of React Table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });

  return (
    <div className="App">
      <div className="product-brands-detail-container">
        <div className="navbar-container">
          <h1>{urlSubCategory}</h1>
          <SideBar />
        </div>
        <div className="sub-title-product">
          <h3>{urlBrandName}</h3>
        </div>
        <div className="product-detail-table-container">
          <table {...getTableProps()} className="product-table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, index) => (
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
      <div className="fab-btn-1">
        <FloatingActionDetail
          group={group}
          item={item}
          subCategory={urlSubCategory}
          brandName={urlBrandName}
        />
      </div>
    </div>
  );
}

export default ProductBrandsDetail;
