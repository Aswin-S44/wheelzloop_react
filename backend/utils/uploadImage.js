const { cloudinary } = require("../config/cloudinary");

module.exports.uploadImage = async (req, res) => {
  try {
    const additionalImages = req.body.images;

    let additionalImageUrls = [];
    for (let image of additionalImages) {
      const additionalImageResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "cloudinary_react",
        public_id: `${Date.now()}_additional`,
      });
      additionalImageUrls.push(additionalImageResponse.url);
    }
    res.send(additionalImageUrls);
  } catch (error) {
    console.log("Error while uploading image : ", error);
  }
};
