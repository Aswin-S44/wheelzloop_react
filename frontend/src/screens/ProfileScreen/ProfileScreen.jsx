import React, { useEffect, useState } from "react";
import { FaCamera, FaEllipsisV } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";
import "./ProfileScreen.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { BACKEND_URL } from "../../constants/urls";
import RecipeReviewCard from "../../components/Card/Card";
import { formattedDateTime } from "../../utils/time";

function ProfileScreen() {
  const navigate = useNavigate();
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      const res = await axios.get(`${BACKEND_URL}/api/v1/user/cars/me`, {
        withCredentials: true,
      });
      setLoading(false);
      setMyCars(res?.data || []);
    };
    fetchCars();
  }, []);

  const handleAddCar = () => navigate("/add-car");

  const handleMenuOpen = (event, car) => {
    setMenuAnchor(event.currentTarget);
    setSelectedCar(car);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedCar(null);
  };

  const handleEditCar = () => {
    navigate(`/edit-car/${selectedCar._id}`);
    handleMenuClose();
  };

  const handleRemoveCar = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/cars/${selectedCar._id}`, {
        withCredentials: true,
      });
      setMyCars(myCars.filter((car) => car._id !== selectedCar._id));
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
    handleMenuClose();
  };

  return (
    <section>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="profile-left text-center card">
              <div className="profile-card mt-4">
                <div className="container-fluid p-4">
                  <div className="profile-image-container">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Profile"
                      className="profile-image text-center"
                    />
                    <button className="camera-icon">
                      <FaCamera />
                    </button>
                  </div>
                  <h2 className="profile-name">{currentUser?.firstName}</h2>
                  <p className="member-since">
                    Member since{" "}
                    {currentUser?.createdAt
                      ? formattedDateTime(currentUser?.createdAt)
                      : "_"}
                  </p>
                  <button className="action-btn secondary">Edit Profile</button>
                  <button className="action-btn secondary-btn">
                    Share Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="space-between">
              <h2>All Cars</h2>
              <button className="primary" onClick={handleAddCar}>Add New Car</button>
            </div>
            <div className="row">
              {loading ? (
                <>Loading....</>
              ) : myCars.length == 0 && !loading ? (
                <>No cars available</>
              ) : (
                myCars.map((car, index) => (
                  <div className="col-md-4">
                    <RecipeReviewCard carData={car} key={index} />
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

export default ProfileScreen;
