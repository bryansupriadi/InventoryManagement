import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTable } from "react-table";

import logo from "../Assets/logo.png";

import api from "../api";

const ManageAccount = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [hasChanges, setHasChanges] = useState(false);
  const [showPopupSuccess, setShowPopupSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState([]);
  const [users, setUsers] = useState(user);
  const [filteredUsers, setFilteredUsers] = useState(user);

  const [keyword, setKeyword] = useState("");

  const data = useMemo(() => filteredUsers, [filteredUsers]);

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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const filterUser = (e) => {
    const keyword = e.target.value.toLowerCase();

    console.log(keyword);

    const filteredUser = keyword
      ? users.filter(
          (user) =>
            user.username.toLocaleLowerCase().includes(keyword.toLowerCase()) ||
            user.emailAddress
              .toLocaleLowerCase()
              .includes(keyword.toLowerCase())
        )
      : users;

    console.log(filteredUser);

    setFilteredUsers(filteredUser);
    setKeyword(keyword);

    if (keyword === "") {
      setFilteredUsers(user);
      setUsers(user);
    }
  };

  const handleRowClick = (user, e) => {
    if (e.target.tagName !== "SELECT") {
      navigate(`/manage-account/${user._id}`);
    }
  };

  const handleSignOut = async () => {
    await api
      .get("/v1/im/users/signOut")
      .then((res) => {
        console.log(res.data);

        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  const handleChange = (e, id) => {
    const newRole = e.target.value;

    handleChangeRole(id, newRole);

    setUsers(users.map((v) => (v._id === id ? { ...v, role: newRole } : v)));
  };

  const handleChangeRole = (id, newRole) => {
    const updatedUsers = users.map((user) =>
      user._id === id ? { ...user, role: newRole } : user
    );

    setUsers(updatedUsers);
    setHasChanges(true);
  };

  const handleSubmit = async (id, newRole) => {
    await api
      .patch(
        `/v1/im/users/${id}`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);

        setSuccessMessage("Role has been successfully updated!");
        setShowPopupSuccess(true);
        setTimeout(() => {
          setShowPopupSuccess(false);
          setHasChanges(false);

          getUsers();
        }, 3500);
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  const getLoggedIn = () => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/sign-in");
    }
  };

  const getUsers = async () => {
    if (token) {
      await api
        .get("/v1/im/users?role=Admin", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);

          setUser(res.data.data);
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    }
  };

  useEffect(() => {
    document.title = "Inventory Management - Account Management";

    getLoggedIn();
    getUsers();
  }, [filteredUsers, navigate]);

  const Popup = ({ message }) => {
    return (
      <div className="popup-success">
        <div className="popup-success-content">
          <div className="popup-success-message">{message}</div>
        </div>
      </div>
    );
  };

  return isLoggedIn ? (
    <div className="App">
      <div className="manage-account-page-container">
        <div className="navbar-super-admin-container">
          <img src={logo} width="40" height="40" alt="" />
          <h1>
            <Link
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
                        <tr
                          {...row.getRowProps()}
                          onClick={(e) => handleRowClick(row.original, e)}
                        >
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
                                    name="role"
                                    value={row.original.role}
                                    onChange={(e) =>
                                      handleChange(e, row.original._id)
                                    }
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
          {hasChanges && (
            <button
              type="submit"
              className="btn-manage-acc"
              onClick={() =>
                rows.forEach((row) => {
                  handleSubmit(row.original._id, row.original.role);
                })
              }
            >
              Save
            </button>
          )}
        </div>
        {showPopupSuccess && <Popup message={successMessage} />}
      </div>
    </div>
  ) : (
    navigate("/sign-in")
  );
};

export default ManageAccount;
