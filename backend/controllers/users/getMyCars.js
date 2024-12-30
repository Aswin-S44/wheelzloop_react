const Cars = require("../../models/cars/schema");

module.exports.getMyCars = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "createdAt" } = req.query;
    const cars = await Cars.find({ userId: req.user._id })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const totalCars = await Cars.countDocuments({ userId: req.user._id });
    res.send({ cars, total: totalCars });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
