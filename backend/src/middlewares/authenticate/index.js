import User from "../../models/User/index.js";
import { makeVerifyToken } from "../../utils.js";

const verifyAuthToken = makeVerifyToken(process.env.AUTH_SECRET_KEY);

const authenticate = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) return next();

  const [scheme, token] = authorization.split(" ");
  if (scheme !== "Bearer") return next();
  if (!token) return next();

  const decodedPayload = verifyAuthToken(token);
  if (!decodedPayload) return next();

  const { sub: id } = decodedPayload;

  req.user = await User.findById(id).select("+email");
  next();
};

export default authenticate;
