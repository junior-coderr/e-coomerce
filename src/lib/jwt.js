import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;
import { jwtVerify, SignJWT } from "jose";

export const sign = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};
export const verify = async (token) => {
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(secret));

    return verified.payload;
  } catch (error) {
    throw new Error("your token has expired!");
  }
};

export const decode = (token) => {
  return jwt.decode(token);
};
