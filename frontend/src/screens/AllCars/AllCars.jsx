import React, { useEffect, useRef, useState } from "react";
import "./AllCars.css";
import Filter from "../../components/Filter/Filter";
import useMobileView from "../../hooks";
import MobileFilterComponent from "../../components/MobileFilterComponent/MobileFilterComponent";
import { dummyCarData } from "../../constants/data";
import NotFound from "../NotFound/NotFound";
import CarCard from "../../components/CarCard/CarCard";
import Carousel from "../../components/Carousel/Carousel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import Loader from "../../components/Loader/Loader";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { addDummyCars, getAllCars } from "../../services/apis";

function AllCars() {
  const isMobile = useMobileView();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [sort, setSort] = useState("createdAt");
  const [isFavourite, setIsFavourite] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    sort: "createdAt",
  });
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

  const observer = useRef();

  useEffect(() => {
    const fetchCars = async () => {
      if (loading || !hasMore) return;

      try {
        setLoading(true);
        const carsData = await getAllCars(filters, pagination);

        setCars((prevCars) => {
          const newCars = carsData.filter(
            (car) => !prevCars.some((prevCar) => prevCar.id === car.id)
          );
          return [...prevCars, ...newCars];
        });

        if (carsData.length < pagination.limit) {
          setHasMore(false);
        }
      } catch (error) {
        console.log("Error while fetching cars: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [filters, pagination]);

  const lastCarRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
      }
    });

    if (node) observer.current.observe(node);
  };

  const handleAddDummyData = async () => {
    console.log("Started!!!!");
    await addDummyCars();
    console.log("Finished!!!!");
  };

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
            {/* <button onClick={handleAddDummyData}>save</button> */}
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
                    onClick={() => navigate(`/details/${car.id}`)}
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
              {!loading && cars.length === 0 ? (
                <div
                  className="w-100"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <NotFound />
                </div>
              ) : loading ? (
                <Loader />
              ) : (
                cars.map((car, index) => (
                  <div
                    key={index}
                    className="car-card-2 m-2"
                    ref={cars.length === index + 1 ? lastCarRef : null}
                  >
                    {favCars.includes(car.id) ? (
                      <FavoriteIcon
                        style={{ color: "red" }}
                        onClick={() => addToFav(car.id)}
                      />
                    ) : (
                      <FavoriteBorderIcon onClick={() => addToFav(car.id)} />
                    )}
                    {car && car.images && car.images.length > 0 && (
                      <img
                        src={car.images[0]}
                        alt={car.car_name}
                        className="car-image-2"
                        onClick={() => navigate(`/details/${car?.id}`)}
                      />
                    )}

                    <div
                      className="car-details"
                      onClick={() => navigate(`/details/${car?.id}`)}
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
                        <PlaceIcon /> {car.location ?? "_"}
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
