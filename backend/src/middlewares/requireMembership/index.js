import { AppError } from "../../utils.js";

const requireMembership = (allowedRoles) => async (req, res, next) => {
  const { user } = req;
  const { _id: userId } = user;
  const { locals } = res;
  const { conversation } = locals;

  if (!conversation) throw new AppError("Conversation undefined", 500);
  if (!conversation.includesUser(userId, allowedRoles))
    throw new AppError("Forbidden", 403);

  next();
};

export default requireMembership;
