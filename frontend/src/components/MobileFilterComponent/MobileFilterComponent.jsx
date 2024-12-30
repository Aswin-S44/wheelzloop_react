import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MobileFilterComponent.css";
import { BACKEND_URL } from "../../constants/urls";
import { Modal, Button } from "react-bootstrap"; // Using Bootstrap modal for mobile view
import TuneIcon from "@mui/icons-material/Tune";

function MobileFilterComponent({ onFilterChange }) {
  const [priceMin, setPriceMin] = useState(5000);
  const [priceMax, setPriceMax] = useState(2000000);
  const [brandSearch, setBrandSearch] = useState("");
  const [selectedFuel, setSelectedFuel] = useState([]);
  const [selectedTransmission, setSelectedTransmission] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedModels, setSelectedModels] = useState([]);
  const [kilometer, setKilometer] = useState(200000);
  const [nameSearch, setNameSearch] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal state for mobile filter

  const yearLevel = [
    { key: "1901 - 2000", value: "Below 2000" },
    { key: "2001 - 2009", value: "2001 - 2009" },
    { key: "2010 - 2020", value: "2010 - 2020" },
    { key: "2021 - 2099", value: "Above 2021" },
  ];

  const transmissionTypes = [
    { key: "Manual Automatic", name: "All", isChecked: true },
    { key: "Manual", name: "Manual", isChecked: false },
    { key: "Automatic", name: "Automatic", isChecked: false },
  ];

  const handleFuelChange = (event) => {
    const value = event.target.value;
    setSelectedFuel(
      selectedFuel.includes(value)
        ? selectedFuel.filter((fuel) => fuel !== value)
        : [...selectedFuel, value]
    );
  };

  const handleTransmissionChange = (event) => {
    const value = event.target.value;
    setSelectedTransmission(
      selectedTransmission.includes(value)
        ? selectedTransmission.filter((trans) => trans !== value)
        : [...selectedTransmission, value]
    );
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleApplyFilter = () => {
    const filters = {
      priceMin,
      priceMax,
      brand: brandSearch,
      fuelType: selectedFuel.join(","),
      transmission: selectedTransmission.join(","),
      year: selectedYear,
      models: JSON.stringify(selectedModels),
      kilometer,
      name: nameSearch,
    };
    onFilterChange(filters);
    setShowModal(false); // Close the modal after applying the filters
  };

  const resetFilters = () => {
    setPriceMin(5000);
    setPriceMax(2000000);
    setBrandSearch("");
    setSelectedFuel([]);
    setSelectedTransmission([]);
    setSelectedYear("");
    setKilometer(200000);
    setNameSearch("");
  };

  return (
    <div className="mobile-filter-container">
      <button onClick={() => setShowModal(true)} className="primary">
        Filter
        <TuneIcon />
      </button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="filter-item">
            <label>Price Range</label>
            <div className="price-range-container">
              <input
                type="range"
                min="0"
                max="5000000"
                value={priceMin}
                onChange={(e) =>
                  setPriceMin(Math.min(e.target.value, priceMax))
                }
                className="price-slider"
              />
              <input
                type="range"
                min="0"
                max="5000000"
                value={priceMax}
                onChange={(e) =>
                  setPriceMax(Math.max(e.target.value, priceMin))
                }
                className="price-slider"
              />
            </div>
            <div className="price-range">
              <span>{`₹${priceMin}`}</span> - <span>{`₹${priceMax}`}</span>
            </div>
          </div>

          <div className="filter-item">
            <label>Search Brand</label>
            <input
              type="text"
              placeholder="Search Brand"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              className="search-box"
            />
          </div>

          <div className="filter-item">
            <label>Fuel Type</label>
            <div className="checkbox-group">
              {["Petrol", "Diesel", "Hybrid"].map((fuel) => (
                <label key={fuel} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={fuel}
                    checked={selectedFuel.includes(fuel)}
                    onChange={handleFuelChange}
                  />
                  {fuel}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-item">
            <label>Transmission</label>
            <div className="checkbox-group">
              {transmissionTypes.map((trans) => (
                <label key={trans.name} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={trans.name}
                    checked={selectedTransmission.includes(trans.name)}
                    onChange={handleTransmissionChange}
                  />
                  {trans.name}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-item">
            <label>Year</label>
            <div className="radio-group">
              {yearLevel.map((year, index) => (
                <label key={index} className="radio-label">
                  <input
                    type="radio"
                    name="year"
                    value={year.key}
                    checked={selectedYear === year.key}
                    onChange={handleYearChange}
                    className="m-2"
                  />
                  {year.value}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-item">
            <label>Kilometers Driven</label>
            <input
              type="range"
              min="0"
              max="200000"
              value={kilometer}
              onChange={(e) => setKilometer(e.target.value)}
              className="kilometer-slider"
            />
            <div>{kilometer} km</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetFilters}>
            Reset
          </Button>
          <button className="primary" onClick={handleApplyFilter}>
            Apply Filters
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MobileFilterComponent;
