import React, { useEffect, useState } from "react";
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

function ProfileScreen() {
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const { currentUser } = useAuth();

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
                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab label="My Cars" value="1" />
                        <Tab label="1 month Ago" value="2" />
                        <Tab label="Saved" value="3" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <div className="row">
                        {loading ? (
                          <div className="text-center">
                            <img
                              src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif"
                              className="w-50"
                            />
                          </div>
                        ) : myCars.length == 0 && !loading ? (
                          <>Loading....</>
                        ) : (
                          myCars.map((car, index) => (
                            <div className="col-md-4">
                              {/* <RecipeReviewCard carData={car} key={index} /> */}
                              <CarCard car={car} />
                            </div>
                          ))
                        )}
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
