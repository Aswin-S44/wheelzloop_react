import React, { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";
import axios from "axios";
import { BACKEND_URL } from "../../constants/urls";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const vehicleBodyTypes = [
  "Sedan",
  "Hatchback",
  "SUV",
  "Crossover",
  "Coupe",
  "Convertible",
];

function EditCar({ car }) {
  const [step, setStep] = useState(1);
  const [images, setAdditionalImages] = useState([]);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [varient, setVarient] = useState("");
  const [kilometer, setKilometer] = useState(null);
  const [fuelType, setFuelType] = useState("Petrol");
  const [transmission, setTransmission] = useState("Manual");
  const [rate, setRate] = useState(0);
  const [brand, setBrand] = useState("");
  const [location, setLocation] = useState("");
  const [bodyType, setBodyType] = useState("Sedan");
  const [totalSeats, setTotalSeats] = useState(0);
  const [ownership, setOwnership] = useState(0);
  const [priceNegotiable, setIsPriceNegotiable] = useState(false);
  const [insuranceValidity, setInsuaranceValidity] = useState("");
  const [rto, setRto] = useState("");
  const [mileage, setMileage] = useState(0);
  const [underWarrenty, setUnderWarrenty] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setYear("");
    setVarient("");
    setKilometer(null);
    setFuelType("Petrol");
    setTransmission("Manual");
    setRate(0);
    setBrand("");
    setLocation("");
    setBodyType("Sedan");
    setTotalSeats(0);
    setOwnership(0);
    setIsPriceNegotiable(false);
    setInsuaranceValidity("");
    setRto("");
    setMileage(0);
    setUnderWarrenty(false);
    setLoading(false);
    setStep(1);
    setAdditionalImages([]);
  };

  useEffect(() => {
    if (car) {
      setName(car.name ?? "");
      setYear(car.year ?? "");
      setVarient(car.varient ?? "");
      setKilometer(car.kilometer ?? 0);
      setFuelType(car.fuelType ?? "");
      setTransmission(car.transmission ?? "");
      setRate(car.rate ?? 0);
      setBrand(car.brand ?? "");
      setLocation(car.place ?? "");
      setBodyType(car.bodyType ?? "");
      setTotalSeats(car.totalSeats ?? 0);
      setOwnership(car.ownership ?? 0);
      setIsPriceNegotiable(car.priceNegotiable ?? false);
      setInsuaranceValidity(car.insuranceValidity ?? "");
      setRto(car.rto ?? "");
      setMileage(car.mileage ?? 0);
      setUnderWarrenty(car.underWarrenty ?? false);
      setAdditionalImages(car.images ?? []);
    }
  }, [car]);

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    let additional_image_data = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        additional_image_data.push(reader.result);
        setAdditionalImages((prevImages) => [...prevImages, reader.result]);
      };
    });
  };

  const removeAdditionalImage = (index) => {
    setAdditionalImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  const handleAddCar = async (e) => {
    e.preventDefault();
    let carData = {
      images,
      name,
      year,
      varient,
      kilometer,
      fuelType,
      transmission,
      rate,
      brand,
      location,
      bodyType,
      totalSeats,
      ownership,
      priceNegotiable,
      insuranceValidity,
      rto,
      mileage,
      underWarrenty,
    };
    if (images.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select at least 1 image",
      });
    } else if (images.length > 5) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Maximum 5 images allowed",
      });
    } else {
      Swal.fire({
        title: "Do you want to submit your car?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          await axios.post(`${BACKEND_URL}/api/v1/user/add-car`, carData, {
            withCredentials: true,
          });
          setLoading(false);
          Swal.fire("Saved!", "", "success");
          resetForm();
          window.location.href = "/profile";
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!name || !year || !varient || !transmission || !ownership) {
        Swal.fire("Please fill in all the fields in Step 1.");
        return;
      }
    }
    console.log(brand, kilometer, fuelType, priceNegotiable, insuranceValidity);
    if (step === 2) {
      if (!brand || !kilometer || !fuelType || !insuranceValidity) {
        Swal.fire("Please fill in all the fields in Step 2.");
        return;
      }
    }
    if (step === 3) {
      if (!rate || !location || !underWarrenty || images.length === 0) {
        Swal.fire("Please fill in all the fields in Step 3.");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div>
      {loading && (
        <div className="overlay show">
          <div className="message">Please Wait...</div>
        </div>
      )}
      <div className="mt-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="multi-steps">
                <div className={`multi-step`}>
                  <CheckCircleIcon
                    className={`${step > 1 ? "completed" : "incomplete"}`}
                  />
                  Step 1
                </div>
                <div className={`multi-step`}>
                  <CheckCircleIcon
                    className={`${step >= 2 ? "completed" : "incomplete"}`}
                  />
                  Step 2
                </div>
                <div className={`multi-step`}>
                  <CheckCircleIcon
                    className={`${step >= 3 ? "completed" : "incomplete"}`}
                  />
                  Step 3
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <a href="/profile">
                <ArrowBackIosIcon /> Back to Profile
              </a>
              <h2 className="font-medium mt-2">Edit Car</h2>
              <form onSubmit={handleAddCar}>
                {step === 1 && (
                  <div className="add-car-form">
                    <p>Car Name</p>
                    <input
                      type="text"
                      placeholder="Alto, Swift etc"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <p>Model (Year)</p>
                    <input
                      type="text"
                      placeholder="2018 etc"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      required
                    />
                    <p>Variant</p>
                    <input
                      type="text"
                      placeholder="Vxi, Vxi+ etc"
                      value={varient}
                      onChange={(e) => setVarient(e.target.value)}
                    />

                    <p>Transmission Type</p>
                    <select onChange={(e) => setTransmission(e.target.value)}>
                      <option value={"Manual"}>Manual</option>
                      <option value={"Automatic"}>Automatic</option>
                    </select>

                    <p>Body Type</p>
                    <select onChange={(e) => setBodyType(e.target.value)}>
                      {vehicleBodyTypes.map((type, index) => (
                        <option value={type} key={index}>
                          {type}
                        </option>
                      ))}
                    </select>

                    <p>Ownership</p>
                    <input
                      type="text"
                      placeholder="2"
                      name="ownership"
                      onChange={(e) => setOwnership(e.target.value)}
                    />

                    <div className="float-right">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="next-btn w-200 mt-3 ms-auto"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="add-car-form">
                    <p>Brand</p>
                    <input
                      type="text"
                      placeholder="Maruti Suzuki"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      required
                    />
                    <p>Kilometer Run</p>
                    <input
                      type="text"
                      placeholder="10000"
                      value={kilometer}
                      onChange={(e) => setKilometer(e.target.value)}
                    />
                    <p>Fuel Type</p>
                    <select
                      value={fuelType}
                      onChange={(e) => setFuelType(e.target.value)}
                      defaultValue={"Petrol"}
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Gas">Gas</option>
                      <option value="Electric">Electric</option>
                    </select>

                    <p>Price Negotiable</p>
                    <select
                      onChange={(e) => setIsPriceNegotiable(e.target.value)}
                      defaultValue={true}
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>

                    <p>Insuarance Valid Till</p>
                    <input
                      type="text"
                      placeholder="Ex: 2025"
                      name="insuranceValidity"
                      onChange={(e) => setInsuaranceValidity(e.target.value)}
                      required
                    />

                    <p>Mileage</p>
                    <input
                      type="number"
                      placeholder="Ex: 20"
                      name="mileage"
                      onChange={(e) => setMileage(e.target.value)}
                    />

                    <div className="float-right">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="prev-btn"
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="next-btn w-200 mt-3 ms-auto"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="add-car-form">
                    <p>Location</p>
                    <input
                      type="text"
                      placeholder="Ex: Ernakulam"
                      name="location"
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                    <p>RTO</p>
                    <input
                      type="text"
                      placeholder="Ex: Trivandrum"
                      name="rto"
                      onChange={(e) => setRto(e.target.value)}
                    />

                    <p>Rate</p>
                    <input
                      type="text"
                      placeholder="250000"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                    />
                    <p>Under Warrenty</p>
                    <select
                      onChange={(e) => setUnderWarrenty(e.target.value)}
                      required
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                    <p>Total Seats</p>
                    <input
                      type="number"
                      placeholder="5"
                      value={totalSeats}
                      onChange={(e) => setTotalSeats(e.target.value)}
                    />
                    <p>Upload Images</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAdditionalImagesChange}
                      multiple
                    />
                    <div className="image-preview">
                      {images.map((image, index) => (
                        <div key={index} className="image-container">
                          <img
                            src={image}
                            alt={`image-${index}`}
                            className="additional-image"
                          />
                          <DeleteOutlineIcon
                            className="delete-icon"
                            onClick={() => removeAdditionalImage(index)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="float-right">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="prev-btn"
                      >
                        Previous
                      </button>
                      <button
                        type="submit"
                        className="next-btn w-200 mt-3 ms-auto"
                        disabled={loading}
                      >
                        {loading ? <>Please Wait....</> : <>Submit</>}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCar;
