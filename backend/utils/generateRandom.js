const { default: mongoose } = require("mongoose");

module.exports.generateCarData = () => {
  const brands = ["Kia", "Toyota", "Honda", "Hyundai", "Ford", "BMW", "Audi"];
  const places = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Pune"];
  const bodyTypes = ["SUV", "Sedan", "Hatchback", "Coupe"];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
  const transmissions = ["Automatic", "Manual"];
  const years = [2018, 2019, 2020, 2021, 2022, 2023];
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR299msgwVnNV8_-C1mt0oz2aTF41-S9CIazw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1UJVOTQgcXfOW5p1EHWgWJluPi3bj-1ewzh2joU4839M6zHUivwfDAkoKzO9CA39FmsY&usqp=CAU",
  ];

  const generateRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const generateRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const cars = Array.from({ length: 100 }, (_, index) => ({
    name: `${generateRandom(brands)} Model ${generateRandomNumber(1, 100)}`,
    year: generateRandom(years),
    varient: `Variant ${generateRandomNumber(1, 10)}`,
    kilometer: generateRandomNumber(5000, 100000),
    fuelType: generateRandom(fuelTypes),
    transmission: generateRandom(transmissions),
    rate: generateRandomNumber(500000, 3000000),
    brand: generateRandom(brands),
    place: generateRandom(places),
    bodyType: generateRandom(bodyTypes),
    totalSeats: generateRandom([4, 5, 7]),
    ownership: `${generateRandomNumber(1, 3)}`,
    priceNegotiable: Math.random() < 0.5,
    insuranceValidity: `${generateRandomNumber(2024, 2027)}`,
    rto: generateRandom(places),
    mileage: generateRandomNumber(10, 25),
    underWarrenty: Math.random() < 0.5,
    images,
    userId: "67532f3fa3d68fa1812548d9",
    isSold: Math.random() < 0.3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  }));

  return cars;
};
