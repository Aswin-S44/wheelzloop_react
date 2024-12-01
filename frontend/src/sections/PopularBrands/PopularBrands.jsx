import React from "react";
import "./PopularBrands.css";
import {
  AUDI_LOGO,
  BMW_LOGO,
  FORD_LOGO,
  HONDA_LOGO,
  MERCEDES_LOGO,
  TOYOTA_LOGO,
} from "../../constants/imageUrls";

function PopularBrands() {
  return (
    <div className="popular-brands-container">
      <h1 className="title">Popular Brands</h1>
      <div className="brands-grid">
        <div className="brand-card">
          <img src={TOYOTA_LOGO} alt="Toyota" className="brand-logo" />
        </div>
        <div className="brand-card">
          <img src={HONDA_LOGO} alt="Honda" className="brand-logo" />
        </div>
        <div className="brand-card">
          <img src={FORD_LOGO} alt="Ford" className="brand-logo" />
        </div>
        <div className="brand-card">
          <img src={BMW_LOGO} alt="BMW" className="brand-logo" />
        </div>
        <div className="brand-card">
          <img src={MERCEDES_LOGO} alt="Mercedes" className="brand-logo" />
        </div>
        <div className="brand-card">
          <img src={AUDI_LOGO} alt="Audi" className="brand-logo" />
        </div>
      </div>
    </div>
  );
}

export default PopularBrands;
