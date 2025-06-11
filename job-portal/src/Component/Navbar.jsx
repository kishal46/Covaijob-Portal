import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import logo from "../Images/Untitled-1.png";
import "../CSS/Navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleToggleClick = () => setIsMenuOpen(!isMenuOpen);
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setShowLogoutModal(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDashboardClick = () => {
    setShowDropdown(false);
    navigate("/dashboard");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4 m-2">
        <Link className="navbar-brand" to="/" onClick={handleLinkClick}>
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={handleToggleClick}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <Link className="nav-link" to="/staff-augmentation" onClick={handleLinkClick}>
              Staff Augmentation
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/finddev" onClick={handleLinkClick}>
                Find Dev
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/currentjobs" onClick={handleLinkClick}>
                Current Job
              </Link>
            </li>
            {user && user.userName === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/postjob" onClick={handleLinkClick}>
                  Post Jobs
                </Link>
              </li>
            )}
            <li className="nav-item d-none d-lg-block">
              <Link
                className="btn btn-primary text-white px-3"
                to="/hiredev"
                onClick={handleLinkClick}
              >
                Hire Dev
              </Link>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded={showDropdown ? "true" : "false"}
                onClick={handleProfileClick}
              >
                <i className="bi bi-person-circle fs-5"></i>
                <span className="d-none d-sm-inline">{user ? user.userName : "Profile"}</span>
              </span>
              <ul className={`dropdown-menu dropdown-menu-end ${showDropdown ? "show" : ""}`} aria-labelledby="navbarDropdown">
                {user ? (
                  <>
                    <li>
                      <span className="dropdown-item" onClick={handleDashboardClick}>
                        Dashboard
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link className="dropdown-item" to="/login" onClick={handleLinkClick}>
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/signup" onClick={handleLinkClick}>
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={handleLinkClick}>
                Contact Us
              </Link>
              </li>
          </ul>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
