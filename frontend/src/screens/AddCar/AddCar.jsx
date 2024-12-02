import React, { useState } from "react";
import "./AddCar.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Swal from "sweetalert2";
import axios from "axios";
import { BACKEND_URL } from "../../constants/urls";

const vehicleBodyTypes = [
  "Sedan",
  "Hatchback",
  "SUV",
  "Crossover",
  "Coupe",
  "Convertible",
];

function AddCar() {
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
    setAdditionalImages([]);
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
  };

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
    if (images.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select atlease 1 image",
      });
    }
    if (images.length > 5) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Maximum 5 images allowed",
      });
    } else {
      Swal.fire({
        title: "Do you want to submit your car ",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true);
          let resp = await axios.post(
            `${BACKEND_URL}/api/v1/user/add-car`,
            carData,
            { withCredentials: true }
          );
          setLoading(false);

          Swal.fire("Saved!", "", "success");
          resetForm();
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

  return (
    <div>
      {loading && (
        <div className="overlay show">
          <div className="message">Please Wait...</div>
        </div>
      )}
      <section>
        <div className="container mt-4">
          <h2 className="font-medium">Add new Car</h2>
          <div>
            <form onSubmit={handleAddCar}>
              <div className="row">
                <div className="col-md-6 mt-2">
                  <p>Car Name</p>
                  <input
                    type="text"
                    placeholder="Alto, Swift etc"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <p>Model (Year)</p>
                  <input
                    type="text"
                    placeholder="2018 etc"
                    name="model"
                    onChange={(e) => setYear(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <p>Varient</p>
                  <input
                    type="text"
                    placeholder="Vxi, Vxi+ etc"
                    name="varient"
                    onChange={(e) => setVarient(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <p>Brand</p>
                  <input
                    type="text"
                    placeholder="Maruti suzuki"
                    name="brand"
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <p>Kilometer run</p>
                  <input
                    type="text"
                    placeholder="10000"
                    name="kilometer"
                    onChange={(e) => setKilometer(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <p>Fuel Type</p>
                  <select
                    onChange={(e) => setFuelType(e.target.value)}
                    required
                  >
                    <option value={"Petrol"}>Petrol</option>
                    <option value={"Diesel"}>Diesel</option>
                    <option value={"Hybrid"}>Hybrid</option>
                    <option value={"Gas"}>Gas</option>
                    <option value={"Electic"}>Electric</option>
                  </select>
                </div>
                <div className="col-md-6 mt-2">
                  <p>Body Type</p>
                  <select onChange={(e) => setBodyType(e.target.value)}>
                    {vehicleBodyTypes.map((type, index) => (
                      <option value={type} key={index}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mt-2">
                  <p>Transmission</p>
                  <select onChange={(e) => setTransmission(e.target.value)}>
                    <option value={"Manual"}>Manual</option>
                    <option value={"Automatic"}>Automatic</option>
                  </select>
                </div>
                <div className="col-md-6 mt-2">
                  <p>Rate</p>
                  <input
                    type="text"
                    placeholder="250000"
                    name="rate"
                    onChange={(e) => setRate(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <p>Total number of Seats</p>
                  <input
                    type="text"
                    placeholder="Eg: 4"
                    name="totalSeats"
                    onChange={(e) => setTotalSeats(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <p>Ownership</p>
                  <input
                    type="text"
                    placeholder="2"
                    name="ownership"
                    onChange={(e) => setOwnership(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <p>Price Negotiable</p>
                  <select
                    onChange={(e) => setIsPriceNegotiable(e.target.value)}
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="col-md-6 mt-2">
                  <p>Insuarance valid till</p>
                  <input
                    type="text"
                    placeholder="Ex: 2025"
                    name="insuranceValidity"
                    onChange={(e) => setInsuaranceValidity(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <p>RTO</p>
                  <input
                    type="text"
                    placeholder="Ex: Trivandrum"
                    name="rto"
                    onChange={(e) => setRto(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <p>Mileage (Km)</p>
                  <input
                    type="number"
                    placeholder="Ex: 20"
                    name="mileage"
                    onChange={(e) => setMileage(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <p>Under Warrenty</p>
                  <select
                    onChange={(e) => setUnderWarrenty(e.target.value)}
                    required
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="col-md-6 mt-2">
                  <p>Location</p>
                  <input
                    type="text"
                    placeholder="Ex: Ernakulam"
                    name="location"
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mt-4">
                  <p>Images (Total 5)</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleAdditionalImagesChange}
                  />
                  {images.map((img, index) => (
                    <div
                      key={index}
                      style={{ position: "relative", marginBottom: "10px" }}
                    >
                      <img
                        src={img}
                        alt={`Additional ${index}`}
                        style={{ width: "60px", height: "60px" }}
                      />
                      <button
                        type="button"
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "0",
                          color: "red",
                          border: "none",
                          cursor: "pointer",
                          padding: "5px",
                          background: "transparent",
                        }}
                        onClick={() => removeAdditionalImage(index)}
                      >
                        <DeleteOutlineIcon />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-end mt-2">
                <button type="submit" className="primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddCar;
