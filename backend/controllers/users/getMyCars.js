const Cars = require("../../models/cars/schema");

module.exports.getMyCars = async (req, res) => {
  try {
    let cars = await Cars.find({ userId: req.user._id });
    res.send(cars);
  } catch (error) {
    return error;
  }
};
