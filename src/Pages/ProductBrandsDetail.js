import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useTable } from "react-table";

import SideBar from "../Components/SideBar";
import FloatingActionDetail from "../Components/FloatingAction/FloatingActionDetail";

import api from "../api";

function ProductBrandsDetail() {
  const navigate = useNavigate();
  const { groupSlug, categorySlug, subCategorySlug, productSlug } = useParams();

  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [product, setProduct] = useState([]);

  // Kolom-kolom tabel
  const columns = useMemo(() => [
    { Header: "Date", accessor: "purchaseDateProductType" },
    { Header: "Price", accessor: "eachPriceProductType" },
    { Header: "Type", accessor: "type" },
    { Header: "Vendor", accessor: "vendorName" },
    { Header: "Location", accessor: "currentLocationProductType" },
    { Header: "Condition", accessor: "productTypeCondition" },
  ]);

  // Filter product array based on subCategory and brandName
  // const tableData = useMemo(() => {
  //   const filteredProducts = product.filter(
  //     (item) =>
  //       item.subCategorySlug === subCategorySlug &&
  //       item.productSlug === productSlug
  //   );

  //   const subData = filteredProducts.length > 0 ? filteredProducts : [];

  //   return subData.map((item) => ({ ...item }));
  // }, [subCategorySlug, productSlug]);

  const handleRowClick = (id) => {
    navigate(
      `/${groupSlug}-category/${categorySlug}/${subCategorySlug}/${productSlug}/${id}`
    );
  };

  // Create an instance of React Table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: product,
    });

  const getLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  // get product detail
  const getProductDetail = async () => {
    await api
      .get(`/v1/im/productTypes/`, {
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
    document.title = "Inventory Management - Product Brand Detail";

    getLoggedIn();
    getProductDetail();
  }, [navigate, groupSlug, categorySlug, subCategorySlug, productSlug]);

  return isLoggedIn ? (
    <div className="App">
      <div className="product-brands-detail-container">
        <div className="navbar-container">
          <h1>{subCategorySlug}</h1>
          <SideBar />
        </div>
        <div className="sub-title-product">
          <h3>{productSlug}</h3>
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
          group={groupSlug}
          category={categorySlug}
          subCategory={subCategorySlug}
          product={productSlug}
        />
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
}

export default ProductBrandsDetail;
