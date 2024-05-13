import jwt from "jsonwebtoken";

export class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.isTrusted = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const makeSafeHandler = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export const makeSignToken = (SECRET_KEY) => (payload) => {
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};

export const makeVerifyToken = (SECRET_KEY) => (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    return undefined;
  }
};

export const getRandomColor = () => {
  const characters = "0123456789abcdef";
  const hex = Array(6)
    .fill(null)
    .map(() => Math.floor(Math.random() * 16))
    .map((index) => characters[index])
    .join("");

  return `#${hex}`;
};
