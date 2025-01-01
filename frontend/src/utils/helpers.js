import jwt from "jsonwebtoken";

export const createSecretToken = (userId) => {
  const secretKey = "something_secret";
  const token = jwt.sign({ id: userId }, secretKey, { expiresIn: "30d" });
  return token;
};
