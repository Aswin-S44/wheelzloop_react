const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL_PROD
    : process.env.DATABASE_URL_DEV;

mongoose.set("strictQuery", true);

module.exports.connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(dbUrl);
    console.log("Database connected ");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
