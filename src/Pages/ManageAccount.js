import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { useMemo } from "react";
import logo from "../Assets/logo.png";
import { user } from "../Components/data/userdata";
import axios from "axios";

const ManageAccount = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState(user);
  const [keyword, setKeyword] = useState("");
  const location = useLocation();

  const filterUser = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filteredUser =
      keyword !== ""
        ? user.filter(
            (user) =>
              user.name.toLowerCase().indexOf(keyword) > -1 ||
              user.email.toLowerCase().indexOf(keyword) > -1
          )
        : user;
    setUsers(filteredUser);
    setKeyword(keyword);
  };

  const data = useMemo(() => users, [users]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

    const handleRowClick = (user, event) => {
      if (event.target.tagName !== 'SELECT') {
        navigate(`${location.pathname}/${user['id']}`);
      }
    }
    

  const handleSignOut = async () => {
    await axios
      .get("http://localhost:5000/v1/im/users/signOut")
      .then((res) => {
        console.log(res.data);
        console.log(res.data.msg);

        localStorage.removeItem("token");

        navigate("/");
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  const getLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/");
    }
  };

  const getUsers = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      await axios
        .get("http://localhost:5000/v1/im/users/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          console.log(res.data.msg);

          setUsers(res.data.data);
        });
    }
  };

  useEffect(() => {
    getLoggedIn();
    // getUsers();
  }, [navigate]);

  return isLoggedIn ? (
    <div className="App">
      <div className="manage-account-page-container">
        <div className="navbar-super-admin-container">
          <img src={logo} width="40" height="40" alt="" />
          <h1>
            <Link
              to="/"
              // onClick={handleSignOut}
              style={{ textDecoration: "none", color: "#ff3333" }}
            >
              Sign Out
            </Link>
          </h1>
        </div>
        <div className="manage-account-title">
          <h1>Manage Account</h1>
        </div>
        <div className="search-user-container">
          <input
            type="text"
            value={keyword}
            onChange={filterUser}
            placeholder="Search"
            className="search-user"
          />
        </div>
        <div className="user-list-container">
          {users.length === 0 ? (
            <p>No data available</p>
          ) : (
            <div className="scroll-table">
            <div className="table-header">
            <table {...getTableProps()}>
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
              </table>
              </div>
              <div className="table-body">
              <table>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr 
                    {...row.getRowProps()}
                    onClick={(event) => handleRowClick(row.original, event)}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            style={{ padding: "10px" }}
                            className="table-body-cell"
                            {...cell.getCellProps()}
                          >
                            {cell.column.id === "role" ? (
                              <select
                                className="select-role-option"
                                value={row.original.role}
                                onChange={(event) => {
                                  const newRole = event.target.value;
                                  setUsers(
                                    users.map((v) =>
                                      v.id === row.original.id
                                        ? { ...v, role: newRole }
                                        : v
                                    )
                                  );
                                }}
                              >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                              </select>
                            ) : (
                              cell.render("Cell")
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
            </div>
          )}
        <button type="submit" className="btn-manage-acc">
          Save
        </button>
        </div>
      </div>
    </div>
  ) : (
    navigate("/")
  );
};

export default ManageAccount;
