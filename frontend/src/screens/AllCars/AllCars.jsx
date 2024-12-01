import React, { useState } from "react";
import "./AllCars.css";
import Filter from "../../components/Filter/Filter";
import useMobileView from "../../hooks";
import MobileFilterComponent from "../../components/MobileFilterComponent/MobileFilterComponent";
import { carData } from "../../constants/data";
import NotFound from "../NotFound/NotFound";
import CarCard from "../../components/CarCard/CarCard";
import Carousel from "../../components/Carousel/Carousel";

function AllCars() {
  const isMobile = useMobileView();
  const [cars, setCars] = useState(carData);
  const [loading, setLoading] = useState(false);
  const handleFilterChange = (updatedFilters) => {};
  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="container-fluid">
            {isMobile ? (
              <MobileFilterComponent
                brands={[]}
                years={[]}
                places={[]}
                onFilterChange={handleFilterChange}
              />
            ) : (
              <Filter />
            )}
          </div>
        </div>
        <div className="col-md-8">
          <Carousel />
          <div className="car-list mt-3">
            {cars.length === 0 && !loading ? (
              <div
                className="w-100"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <NotFound />
              </div>
            ) : (
              cars.map((car) => <CarCard key={car._id} car={car} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllCars;
