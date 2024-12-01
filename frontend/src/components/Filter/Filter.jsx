import React, { useState } from "react";
import "./Filter.css";

function Filter() {
  const [price, setPrice] = useState([5000, 20000]);
  const [brandSearch, setBrandSearch] = useState("");
  const [selectedFuel, setSelectedFuel] = useState([]);
  const [selectedTransmission, setSelectedTransmission] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [isMarutiOpen, setIsMarutiOpen] = useState(false);
  const [isHondaOpen, setIsHondaOpen] = useState(false);
  const [selectedModels, setSelectedModels] = useState([]);

  const handlePriceChange = (event) => {
    setPrice(event.target.value.split(","));
  };

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

  const handleModelChange = (brand, model) => {
    const newSelectedModels = { ...selectedModels };
    if (newSelectedModels[brand]?.includes(model)) {
      newSelectedModels[brand] = newSelectedModels[brand].filter(
        (m) => m !== model
      );
    } else {
      newSelectedModels[brand] = [...(newSelectedModels[brand] || []), model];
    }
    setSelectedModels(newSelectedModels);
  };

  return (
    <div className="filter-container">
      <div className="filter-item">
        <label>Price Range</label>
        <input
          type="range"
          min="0"
          max="50000"
          value={price}
          onChange={handlePriceChange}
          className="price-slider"
          step="500"
        />
        <div className="price-range">
          <span>{`$${price[0]}`}</span> - <span>{`$${price[1]}`}</span>
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
        <label>Car Brands</label>
        <div className="brand-section">
          <div className="accordion">
            <div>
              <button
                className={`accordion-button ${isMarutiOpen ? "active" : ""}`}
                onClick={() => setIsMarutiOpen(!isMarutiOpen)}
              >
                Maruti Suzuki
              </button>
              {isMarutiOpen && (
                <div className="accordion-content">
                  {["Alto", "Swift", "WagonR"].map((model) => (
                    <label key={model} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedModels["Maruti Suzuki"]?.includes(
                          model
                        )}
                        onChange={() =>
                          handleModelChange("Maruti Suzuki", model)
                        }
                      />
                      {model}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <div>
              <button
                className={`accordion-button ${isHondaOpen ? "active" : ""}`}
                onClick={() => setIsHondaOpen(!isHondaOpen)}
              >
                Honda
              </button>
              {isHondaOpen && (
                <div className="accordion-content">
                  {["Civic", "City", "Accord"].map((model) => (
                    <label key={model} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedModels["Honda"]?.includes(model)}
                        onChange={() => handleModelChange("Honda", model)}
                      />
                      {model}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="filter-item">
        <label>Year</label>
        <div className="radio-group">
          {["Above 2000", "2010-2020", "2020+"].map((year) => (
            <label key={year} className="radio-label">
              <input
                type="radio"
                name="year"
                value={year}
                checked={selectedYear === year}
                onChange={handleYearChange}
              />
              {year}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-item">
        <label>Kilometers Driven</label>
        <input type="range" min="0" max="200000" step="10000" />
        <div>Below 100,000 km</div>
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
          {["Manual", "Automatic"].map((trans) => (
            <label key={trans} className="checkbox-label">
              <input
                type="checkbox"
                value={trans}
                checked={selectedTransmission.includes(trans)}
                onChange={handleTransmissionChange}
              />
              {trans}
            </label>
          ))}
        </div>
      </div>

      <button className="apply-filter">Apply Filters</button>
    </div>
  );
}

export default Filter;
