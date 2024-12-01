import React, { useState } from "react";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
        <button className="login-btn">Login</button>
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
