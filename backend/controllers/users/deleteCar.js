const Cars = require("../../models/cars/schema");

module.exports.deleteCar = async (req, res, next) => {
  try {
    const carId = req.params.id;
    let car = await Cars.findById(carId);

    if (!car) {
      res.status(404).send({ message: "Car not Found!" });
    }

    let resp = await Cars.findByIdAndDelete(carId);
    res.send(resp);
  } catch (error) {
    console.log("Error while deleting car : ", error);
  }
};
