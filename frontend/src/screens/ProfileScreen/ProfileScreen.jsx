import React, { useEffect, useRef, useState } from "react";
import "./ProfileScreen.css";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { BACKEND_URL } from "../../constants/urls";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { FaEllipsisV } from "react-icons/fa";
import { formattedDateTime } from "../../utils/time";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import EditCar from "../EditCar/EditCar";
import Swal from "sweetalert2";
import TransitionsModal from "../../components/Modal/Modal";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import HomeIcon from "@mui/icons-material/Home";
import Loader from "../../components/Loader/Loader";
import EmptyState from "../../components/EmptyState/EmptyState";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ProfileScreen() {
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentView, setCurrentView] = useState("list");
  const [selectedCar, setSelectedCar] = useState(null);
  const dropdownRefs = useRef({});
  const [value, setValue] = useState("1");
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = (car) => {
    setSelectedCar(car);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => setValue(newValue);

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

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [activeDropdown]);

  const handleEdit = (car) => {
    setSelectedCar(car);
    setCurrentView("edit");
    setActiveDropdown(null);
  };

  const handleRemove = async (carId) => {
    Swal.fire({
      title: "Are you sure to delte?",
      text: "This will delete permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.post(`${BACKEND_URL}/api/v1/user/delete-car/${carId}`, {
          withCredentials: true,
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        window.location.reload();
      }
    });

    setActiveDropdown(null);
  };

  return (
    <div className="mt-4">
      <section>
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-3">
              <ProfileCard />
            </div>
            <div className="col-md-9">
              <div className="space-between mt-10">
                <h2 className="breadcrumb">
                  <a href="/">
                    <HomeIcon />
                  </a>{" "}
                  <ArrowForwardIosIcon /> <a href="/profile">Profile</a>
                  {currentView === "edit" && (
                    <>
                      <ArrowForwardIosIcon /> Edit
                    </>
                  )}
                </h2>
                {currentView === "list" && (
                  <button className="primary-medium" onClick={handleAddCar}>
                    <AddCircleOutlineIcon />
                    Add New
                  </button>
                )}
              </div>
              {currentView === "list" ? (
                <div className="row mt-0">
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
                        <TabList onChange={handleChange}>
                          <Tab
                            icon={<DirectionsCarFilledIcon />}
                            label="My Cars"
                            value="1"
                            sx={{
                              color: "grey",
                              fontSize: "0.9rem",
                              flexDirection: "row",
                              textTransform: "none",
                              "&.Mui-selected": {
                                color: "rgb(222, 49, 99)",
                              },
                              minWidth: "auto",
                            }}
                          />

                          <Tab
                            icon={<CalendarMonthIcon />}
                            label="1 month Ago"
                            value="2"
                            sx={{
                              color: "grey",
                              fontSize: "0.9rem",
                              flexDirection: "row",
                              textTransform: "none",
                              "&.Mui-selected": {
                                color: "rgb(222, 49, 99)",
                              },
                              minWidth: "auto",
                            }}
                          />
                          <Tab
                            icon={<FavoriteIcon />}
                            label="Saved"
                            value="3"
                            sx={{
                              color: "grey",
                              fontSize: "0.9rem",
                              flexDirection: "row",
                              textTransform: "none",
                              "&.Mui-selected": {
                                color: "rgb(222, 49, 99)",
                              },
                              minWidth: "auto",
                            }}
                          />
                        </TabList>
                      </Box>
                      <TabPanel value="1">
                        <div className="cars-container">
                          {loading ? (
                            <Loader />
                          ) : myCars.length == 0 && !loading ? (
                            <>
                              <EmptyState />
                            </>
                          ) : (
                            myCars.map((car) => (
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
                                    >
                                      <button
                                        onClick={() => {
                                          handleOpen(car);
                                        }}
                                      >
                                        <VisibilityIcon
                                          sx={{
                                            fontSize: "19px",
                                            top: "-1px",
                                            position: "relative",
                                          }}
                                        />{" "}
                                        View
                                      </button>
                                      <button onClick={() => handleEdit(car)}>
                                        <EditIcon
                                          sx={{
                                            fontSize: "19px",
                                            top: "-1px",
                                            position: "relative",
                                          }}
                                        />{" "}
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => handleRemove(car._id)}
                                      >
                                        <DeleteIcon
                                          sx={{
                                            fontSize: "19px",
                                            top: "-1px",
                                            position: "relative",
                                            color: "red",
                                          }}
                                        />{" "}
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
                                    {car.year} | {car.varient} | {car.kilometer}{" "}
                                    km
                                  </p>
                                  <p className="price">
                                    ₹{car.rate.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </TabPanel>
                      <TabPanel value="2">
                        <EmptyState />
                      </TabPanel>
                      <TabPanel value="3">
                        <EmptyState />
                      </TabPanel>
                    </TabContext>
                  </Box>
                </div>
              ) : (
                <EditCar car={selectedCar ?? {}} />
              )}
            </div>
          </div>
        </div>
        {selectedCar && (
          <TransitionsModal
            car={selectedCar}
            open={open}
            handleClose={handleClose}
          />
        )}
      </section>
    </div>
  );
}

export default ProfileScreen;
