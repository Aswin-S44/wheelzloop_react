const { cloudinary } = require("../../config/cloudinary");
const Cars = require("../../models/cars/schema");

module.exports.addCar = async (req, res) => {
  try {
    let carData = req.body;

    carData.userId = req.user._id;
    let additionalImageUrls = [];

    carData.place = req.body.location;
    const additionalImages = req.body.images;
    for (let image of additionalImages) {
      const additionalImageResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "cloudinary_react",
        public_id: `${Date.now()}_additional`,
      });
      additionalImageUrls.push(additionalImageResponse.url);
    }

    carData.images = additionalImageUrls;

    let response = await Cars.create(carData);
    res.send(response);
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).send({ error: "Error uploading images" });
  }
};
