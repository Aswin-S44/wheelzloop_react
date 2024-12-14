import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { username, logout, isLoggedIn, currentUser } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
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
        {console.log("is loggedin------", isLoggedIn)}
        {!isLoggedIn && <a href="/cars/saved">Favourites</a>}

        <a href="/reviews">Reviews</a>
        <a href="/blogs">Blogs</a>
        <a href="/contact-us">Contact Us</a>
        {isLoggedIn && username ? (
          <div className="dropdown">
            <button
              className="btn dropdown-toggle login-btn"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {username}
            </button>
            {/* <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="/profile">
                My Profile
              </a>
              <a className="dropdown-item" href="#" onClick={logout}>
                Logout
              </a>
            </div> */}
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
