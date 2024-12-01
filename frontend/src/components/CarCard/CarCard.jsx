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
      <img src={car.image} alt={car.car_name} className="car-image-2" />
      <div className="car-details">
        <h5>
          {car.car_name} - {car.model}
        </h5>
        <p className="variant">{car.varient}</p>
        <p>Year: {car.model}</p>
        <p>Kilometers: {car.kilometer.toLocaleString()}</p>
        <p className="price">Price: ₹{car.price.toLocaleString()}</p>
        <p className="location">
          <PlaceIcon /> {car.place}
        </p>
      </div>
    </div>
  );
}

export default CarCard;
