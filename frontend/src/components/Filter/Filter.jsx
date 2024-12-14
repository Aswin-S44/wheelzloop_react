import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Filter.css";
import { BACKEND_URL } from "../../constants/urls";

function Filter({ onFilterChange }) {
  const [priceMin, setPriceMin] = useState(5000);
  const [priceMax, setPriceMax] = useState(2000000);
  const [brandSearch, setBrandSearch] = useState("");
  const [selectedFuel, setSelectedFuel] = useState([]);
  const [selectedTransmission, setSelectedTransmission] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [isMarutiOpen, setIsMarutiOpen] = useState(false);
  const [isHondaOpen, setIsHondaOpen] = useState(false);
  const [selectedModels, setSelectedModels] = useState([]);
  const [cars, setCars] = useState([]);
  const [totalCars, setTotalCars] = useState(0);
  const [kilometer, setKilometer] = useState(200000);
  const [nameSearch, setNameSearch] = useState("");
  const [yearLevel, setYearLevel] = useState([
    {
      key: "1901 - 2000",
      value: "Below 2000",
    },
    {
      key: "2001 - 2009",
      value: "2001 - 2009",
    },
    {
      key: "2010 - 2020",
      value: "2010 - 2020",
    },
    {
      key: "2021 - 2099",
      value: "Above 2021",
    },
  ]);
  const [transmissionTypes, setTransmissionTypes] = useState([
    {
      key: "Manual Automatic",
      name: "All",
      isChecked: true,
    },
    {
      key: "Manual",
      name: "Manual",
      isChecked: false,
    },
    {
      key: "Automatic",
      name: "Automatic",
      isChecked: false,
    },
  ]);

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

  const handlePriceMinChange = (event) => {
    const newMin = Math.min(Number(event.target.value), priceMax);
    setPriceMin(newMin);
  };

  const handlePriceMaxChange = (event) => {
    const newMax = Math.max(Number(event.target.value), priceMin);
    setPriceMax(newMax);
  };

  const defaultPriceMin = 5000;
  const defaultPriceMax = 2000000;
  const defaultBrandSearch = "";
  const defaultSelectedFuel = [];
  const defaultSelectedTransmission = [];
  const defaultSelectedYear = "";
  const defaultKilometer = 200000;
  const defaultNameSearch = "";

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
  };

  useEffect(() => {
    handleApplyFilter();
  }, [
    priceMin,
    priceMax,
    brandSearch,
    selectedFuel,
    selectedTransmission,
    selectedYear,
    selectedModels,
    kilometer,
    nameSearch,
  ]);

  const resetFilters = () => {
    setPriceMin(defaultPriceMin);
    setPriceMax(defaultPriceMax);
    setBrandSearch(defaultBrandSearch);
    setSelectedFuel(defaultSelectedFuel);
    setSelectedTransmission(defaultSelectedTransmission);
    setSelectedYear(defaultSelectedYear);
    setKilometer(defaultKilometer);
    setNameSearch(defaultNameSearch);
  };

  return (
    <div className="filter-container">
      <button
        onClick={resetFilters}
        className="primary"
        style={{ float: "right" }}
      >
        Reset Filters
      </button>
      <div className="mt-5">
        <div className="filter-item">
          <label>Price Range</label>
          <div className="price-range-container">
            <input
              type="range"
              min="0"
              max="5000000"
              value={priceMin}
              onChange={handlePriceMinChange}
              className="price-slider"
              step="500"
            />
            <input
              type="range"
              min="0"
              max="5000000"
              value={priceMax}
              onChange={handlePriceMaxChange}
              className="price-slider"
              step="500"
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
            placeholder="Search BMW , Suzuki etc"
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
                    {["Alto", "Swift", "WagonR"].map((name) => (
                      <label key={name} className="checkbox-label">
                        {/* <input
                        type="checkbox"
                        value={name}
                        onChange={() => {
                          console.log("name clicked");
                          setNameSearch(name);
                        }}
                      /> */}
                        <input
                          type="checkbox"
                          value={name}
                          checked={nameSearch === name} // Update this to match the current state
                          onChange={() => {
                            console.log("name clicked");
                            setNameSearch((prevName) =>
                              prevName === name ? "" : name
                            ); // Toggle the state
                            handleApplyFilter(); // Call the filter function explicitly
                          }}
                        />

                        {name}
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
            step="1000"
            onChange={(e) => setKilometer(e.target.value)}
          />
          <div>{kilometer} km</div>
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
            {transmissionTypes.length == 0 ? (
              <>Not available</>
            ) : (
              transmissionTypes.map((trans, index) => (
                <label key={index} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={trans?.name}
                    checked={selectedTransmission.includes(trans?.name)}
                    onChange={handleTransmissionChange}
                  />
                  {trans?.name}
                </label>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
