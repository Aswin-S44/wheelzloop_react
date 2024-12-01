const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Customer router called");
});

module.exports = router
