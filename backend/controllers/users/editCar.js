const { cloudinary } = require("../../config/cloudinary");
const Cars = require("../../models/cars/schema");

module.exports.editCar = async (req, res, next) => {
  try {
    let carId = req.params.id;

    let car = await Cars.findById(carId);
    if (!car) {
      res.status(200).send({ message: "Car not Found!" });
    }

    let updatedData = req.body;
    let additionalImageUrls = [];

    if (updatedData.images) {
      const additionalImages = updatedData.images;
      for (let image of additionalImages) {
        const additionalImageResponse = await cloudinary.uploader.upload(
          image,
          {
            upload_preset: "cloudinary_react",
            public_id: `${Date.now()}_additional`,
          }
        );
        additionalImageUrls.push(additionalImageResponse.url);
      }

      updatedData.images = additionalImageUrls;
    }

    let resp = await Cars.updateOne({ _id: carId }, { $set: updatedData });

    res.send(resp);
  } catch (error) {
    console.log("Error while editing car : ", error);
  }
};
