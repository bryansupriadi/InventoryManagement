import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import logo from "../Assets/logo.png";

// import { user } from "../Components/data/userdata";

import api from "../api";

const ManageAccount = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [users, setUsers] = useState([]);
  // const [users, setUsers] = useState(user);
  const [keyword, setKeyword] = useState("");

  const filterUser = (event) => {
    const keyword = event.target.value.toLowerCase();
    const filteredUser =
      keyword !== ""
        ? users.filter(
            (userData) =>
              userData.username.toLowerCase().indexOf(keyword) > -1 ||
              userData.emailAddress.toLocaleLowerCase().indexOf(keyword) > -1
          )
        : users;
    setUsers(filteredUser);
    setKeyword(keyword);
  };

  const data = useMemo(() => users, [users]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "userId",
      },
      {
        Header: "Name",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "emailAddress",
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

  const handleSignOut = async () => {
    await api
      .get("/v1/im/users/signOut")
      .then((res) => {
        console.log(res.data);
        console.log(res.data.msg);

        localStorage.removeItem("token");

        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  const handleSubmit = async (id) => {
    console.log(id);

    // await api
    //   .patch(
    //     `/v1/im/users/${id}`,
    //     { role: users.role },
    //     { headers: { Authorization: `Bearer ${token}` } }
    //   )
    //   .then((res) => {
    //     console.log(res.data);

    //     navigate("/manage-account");
    //   })
    //   .catch((err) => {
    //     console.log(err, err.message);
    //   });
  };

  const getLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getUsers = async () => {
    if (token) {
      await api
        .get("/v1/im/users/", {
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
    getUsers();
  }, [navigate]);

  return isLoggedIn ? (
    <div className="App">
      <div className="manage-account-page-container">
        <div className="navbar-super-admin-container">
          <img src={logo} width="45" height="45" alt="" />
          <h1>
            <Link
              // to="/sign-in"
              onClick={handleSignOut}
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
                        <tr {...row.getRowProps()}>
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

                                    // onChange={(event) => {
                                    //   const newRole = event.target.value;
                                    //   setUserData(
                                    //     userData.map((v) =>
                                    //       v.id === row.original.id
                                    //         ? { ...v, role: newRole }
                                    //         : v
                                    //     )
                                    //   );
                                    // }}
                                  >
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
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
          <button
            type="submit"
            className="btn-manage-acc"
            onClick={() => handleSubmit(users._id)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
};

export default ManageAccount;
