import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2 className="footer-title">WheelzLoop</h2>
          <p>Your trusted marketplace for buying and selling used cars.</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <FaFacebookF
                onClick={() =>
                  (window.location.href =
                    "https://www.facebook.com/people/Wheelzloop-Wheelzloop/61565890412918/")
                }
              />
            </a>
            <a href="#" aria-label="Twitter">
              <XIcon
                onClick={() =>
                  (window.location.href = "https://x.com/WheelzLoop")
                }
              />
            </a>
            <a
              href="https://www.instagram.com/wheelz_loop/"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@wheelzloop" aria-label="YouTube/">
              <YouTubeIcon />
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h3 className="footer-subtitle">Quick Links</h3>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about-us">About Us</a>
            </li>
            <li>
              <a href="/cars">Cars</a>
            </li>
            <li>
              <a href="/favourites">Favourites</a>
            </li>
            <li>
              <a href="/sell-car">Sell a Car</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3 className="footer-subtitle">Contact Us</h3>
          <p>
            Email:{" "}
            <a
              href="mailto:info@wheelzloop.com"
              style={{ textDecoration: "none", color: "#111" }}
            >
              wheelzloop@gmail.com
            </a>
          </p>
          {/* <p>Phone: +1 (555) 123-4567</p> */}
        </div>
        {/* <div className="footer-section">
          <h3 className="footer-subtitle">Newsletter</h3>
          <p>Subscribe to get the latest updates:</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div> */}
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} WheelzLoop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
