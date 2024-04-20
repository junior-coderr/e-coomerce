import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

export const sign = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};
export const verify = (token) => {
  return jwt.verify(token, secret);
};

export const decode = (token) => {
  return jwt.decode(token);
};
