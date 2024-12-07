const express = require("express");
const { Signup } = require("../../controllers/users/signup");
const { Login } = require("../../controllers/users/signin");
const { addCar } = require("../../controllers/users/addCar");
const { userVerification } = require("../../middlewares/AuthMiddleware");
const { getMyCars } = require("../../controllers/users/getMyCars");
const { editCar } = require("../../controllers/users/editCar");
const { deleteCar } = require("../../controllers/users/deleteCar");
const { editProfile } = require("../../controllers/users/editProfile");
const { getSavedCars } = require("../../controllers/users/getSavedCars");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User router called");
});

router.post("/register", Signup);
router.post("/login", Login);
router.post("/add-car", userVerification, addCar);
router.get("/cars/me", userVerification, getMyCars);
router.post("/edit-car/:id", editCar);
router.post("/delete-car/:id", deleteCar);
router.post("/profile/edit", userVerification, editProfile);
router.post("/cars/saved", getSavedCars);

module.exports = router;
