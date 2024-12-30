import React from "react";
import "./CarCard.css";
import { useNavigate } from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";

function CarCard({ car }) {
  const navigate = useNavigate();
  return (
    <div
      className="car-card-2"
      onClick={() => navigate(`/details/${car?._id}`)}
    >
      <div className="left-part">
        {car && car.images && car.images.length > 0 && (
          <img src={car.images[0]} alt={car.car_name} className="car-image-2" />
        )}
      </div>
      <div className="right-part">
        <div className="car-details">
          <h5>
            {car.name} - {car.varient}
          </h5>
          <p className="variant">{car.varient}</p>
          <p>Year: {car.year ?? "_"}</p>
          <p>Kilometers: {car.kilometer.toLocaleString()}</p>
          <p className="price">Price: ₹{car?.rate?.toLocaleString()}</p>
          <p className="location">
            <PlaceIcon /> {car.place}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
