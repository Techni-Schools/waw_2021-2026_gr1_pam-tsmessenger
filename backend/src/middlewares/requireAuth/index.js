import { AppError } from "../../utils.js";

const requireAuth = (req, res, next) => {
  const { user } = req;
  if (!user) throw new AppError(`No access`, 401);
  next();
};

export default requireAuth;
