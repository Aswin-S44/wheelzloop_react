import React, { useState } from "react";
import { FaCamera, FaEllipsisV } from "react-icons/fa";
import "./ProfileScreen.css";
import { carData } from "../../constants/data";
import CarCard from "../../components/CarCard/CarCard";
import NotFound from "../NotFound/NotFound";

function ProfileScreen() {
  const [myCars, setMyCars] = useState(carData);
  const [loading, setLoading] = useState(false);
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
          <h2 className="profile-name">John Doe</h2>
          <p className="member-since">Member since March 21, 2021</p>
          <button className="action-btn">Edit Profile</button>
          <button className="action-btn secondary-btn">Share Profile</button>
        </div>
      </section>
      <section className="profile-right">
        <h2 className="section-title">My Cars</h2>
        <div className="car-list mt-3">
          {myCars.length === 0 && !loading ? (
            <div
              className="w-100"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <NotFound />
            </div>
          ) : (
            myCars.map((car) => <CarCard key={car._id} car={car} />)
          )}
        </div>
      </section>
    </div>
  );
}

export default ProfileScreen;
