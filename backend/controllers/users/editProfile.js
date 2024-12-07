const { cloudinary } = require("../../config/cloudinary");
const User = require("../../models/users/schema");

module.exports.editProfile = async (req, res, next) => {
  try {
    const profileId = req.user.id;
    let profile = await User.findById(profileId);
    if (!profile) {
      res.status(404).send({ message: "Profile not Found" });
    }
    const updatedFields = req.body.updatedFields;

    if (updatedFields.profileImage) {
      const imageUrl = await cloudinary.uploader.upload(
        updatedFields.profileImage,
        {
          upload_preset: "cloudinary_react",
          public_id: `${Date.now()}_additional`,
        }
      );
      updatedFields.profileImage = imageUrl;
    }

    let resp = await User.updateOne(
      { _id: profileId },
      { $set: updatedFields }
    );
    res.send(resp);
  } catch (error) {
    console.log("Error while editing profile : ", error);
    res.send(error);
  }
};
