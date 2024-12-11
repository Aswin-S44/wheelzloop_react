const Cars = require("../../models/cars/schema");

module.exports.getAllCars = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "createdAt",
      brand,
      year,
      fuelType,
      transmission,
      priceMin,
      priceMax,
      isSold,
      name,
      kilometer,
    } = req.query;

    const filters = {};
    if (brand) filters.brand = { $regex: brand, $options: "i" };
    if (year) {
      const [startYear, endYear] = year.split(" - ").map(Number);
      filters.year = { $gte: startYear, $lte: endYear };
    }
    if (fuelType) filters.fuelType = fuelType;
    if (transmission) filters.transmission = transmission;
    if (priceMin || priceMax) filters.rate = {};
    if (priceMin) filters.rate.$gte = Number(priceMin);
    if (priceMax) filters.rate.$lte = Number(priceMax);
    if (isSold !== undefined) filters.isSold = isSold === "true";
    if (kilometer) filters.kilometer = { $lte: Number(kilometer) };
    if (name) filters.name = { $regex: name, $options: "i" };

    const cars = await Cars.find(filters)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalCars = await Cars.countDocuments(filters);

    res.send({ cars, total: totalCars });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
