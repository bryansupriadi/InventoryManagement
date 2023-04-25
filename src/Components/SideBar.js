import { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import add from "../Assets/icon/shipping.png";
import vendor from "../Assets/icon/market-store (1).png";
import scan from "../Assets/icon/scanner.png";
import group from "../Assets/icon/category.png";
import report from "../Assets/icon/line-chart.png";
import logout from "../Assets/icon/logout.png";

import axios from "axios";

const SideBar = () => {
  const [userData, setUserData] = useState({
    username: "",
    role: "",
  });

  const getUserData = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      await axios
        .get("http://localhost:5000/v1/im/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);

          const { data } = res.data;

          setUserData({
            username: data.username,
            role: data.role,
          });

          console.log(res.data.msg);
        })
        .catch((err) => {
          console.log(err, err.message);
        });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              style={{ border: "none", marginTop: "20px" }}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              style={{ width: "75%" }}
              className="sidebar"
            >
              <Offcanvas.Header>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                  className="sidebar-title"
                >
                  <div className="username">{userData.username}</div>
                  <div className="role">{userData.role}</div>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body style={{ borderTop: "3px solid #000" }}>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link
                    href="/add-product"
                    className="text-white"
                    style={{ borderBottom: "1px solid #000" }}
                  >
                    <img src={add} alt="" className="me-2" />
                    Add Products
                  </Nav.Link>
                  <Nav.Link
                    href="/vendor-list"
                    className="text-white"
                    style={{ borderBottom: "1px solid #000" }}
                  >
                    <img src={vendor} alt="" className="me-2" />
                    Vendor List
                  </Nav.Link>
                  <Nav.Link
                    href="/scanner"
                    className="text-white"
                    style={{ borderBottom: "1px solid #000" }}
                  >
                    <img src={scan} alt="" className="me-2" />
                    Scan QR Code
                  </Nav.Link>
                  <NavDropdown
                    title={
                      <>
                        <img src={group} alt="" className="me-2" />
                        Groups
                      </>
                    }
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    style={{ borderBottom: "1px solid #000" }}
                    className="text-white"
                  >
                    <NavDropdown.Item href="/active-group">
                      Active
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/passive-group">
                      Passive
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link
                    href="/reports"
                    className="text-white"
                    style={{ borderBottom: "1px solid #000" }}
                  >
                    <img src={report} alt="" className="me-2" />
                    Reports
                  </Nav.Link>
                  <Nav.Link href="/manage-account" className="text-white">
                    <img src={logout} alt="" className="me-2" />
                    Log out
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default SideBar;
