const mongoose = require("mongoose");
const { SALT_ROUND } = require("../../constants/constants");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    hasShop: { type: String, required: true },
    password: { type: String, required: true },
    hasVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    totalCars: { type: Number, default: 0 },
    soldCars: { type: Number, default: 0 },
    isDeactivated: { type: Boolean, default: false },
    isDeleated: { type: Boolean, default: false },
    isSubscribed: { type: Boolean, default: false },
    profileImage: {
      type: String,
      default:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAnAMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAQQFAwIH/8QALBABAAIBAgUCBQQDAAAAAAAAAAECAwQREiExQVETMgUiYXGBQmKhsSNSkf/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A+4gAAAAAAjcEjxbLjr7rxH5eJ1OGP1wDsOUajFPS8OkWi3SdwSAAAAAAAAAAAAS82tFYmZnaIZ2p1Nsk8NeVP7BYza2td4pHFP8ACnk1GXJ1tMR4hyFZAAE1tNZ3rMxP0QAtYtbevLJHFHnuvYs1Msb0n8Md6re1J4qztMIraFfS6iMsbTyvHWPKwKAAAAAAAr6zL6eGdus8oBV1uo47cFJ+WP5lVBWQHrHScl4rXrMgVra87VrMz9HeNFmmOkR95XsOKuKu1Y5958uiLjJyafLj52ry8xzcm3soa3TxWPUxxy7wGKYCo9UtNLRas7TDV0+aM2OJ7948Mh30eX080c+VuUitUREpRQAAABma+/Fm4f8AWGmx808WW9v3SJXMBUFv4fWJy2nxCos6G8VzbT+qNgaYCNDxmrxYrRPeHty1V4phtM942gGQArIADX09/UxVt325uqp8OtvitHiVtFgAKAAMW/un7tpjZq8OW8fukSvACoJidp3hADR02ri8cOSYraO/laid45MemO+T20tP4dY02o25VmPyi60cmWmOPmtEM3Uai2aY7VjpCL6fNHOccz9Y5uM7xO0xtP1U0AEAAX/hntyfeF1U+HV2xWnzZbRYACgADM19OHNv2tG7TV9Zi9TDO3ujnAMsHqlJveKV6yrKceO2S3DSN5X8OkpTnb5rfXpDrgxVw04a9e8+XVFRtCQFHjJipkj5qxL2AzdRpJxxxU3tXx3hVbjO1un4P8lPb3jwJVQHfR4vUzR4rzlRoaanp4aV77c3VEJRQAAAAAGbrcHBfjrHy2n/AJLr8Px7ROSes8oXLVi0TExvE9kY6RjrFa9IEx6AFAAAAHm9YtWYnpPV6JBjWxWjLOOI3tvtDU0+GMOOIjr3TGKsZJvEfNPLd0EgAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjubgB2OwAR3SAIRvO34ADed0TM77ACZmSszOyAHsAAAH/9k=",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, SALT_ROUND);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
