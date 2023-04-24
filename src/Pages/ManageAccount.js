import React, { useState } from 'react';
import logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';
import { user } from '../Components/data/userdata';
import { useTable } from 'react-table';
import { useMemo } from 'react';

function ManageAccount() {
  const [users, setUsers] = useState(user);
  const [keyword, setKeyword] = useState('');

  const filterUser = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filteredUser = keyword !== ''
      ? user.filter((user) => 
      user.name.toLowerCase().indexOf(keyword) > -1 ||
      user.email.toLocaleLowerCase().indexOf(keyword) > -1
      )
      : user;
    setUsers(filteredUser);
    setKeyword(keyword);
  };

  const data = useMemo(() => users, [users]);

  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Role',
      accessor: 'role',
    },
  ], []);

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div className='App'>
      <div className='manage-account-page-container'>
        <div className='navbar-super-admin-container'>
          <img src={logo} width='45' height='45' alt='' />
          <h1>
            <Link to='/' style={{ textDecoration: 'none', color: '#ff3333' }}>
              Sign Out
            </Link>
          </h1>
        </div>
        <div className='manage-account-title'>
          <h1>Manage Account</h1>
          </div>
          <div className='search-user-container'>
            <input
              type='text'
              value={keyword}
              onChange={filterUser}
              placeholder='Search'
              className='search-user'
            />
          </div>
          <div className='user-list-container'>
          {users.length === 0 ? (
            <p>No data available</p>
          ) : (
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th style={{padding: '10px'}}{...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td style={{padding: '10px'}}{...cell.getCellProps()}>
                        {cell.column.id === 'role' ? (
                          <select
                            className='select-role-option'
                            value={row.original.role}
                            onChange={event => {
                              const newRole = event.target.value;
                              setUsers(users.map(v => v.id === row.original.id ? { ...v, role: newRole } : v))
                            }}
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          cell.render('Cell')
                        )}
                      </td>
                    })}
                  </tr>
                )
              })}
              </tbody>
            </table>
            )}
            <button type="submit" className='btn-manage-acc'>Save</button>
          </div>
      </div>
    </div>
  )
}

export default ManageAccount;
