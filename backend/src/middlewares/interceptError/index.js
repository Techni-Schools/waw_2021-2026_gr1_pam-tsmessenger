import { AppError } from "../../utils.js";

const isConnectionError = (error) => {
  return error?.name === "MongooseError" && error.message.includes("timed out");
};

const isCastError = (error) => {
  return error?.name === "CastError";
};

const isDuplicateError = (error) => {
  return error?.name === "MongoServerError" && error.code === 11000;
};

const isValidationError = (error) => {
  return error?.name === "ValidationError";
};

const isRangeError = (error) => {
  return error?.name === "RangeError";
};

const isStrictPopulateError = (error) => {
  return error?.name === "StrictPopulateError";
};

export const interceptError = (err, req, res, next) => {
  if (!err?.name) return next(err);
  const { message } = err;

  if (isConnectionError(err)) return next(new AppError(message, 503));
  if (isCastError(err)) return next(new AppError(message, 422));
  if (isDuplicateError(err)) return next(new AppError(message, 409));
  if (isValidationError(err)) return next(new AppError(message, 422));
  if (isRangeError(err)) return next(new AppError(message, 413));
  if (isStrictPopulateError(err)) return next(new AppError(message, 400));

  next(err);
};

export default interceptError;
