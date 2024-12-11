import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import {
  FaCar,
  FaDollarSign,
  FaCalendarAlt,
  FaTachometerAlt,
  FaRoad,
  FaUsers,
  FaWrench,
  FaTools,
  FaShieldAlt,
  FaExclamationTriangle,
  FaStore,
  FaHandHoldingUsd,
} from "react-icons/fa";
import "./DetailsScreen.css";
import { useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import SpringModal from "../../Components/Modal/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import CarCard from "../../Components/CarCard/CarCard";
import { BACKEND_URL } from "../../constants/urls";
// import { useAuth } from "../../context/AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const DetailsScreen = () => {
  // const { isLoggedIn, login, logout } = useAuth();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const [relatedCars, setRelatedCars] = useState([]);
  const [brand, setBrand] = useState(null);

  const [filters, setFilters] = useState({
    brand: null,
  });

  useEffect(() => {
    const fetchRelatedCars = async () => {
      setLoading(true);
      try {
        // let url = `${BACKEND_URL}/api/v1/admin/get-cars?brand=${brand}&year=&page=1&limit=6&search=&priceRange=&fuelType=`;
        // const res = await axios.get(url);
        // if (res && res.data) {
        //   const newCars = res?.data?.data;
        //   if (newCars) {
        //     const filteredCars = newCars.filter((car) => car._id !== id);
        //     setRelatedCars((prevCars) => [...prevCars, ...filteredCars]);
        //   }
        // }
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRelatedCars();
  }, [brand]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    validateForm(e.target.value, phoneNumber);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    validateForm(fullName, e.target.value);
  };

  const validateForm = (name, number) => {
    const isPhoneValid = /^[0-9]{10}$/.test(number);
    setIsFormValid(name && isPhoneValid);
  };
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        let res = await axios.get(`${BACKEND_URL}/api/v1/customer/car/${id}`);
        console.log("res-----------", res ? res : "no res");
        let favCars = JSON.parse(localStorage.getItem("fav-cars")) || [];
        if (favCars && favCars.length > 0) {
          if (favCars.includes(id)) {
            setIsFavourite(true);
          }
        }
        setLoading(false);
        if (res) {
          setCar(res.data);
          setBrand(res?.brand);
          setFilters((prevFilters) => ({
            model: res?.brand,
          }));
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    // Set the modal app element for accessibility
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);

    setErrors({});
  };

  const handleSubmit = async (formData) => {
    let dataObj = {
      first_name: formData?.fullName,
      country_code: "",
      phone_number: formData?.phoneNumber,
      allow_whatsapp_notification: formData?.allowMessages,
      carId: id,
    };
    // await sendEnquiry(dataObj);
    toast.success("successful");
    formData.fullName = "";
    formData.phoneNumber = "";
    formData.allowMessages = "";
  };

  const addToFav = async () => {
    let favCars = JSON.parse(localStorage.getItem("fav-cars")) || [];

    if (!favCars.includes(id)) {
      favCars.push(id);
      localStorage.setItem("fav-cars", JSON.stringify(favCars));
      toast.success("Added to favourites");
      setIsFavourite(true);
    } else {
      favCars = favCars.filter((favId) => favId !== id);

      localStorage.setItem("fav-cars", JSON.stringify(favCars));
      toast.error("Removed from favourites");
      setIsFavourite(false);
    }
  };

  return (
    <section>
      <div className="mt-0">
        <div className="details-screen p-5">
          <div className="image-section">
            <img
              src={car?.image || car?.images[0]}
              alt={car?.car_name}
              className="main-image"
            />
            <div className="additional-images">
              {car &&
                car.additional_images &&
                car.additional_images.length > 0 &&
                car.additional_images.map((img, index) => (
                  <>
                    <img
                      key={index}
                      src={img}
                      alt={`Additional ${index + 1}`}
                      className="additional-image"
                    />
                  </>
                ))}

              {car?.images &&
                car.images.length > 0 &&
                car.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Additional ${index + 1}`}
                    className="additional-image"
                  />
                ))}
            </div>
          </div>
          <div className="details-section mt-0">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 className="car-name">
                {car?.car_name} - {car?.brand}
              </h2>
              <BookmarkBorderIcon
                onClick={() => addToFav()}
                style={{
                  top: "10px",
                  position: "relative",
                  color: isFavourite ? "gold" : "black",
                }}
              />
            </div>
            <div>
              {car?.sold ? (
                <h4 style={{ fontSize: "16px", color: "red" }}>Unavailable</h4>
              ) : (
                <h4 style={{ fontSize: "16px", color: "green" }}>Available</h4>
              )}
            </div>
            <div className="specifications mt-3">
              <div className="spec-item">
                <FaCar /> {car?.model}
              </div>
              <div className="spec-item">
                <FaDollarSign /> {car?.price}
              </div>
              <div className="spec-item">
                <FaCalendarAlt /> {car?.year}
              </div>
              <div className="spec-item">
                <FaTachometerAlt /> {car?.kilometer} km
              </div>
              <div className="spec-item">
                <FaRoad /> {car?.transmission_type}
              </div>
              <div className="spec-item">
                <FaUsers /> {car?.owner}
              </div>
              <div className="spec-item">
                <FaWrench /> {car?.engine}
              </div>
            </div>
            <p>{car?.about}</p>
            {!car?.sold ? (
              <button className="inquiry-button" onClick={handleOpen}>
                Get Seller Details
              </button>
            ) : (
              <button className="btn btn-secondary" disabled>
                Unavailable
              </button>
            )}
          </div>
          {/* <SpringModal
          open={open}
          handleClose={handleClose}
          onSubmit={handleSubmit}
        /> */}
          <ToastContainer />
        </div>
        <div className="container p-5 spec-details-box">
          <div className="spec-details p-4">
            <div className="row">
              <div className="col-md-3">
                {" "}
                <div className="spec-item">
                  <div className="icon">
                    <FaTools style={{ fontSize: "24px" }} />
                  </div>
                  <div className="spec-text">
                    <span className="spec-title">Variant</span>{" "}
                    {car?.variant || "Unavailable"}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="spec-item">
                  <div className="icon">
                    <FaShieldAlt style={{ fontSize: "24px" }} />
                  </div>
                  <div className="spec-text">
                    <span className="spec-title"> Claim Status</span>{" "}
                    {car?.claim ? "Claimed" : "Not Claimed"}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="spec-item">
                  <div className="icon">
                    <FaExclamationTriangle style={{ fontSize: "24px" }} />
                  </div>
                  <div className="spec-text">
                    <span className="spec-title">Major Accident</span>{" "}
                    {car?.major_accident ? "Yes" : "No"}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="spec-item">
                  <div className="icon">
                    <FaStore style={{ fontSize: "24px" }} />
                  </div>
                  <div className="spec-text">
                    <span className="spec-title">Shop Name</span>{" "}
                    {car?.shop_name || "Unavailable"}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="spec-item">
                  <div className="icon">
                    <FaHandHoldingUsd style={{ fontSize: "24px" }} />
                  </div>
                  <div className="spec-text">
                    <span className="spec-title">Loan Available</span>{" "}
                    {car?.loan_available ? "Yes" : "No"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="related-cars-list mt-4">
          {/* <div className="container">
            <h5 style={{ fontWeight: "600" }}>
              Related Cars ({" "}
              {relatedCars && relatedCars.length > 0 ? relatedCars.length : 0})
            </h5>
           
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default DetailsScreen;
