const express = require("express");
const { getAllCars } = require("../../controllers/customers/getAllCars");
const { getCarById } = require("../../controllers/customers/getCarById");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Customer router called");
});

router.get("/cars/all", getAllCars);
router.get("/car/:id", getCarById);

module.exports = router;
