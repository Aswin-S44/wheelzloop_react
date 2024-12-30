const Cars = require("../../models/cars/schema");

module.exports.getCarById = async (req, res) => {
  try {
    let car = await Cars.findById(req.params.id);
    if (!car) {
      res.status(404).send({ message: "Car not Found!" });
    }
    res.send(car);
  } catch (error) {
    console.log("Error while fetching car details : ", error);
    res.status(500).send({ error });
  }
};
