import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { username, logout, isLoggedIn } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const goToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/" style={{ textDecoration: "none", color: "#DE3163" }}>
          Wheelzloop
        </a>
      </div>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="/">Home</a>
        <a href="/about-us">About Us</a>
        <a href="/used-cars">Explore Cars</a>
        {!isLoggedIn && <a href="/cars/saved">Favourites</a>}
        <a href="/reviews">Reviews</a>
        <a href="/blogs">Blogs</a>
        <a href="/contact-us">Contact Us</a>
        {isLoggedIn && username ? (
          <div className="dropdown">
            <button
              className="btn dropdown-toggle login-btn"
              onClick={toggleDropdown}
            >
              {username}
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <a className="dropdown-item" href="/profile">
                  My Profile
                </a>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => {
                    logout();
                    closeDropdown();
                    window.location.reload();
                  }}
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={goToLogin}>
            Login
          </button>
        )}
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? (
          <span className="close-icon">✕</span>
        ) : (
          <span className="menu-icon">☰</span>
        )}
      </div>
      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </header>
  );
}

export default Header;
