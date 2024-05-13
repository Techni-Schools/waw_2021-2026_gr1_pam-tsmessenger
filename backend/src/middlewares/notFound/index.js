import { AppError } from "../../utils.js";

const notFound = (req, res, next) => {
  const { originalUrl: url, method } = req;
  const error = new AppError(
    `Path '${url}' doesn’t exist for ${method} method`,
    404
  );
  next(error);
};

export default notFound;
