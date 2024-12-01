const express = require("express");
const { Signup } = require("../../controllers/users/signup");
const { Login } = require("../../controllers/users/signin");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User router called");
});

router.post("/register", Signup);
router.post("/login", Login);

module.exports = router;
