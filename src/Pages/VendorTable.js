import React, { useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import SideBar from '../Components/SideBar';
import product from '../Components/data/product';
import { useTable } from 'react-table';

function VendorTable() {
  const { name: urlVendor, subCategory: urlSubCategory, brandName: urlBrandName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const tableData = useMemo(() => {
    const filteredProducts = product.filter((item) => {
      const subData = item['Sub Data'] || [];
      return (
        item['Sub Category'] === urlSubCategory &&
        item['Brand Name'] === urlBrandName &&
        subData.some((subItem) => subItem['Vendor'] === urlVendor)
      );
    });

    const subData = filteredProducts.length > 0 ? filteredProducts[0]['Sub Data'] : [];
    const vendorData = subData.filter((subItem) => subItem['Vendor'] === urlVendor);

    return vendorData.map((item) => ({ ...item }));
  }, [urlSubCategory, urlBrandName, urlVendor]);

    const handleRowClick = (product) => {
    navigate(`${location.pathname}/${product['Product Id']}`);
  };

  const columns = useMemo(
    () => [
      { Header: 'Date', accessor: 'Date' },
      { Header: 'Price', accessor: 'Price' },
      { Header: 'Type', accessor: 'Type' },
      { Header: 'Location', accessor: 'Location' },
      { Header: 'Condition', accessor: 'Condition' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: tableData });

  return (
    <div className='App'>
      <div className='vendor-table-page-container'>
        <div className='navbar-container'>
          <h1>{urlVendor}</h1>
          <SideBar />
        </div>
        <div className='sub-title-product-1'>
          <h3>{urlSubCategory}</h3>
          <h3>{urlBrandName}</h3>
        </div>
        <div className='product-detail-table-container'>
          <table {...getTableProps()} className='product-table'>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      style={{ padding: '10px' }}
                      className='table-header-cell'
                      {...column.getHeaderProps()}
                    >
                      {column.render('Header')}
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
                    style={{ cursor: 'pointer' }}
                  >
                    {row.cells.map((cell) => (
                      <td
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        className='table-body-cell'
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
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
