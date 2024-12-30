import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

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
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import CarCard from "../../Components/CarCard/CarCard";
import { BACKEND_URL } from "../../constants/urls";
// import { useAuth } from "../../context/AuthContext";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PlaceIcon from "@mui/icons-material/Place";
import { formattedDateTime } from "../../utils/time";
import TransitionsModal from "../../components/Modal/Modal";
import PeopleIcon from "@mui/icons-material/People";
import CloseIcon from "@mui/icons-material/Close";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
} from "@mui/material";
import SpringModal from "../../components/SpringModal/SpringModal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
  const [selectedCar, setSelectedCar] = useState(null);
  const [openCarImage, setOpenCarImage] = useState(false);

  const [filters, setFilters] = useState({
    brand: null,
  });

  const handleOpenCarImage = (car) => {
    setSelectedCar(car);
    setOpenCarImage(true);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openModals, setOpenModals] = useState(false);
  const handleOpenModal = () => setOpenModals(true);
  const handleCloseModal = () => setOpenModals(false);

  const handleCloseCarImage = () => {
    setOpenCarImage(false);
    setSelectedCar(null);
  };

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
    // toast.success("successful");
    // formData.fullName = "";
    // formData.phoneNumber = "";
    // formData.allowMessages = "";
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

  const [formData, setFormData] = React.useState({
    fullName: "",
    phoneNumber: "",
    allowMessages: false,
  });

  const [isSubmitEnabled, setIsSubmitEnabled] = React.useState(false);

  const [formError, setFormError] = React.useState({
    fullName: "",
    phoneNumber: "",
  });

  const validateForms = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be 10 digits";
      isValid = false;
    }

    setFormError(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const [formLoading, setFormLoading] = useState(false);
  React.useEffect(() => {
    const isValid = validateForms();

    setIsSubmitEnabled(isValid);
  }, [formData]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    formData.carId = id;
    let res = await axios.post(`${BACKEND_URL}/api/v1/customer/enquiry/send`, {
      formData,
    });
    setFormLoading(false);
    Swal.fire({
      title: "Success!",
      text: "We have received your Enquiry, we will send the details within 5 minutes",
      icon: "success",
    });
    handleCloseModal();
  };

  return (
    <section>
      {formLoading && (
        <div className="overlay show">
          <div className="message">Please Wait...</div>
        </div>
      )}
      <div className="mt-0">
        <div className="details-screen p-5">
          <div className="image-section">
            <img
              src={car?.image || car?.images[0]}
              alt={car?.car_name}
              className="w-100 main-image"
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
                      onClick={() => handleOpenCarImage(car)}
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
                    onClick={() => handleOpenCarImage(car.images[index])}
                  />
                ))}
            </div>
          </div>
          <div className="details-section mt-0">
            <h6>
              Posted On -{" "}
              {car?.createdAt
                ? formattedDateTime(car.createdAt)
                : "Unavailable"}
            </h6>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 className="car-name">
                {car?.name} - {car?.brand}
              </h2>
              <FavoriteIcon
                onClick={() => addToFav()}
                style={{
                  top: "10px",
                  position: "relative",
                  color: isFavourite ? "red" : "black",
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
            <div>
              <h4>
                <CurrencyRupeeIcon /> {car?.rate ?? "Unavailable"}
              </h4>
            </div>
            <div className="imp-specs mt-2">
              {car?.fuelType || ""} | {car?.transmission ?? ""} |{" "}
              {car?.kilometer ?? ""} Km
            </div>
            <div className="mt-2">
              <PlaceIcon /> {car?.place ?? ""}
            </div>
            <p>{car?.about}</p>
            {!car?.sold ? (
              <button
                className="inquiry-button p-3 mt-2"
                // onClick={handleOpen}
                onClick={handleOpenModal}
              >
                Get Seller Detailsdsds
              </button>
            ) : (
              <button className="btn btn-secondary" disabled>
                Unavailable
              </button>
            )}
          </div>
          <SpringModal
            open={open}
            handleClose={handleClose}
            onSubmit={handleSubmit}
          />
          <ToastContainer />
        </div>

        <div className="container p-5 spec-details-box">
          <div className="spec-details p-4">
            <div className="row">
              <div className="col-md-3">
                {" "}
                <div className="spec-item">
                  <div className="icon">
                    <FaTools
                      style={{ fontSize: "24px" }}
                      className="spec-icon"
                    />
                  </div>
                  <div className="spec-text">
                    <span className="spec-title">Mileage</span>{" "}
                    {car?.mileage || "Unavailable"} Km
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                {" "}
                <div className="spec-item">
                  <div className="icon">
                    <PeopleIcon
                      style={{ fontSize: "24px" }}
                      className="spec-icon"
                    />
                  </div>
                  <div className="spec-text">
                    <span className="spec-title">Ownership</span>{" "}
                    {car?.ownership || "Unavailable"}{" "}
                    {car?.ownership == 1
                      ? "st"
                      : car?.ownership == 2
                      ? "nd"
                      : car?.ownership == 3
                      ? "rd"
                      : "th"}
                  </div>
                </div>
              </div>

              <div className="col-md-3">
                {" "}
                <div className="spec-item">
                  <div className="icon">
                    <AirlineSeatReclineNormalIcon
                      style={{ fontSize: "24px" }}
                      className="spec-icon"
                    />
                  </div>
                  <div className="spec-text">
                    <span className="spec-title">Seats</span>{" "}
                    {car?.totalSeats || "Unavailable"}{" "}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                {" "}
                <div className="spec-item">
                  <div className="icon">
                    <AirlineSeatReclineNormalIcon
                      style={{ fontSize: "24px" }}
                      className="spec-icon"
                    />
                  </div>
                  <div className="spec-text">
                    <span className="spec-title">Rate Negotiable</span>{" "}
                    {car?.priceNegotiable ? "Yes" : "No" || "Unavailable"}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedCar && (
        // <TransitionsModal
        //   car={selectedCar}
        //   open={openCarImage}
        //   handleClose={handleCloseCarImage}
        // />
        <Dialog open={openCarImage} onClose={handleCloseCarImage}>
          <div className="row">
            <DialogTitle>Image Preview</DialogTitle>
            {/* <DialogActions>
              <Button
                style={{ float: "right" }}
                onClick={handleCloseCarImage}
                color="primary"
              >
                <CloseIcon style={{ color: "#111" }} />
              </Button>
            </DialogActions> */}
          </div>

          <DialogContent>
            <img
              src={selectedCar}
              alt="Lightbox preview"
              style={{ width: "100%" }}
            />
          </DialogContent>
        </Dialog>
      )}
      <Modal
        open={openModals}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="spring-modal-title"
            variant="h5"
            component="h2"
            sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
          >
            Fill in your details
          </Typography>

          <form onSubmit={handleSubmitForm}>
            <div className="w-100">
              <Typography className="input-field-label">Full Name</Typography>
              <input
                style={{ outline: "none" }}
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-100 input-field ${
                  errors.fullName ? "input-field-error" : ""
                }`}
              />
            </div>
            {errors.fullName && (
              <Typography color="error" variant="body2">
                {errors.fullName}
              </Typography>
            )}
            <div className="mt-3"></div>

            <Typography className="input-field-label">Phone Number</Typography>
            <input
              style={{ outline: "none" }}
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-100 input-field ${
                errors.phoneNumber ? "input-field-error" : ""
              }`}
            />
            {errors.phoneNumber && (
              <Typography color="error" variant="body2">
                {errors.phoneNumber}
              </Typography>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.allowMessages}
                  onChange={handleChange}
                  name="allowMessages"
                  sx={{ color: "#333", marginRight: 1 }}
                />
              }
              label="Allow messages on WhatsApp"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "rgb(222, 49, 99)",
                mt: 3,
                width: "100%",
                padding: "10px 0",
                borderRadius: "5px",
                "&:hover": {
                  backgroundColor: "#1fa98f",
                },
              }}
              disabled={!isSubmitEnabled}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </section>
  );
};

export default DetailsScreen;
