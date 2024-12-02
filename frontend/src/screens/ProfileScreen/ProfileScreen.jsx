import React, { useEffect, useState } from "react";
import { FaCamera, FaEllipsisV } from "react-icons/fa";
import "./ProfileScreen.css";
import { carData } from "../../constants/data";
import CarCard from "../../components/CarCard/CarCard";
import NotFound from "../NotFound/NotFound";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { formattedDateTime } from "../../utils/time";
import axios from "axios";
import { BACKEND_URL } from "../../constants/urls";

function ProfileScreen() {
  const navigate = useNavigate();
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const { username, logout, isLoggedIn, currentUser } = useAuth();

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      let res = await axios.get(`${BACKEND_URL}/api/v1/user/cars/me`, {
        withCredentials: true,
      });
      setLoading(false);
      setMyCars(res?.data);
    };
    fetchCars();
  }, []);

  const handleAddCar = () => {
    navigate("/add-car");
  };

  return (
    <div className="profile-container">
      <section className="profile-left">
        <div className="profile-card mt-4">
          <div className="profile-image-container">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="profile-image"
            />
            <button className="camera-icon">
              <FaCamera />
            </button>
          </div>
          <h2 className="profile-name">{currentUser?.firstName}</h2>
          {console.log("time-----------", currentUser?.createdAt)}
          <p className="member-since">
            Member since{" "}
            {currentUser?.createdAt
              ? formattedDateTime(currentUser?.createdAt)
              : "_"}{" "}
          </p>
          <button className="action-btn">Edit Profile</button>
          <button className="action-btn secondary-btn">Share Profile</button>
        </div>
      </section>
      <section className="profile-right">
        <div className="space-between">
          <h2 className="section-title">My Cars</h2>
          <button className="primary" onClick={handleAddCar}>
            <AddCircleOutlineIcon />
            Add Car
          </button>
          {loading ? (
            <>Loading....</>
          ) : myCars.length == 0 ? (
            <>No cars</>
          ) : (
            myCars.map((car, index) => <CarCard key={index} car={car} />)
          )}
        </div>
      </section>
    </div>
  );
}

export default ProfileScreen;
