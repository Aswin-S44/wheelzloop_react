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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";

function AllCars() {
  const isMobile = useMobileView();
  const [cars, setCars] = useState(carData);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [sort, setSort] = useState("createdAt");
  const [isFavourite, setIsFavourite] = useState(false);

  const [favCars, setFavCars] = useState([]);

  const fetchFavCars = () => {
    const savedFavCars = JSON.parse(localStorage.getItem("fav-cars")) || [];
    setFavCars(savedFavCars);
  };

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
  };
  const navigate = useNavigate();

  const addToFav = (id) => {
    let updatedFavCars = [...favCars];

    if (!favCars.includes(id)) {
      updatedFavCars.push(id);
      localStorage.setItem("fav-cars", JSON.stringify(updatedFavCars));
      toast.success("Added to favourites");
    } else {
      updatedFavCars = updatedFavCars.filter((favId) => favId !== id);
      localStorage.setItem("fav-cars", JSON.stringify(updatedFavCars));
      toast.error("Removed from favourites");
    }

    setFavCars(updatedFavCars);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (query) {
      const results = cars.filter(
        (car) =>
          car.name.toLowerCase().includes(query) ||
          car.varient.toLowerCase().includes(query) ||
          car.brand.toLowerCase().includes(query) ||
          car.place.toLowerCase().includes(query)
      );
      setFilteredCars(results);
    } else {
      setFilteredCars([]);
    }
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${BACKEND_URL}/api/v1/customer/cars/all`,
          {
            params: { ...filters, sort },
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
    fetchFavCars();
  }, [filters, search, sort]);

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
            <div className="search-container w-100">
              <input
                type="text"
                placeholder="Search by name, brand, model etc...."
                name="search"
                className="custom-input w-100"
                value={search}
                onChange={handleSearchChange}
              />
              <SearchIcon className="search-icon" />
            </div>

            {filteredCars.length > 0 && (
              <div className="search-results">
                {filteredCars.map((car, index) => (
                  <div
                    key={index}
                    className="search-result-item"
                    onClick={() => navigate(`/details/${car._id}`)}
                  >
                    <p>
                      {car.name} - {car.varient} ({car.brand})
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3">
              <Carousel />
            </div>
            <div>
              <select
                className="w-25 mt-3"
                onChange={(e) => setSort(e.target.value)}
                value={sort}
              >
                <option value="createdAt">Latest - Oldest</option>
                <option value="-createdAt">Oldest - Latest</option>
              </select>
            </div>
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
                  <div key={index} className="car-card-2 m-2">
                    {favCars.includes(car._id) ? (
                      <FavoriteIcon
                        style={{ color: "red" }}
                        onClick={() => addToFav(car._id)}
                      />
                    ) : (
                      <FavoriteBorderIcon onClick={() => addToFav(car._id)} />
                    )}
                    {car && car.images && car.images.length > 0 && (
                      <img
                        src={car.images[0]}
                        alt={car.car_name}
                        className="car-image-2"
                        onClick={() => navigate(`/details/${car?._id}`)}
                      />
                    )}

                    <div
                      className="car-details"
                      onClick={() => navigate(`/details/${car?._id}`)}
                    >
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
