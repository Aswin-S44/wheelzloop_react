const express = require("express");
const { getAllCars } = require("../../controllers/customers/getAllCars");
const { getCarById } = require("../../controllers/customers/getCarById");
const { sendEnquiry } = require("../../controllers/customers/sendEnquiry");
const { sendFeedback } = require("../../controllers/customers/sendFeedback");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Customer router called");
});

router.get("/cars/all", getAllCars);
router.get("/car/:id", getCarById);
router.post("/enquiry/send", sendEnquiry);
router.post("/feedback/send", sendFeedback);

module.exports = router;
