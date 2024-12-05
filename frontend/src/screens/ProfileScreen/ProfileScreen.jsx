import React, { useEffect, useRef, useState } from "react";
import "./ProfileScreen.css";
import RecipeReviewCard from "../../components/Card/Card";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { BACKEND_URL } from "../../constants/urls";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import CarCard from "../../components/CarCard/CarCard";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { FaEllipsisV } from "react-icons/fa";
import { formattedDateTime } from "../../utils/time";
import PhoneIcon from "@mui/icons-material/Phone";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite";

function ProfileScreen() {
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const { currentUser } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef({});

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
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

  const handleMenuClick = (carId) => {
    setActiveDropdown(activeDropdown === carId ? null : carId);
  };

  const handleClickOutside = (e) => {
    if (
      activeDropdown !== null &&
      (!dropdownRefs.current[activeDropdown] ||
        !dropdownRefs.current[activeDropdown].contains(e.target))
    ) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const handleEdit = (carId) => {
    console.log("Edit car ID:", carId);
    setActiveDropdown(null);
  };

  const handleRemove = (carId) => {
    console.log("Remove car ID:", carId);
    setActiveDropdown(null);
  };

  return (
    <div className="mt-4">
      <section>
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-3">
              <div className="profile-card text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="profile-image"
                />
                <h3 className="profile-name">John Doe</h3>
                <p className="profile-date">Joined: January 1, 2023</p>
                <div className="space-between">
                  <button className="btn primary">
                    <EditIcon />
                    Edit Profile
                  </button>
                  <button className="btn secondary-btn">
                    <ShareIcon />
                    Share Profile
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="space-between">
                <h2 className="profile-breadcrumb">
                  Home <ArrowForwardIosIcon /> Profile
                </h2>
                <button className="primary" onClick={handleAddCar}>
                  <AddCircleOutlineIcon />
                  Add New
                </button>
              </div>
              <div className="row mt-4">
                <Box
                  sx={{
                    width: "100%",
                    typography: "body1",
                  }}
                >
                  <TabContext value={value}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        backgroundColor: "#f4f6f6",
                        borderRadius: 2,
                      }}
                    >
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab
                          icon={<DirectionsCarFilledIcon />}
                          label="My Cars"
                          value="1"
                          sx={{
                            color: "#111",
                            "&.Mui-selected": {
                              color: "#DE3163",
                            },
                          }}
                        />
                        <Tab
                          icon={<CalendarMonthIcon />}
                          label="1 month Ago"
                          value="2"
                          sx={{
                            color: "#111",
                            "&.Mui-selected": {
                              color: "#DE3163",
                            },
                          }}
                        />
                        <Tab
                          icon={<FavoriteIcon />}
                          label="Saved"
                          value="3"
                          sx={{
                            color: "#111",
                            "&.Mui-selected": {
                              color: "#DE3163",
                            },
                          }}
                        />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <div className="cars-container">
                        {myCars.map((car) => (
                          <div className="car-card" key={car._id}>
                            <div className="card-header">
                              <FaEllipsisV
                                className="dots-icon"
                                onClick={() => handleMenuClick(car._id)}
                              />
                              {activeDropdown === car._id && (
                                <div
                                  className="dropdown-menu"
                                  ref={(el) =>
                                    (dropdownRefs.current[car._id] = el)
                                  }
                                  style={{
                                    right:
                                      document.body.clientWidth -
                                        dropdownRefs.current[
                                          car._id
                                        ]?.getBoundingClientRect()?.right <
                                      0
                                        ? "auto"
                                        : "0px",
                                    left:
                                      document.body.clientWidth -
                                        dropdownRefs.current[
                                          car._id
                                        ]?.getBoundingClientRect()?.right <
                                      0
                                        ? "-100px"
                                        : "auto",
                                  }}
                                >
                                  <button onClick={() => handleEdit(car._id)}>
                                    Edit
                                  </button>
                                  <button onClick={() => handleRemove(car._id)}>
                                    Remove
                                  </button>
                                </div>
                              )}
                            </div>
                            <img
                              src={car?.images[0]}
                              alt={car.name}
                              className="car-image"
                            />
                            <div className="car-info">
                              <h2 className="car-name">{car.name}</h2>
                              <p>
                                Posted on :{" "}
                                {car.createdAt
                                  ? formattedDateTime(car.createdAt)
                                  : "_"}
                              </p>
                              <p className="car-details">
                                {car.year} | {car.varient} | {car.kilometer} km
                              </p>
                              <p className="car-price">
                                ₹{car.rate.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                  </TabContext>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileScreen;
