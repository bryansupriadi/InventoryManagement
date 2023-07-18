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

  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");

  const [keyword, setKeyword] = useState("");

  const filterUser = (e) => {
    const keyword = e.target.value.toLowerCase();
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
        Cell: ({ row, value }) => (
          <select
            className="select-role-option"
            name="role"
            value={value}
            onChange={(e) => {
              const newRole = e.target.value;
              setUsers(
                users.map((v) =>
                  v._id === row.original._id ? { ...v, role: newRole } : v
                )
              );

              setHasChanges(true);
            }}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // const handleChange = (row, key, selectedValue) => {
  //   const updatedData = [...users];
  //   updatedData[row.index][key] = selectedValue;
  //   setUsers(updatedData);
  // };

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
        console.log(res.data.msg);

        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err, err.message);
      });
  };

  // const handleChangeRole = (userId, newRole) => {
  //   const updatedUsers = users.map((user) =>
  //     user.id === userId ? { ...user, role: newRole } : user
  //   );
  //   setUsers(updatedUsers);
  //   setHasChanges(true);
  // };

  const handleSubmit = async (id) => {
    console.log(id);

    await api
      .patch(`/v1/im/users/${id}`, users, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);

        setSuccessMessage("Role has been successfully updated!");
        setShowPopupSuccess(true);
        setTimeout(() => {
          setShowPopupSuccess(false);
          setHasChanges(false);
        }, 3500);

        getUsers();
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
        .get("/v1/im/users/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          console.log(res.data.msg);

          setUsers(res.data.data);
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
  }, [navigate]);

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
                                {cell.render("Cell")}
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
              onClick={() => handleSubmit(users._id)}
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
