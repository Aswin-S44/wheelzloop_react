import React, { useEffect, useState } from "react";
import "./AllCars.css";
import Filter from "../../components/Filter/Filter";
import useMobileView from "../../hooks";
import MobileFilterComponent from "../../components/MobileFilterComponent/MobileFilterComponent";
import { carData } from "../../constants/data";
import NotFound from "../NotFound/NotFound";
import CarCard from "../../components/CarCard/CarCard";
import Carousel from "../../components/Carousel/Carousel";
import axios from "axios";
import { BACKEND_URL } from "../../constants/urls";
import { useNavigate } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import Loader from "../../components/Loader/Loader";

function AllCars() {
  const isMobile = useMobileView();
  const [cars, setCars] = useState(carData);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        let { data } = await axios.get(
          `${BACKEND_URL}/api/v1/customer/cars/all`,
          {
            params: filters,
          }
        );

        if (data && data.cars) {
          setLoading(false);
          setCars(data.cars);
        }
      } catch (error) {
        setLoading(false);
        console.log("Error while fetching cars : ", error);
      }
    };
    fetchCars();
  }, [filters]);

  return (
    <section>
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-md-3">
            <div className="container-fluid">
              <div className="filter-box">
                {isMobile ? (
                  <MobileFilterComponent
                    brands={[]}
                    years={[]}
                    places={[]}
                    onFilterChange={handleFilterChange}
                  />
                ) : (
                  <Filter onFilterChange={handleFilterChange} />
                )}
              </div>
            </div>
          </div>
          <div className="col-md-8">
            {/* <Carousel /> */}
            <div className="car-list mt-3">
              {cars.length === 0 && !loading ? (
                <div
                  className="w-100"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <NotFound />
                </div>
              ) : loading ? (
                <>
                  <Loader />
                </>
              ) : (
                cars.map((car, index) => (
                  <div
                    key={index}
                    className="car-card-2"
                    onClick={() => navigate(`/details/${car?._id}`)}
                  >
                    {car && car.images && car.images.length > 0 && (
                      <img
                        src={car.images[0]}
                        alt={car.car_name}
                        className="car-image-2"
                      />
                    )}
                    <div className="car-details">
                      <h5>
                        {car.name} - {car.varient}
                      </h5>
                      <p className="variant">{car.varient}</p>
                      <p>Year: {car.year ?? "_"}</p>
                      <p>Kilometers: {car.kilometer.toLocaleString()}</p>
                      <p className="price">
                        Price: ₹{car?.rate?.toLocaleString()}
                      </p>
                      <p className="location">
                        <PlaceIcon /> {car.place}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AllCars;
