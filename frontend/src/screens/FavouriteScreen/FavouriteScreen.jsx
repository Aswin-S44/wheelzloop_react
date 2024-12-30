import React, { useEffect, useState } from "react";
import "./FavouriteScreen.css";
import axios from "axios";
import { BACKEND_URL } from "../../constants/urls";
import EmptyState from "../../components/EmptyState/EmptyState";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../components/Loader/Loader";

function FavouriteScreen() {
  const [savedCars, setSavedCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const removeFromFavorites = (id) => {
    const updatedCars = savedCars.filter((car) => car._id !== id);
    setSavedCars(updatedCars);
    localStorage.setItem(
      "fav-cars",
      JSON.stringify(updatedCars.map((car) => car._id))
    );
  };

  useEffect(() => {
    const fetchSavedCars = async () => {
      try {
        setLoading(true);
        let favCars = JSON.parse(localStorage.getItem("fav-cars")) || [];
        let { data } = await axios.post(
          `${BACKEND_URL}/api/v1/user/cars/saved`,
          {
            savedIds: favCars,
          }
        );
        setLoading(false);
        if (data && data.cars && data.cars.length > 0) {
          setSavedCars(data.cars);
        }
      } catch (error) {
        console.log("Error while fetching saved cars : ", error);
        setLoading(false);
      }
    };
    fetchSavedCars();
  }, []);

  return (
    <section>
      <div className="w-100 p-5">
        <h2 className="mt-5">Saved Cars</h2>

        <div className="favourite-screen p-5 mt-1 w-100">
          {loading ? (
            <>
              <Loader />
            </>
          ) : savedCars.length > 0 ? (
            <div className="w-100">
              <table className="car-table w-100">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Car Name</th>
                    <th>Details</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {savedCars.map((car) => (
                    <tr key={car._id}>
                      <td>
                        {car.images && car.images.length > 0 && (
                          <img
                            src={car.images[0]}
                            alt={car.car_name}
                            className="car-image"
                          />
                        )}
                      </td>
                      <td style={{ fontWeight: "bold" }}>{car.name ?? "_"}</td>
                      <td>
                        <p>Year: {car.year}</p>
                        <p>Fuel: {car.fuelType}</p>
                        <p>Transmission: {car.transmission ?? "_"}</p>
                      </td>
                      <td>₹{car?.rate?.toLocaleString()}</td>
                      <td style={{ color: car.sold ? "red" : "green" }}>
                        {car.sold ? "Sold" : "Available"}
                      </td>

                      <td>
                        <button
                          onClick={() => removeFromFavorites(car._id)}
                          style={{
                            border: "none",
                            outline: "none",
                            background: "transparent",
                          }}
                        >
                          <DeleteIcon style={{ color: "red" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-cars">
              <EmptyState />
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default FavouriteScreen;
