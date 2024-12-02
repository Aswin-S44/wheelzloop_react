import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { username, logout, isLoggedIn } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/" style={{ textDecoration: "none", color: "#21cb98" }}>
          Wheelz<span style={{ color: "#111" }}>Loop</span>
        </a>
      </div>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="/">Home</a>
        <a href="/about-us">About Us</a>
        <a href="/used-cars">Explore Cars</a>
        <a href="/reviews">Reviews</a>
        <a href="#contact-us">Contact Us</a>
        {isLoggedIn ? (
          <>
            <div class="dropdown">
              <button
                class="btn dropdown-toggle login-btn"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {username}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="/profile">
                  My Profile
                </a>
                <a class="dropdown-item" href="#">
                  Logout
                </a>
              </div>
            </div>
          </>
        ) : (
          <button className="login-btn" onClick={goToLogin}>
            Login
          </button>
        )}
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
      {menuOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </header>
  );
}

export default Header;
