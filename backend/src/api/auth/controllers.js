import User from "../../models/User/index.js";
import { AppError, makeSignToken } from "../../utils.js";

const signAuthToken = makeSignToken(process.env.AUTH_SECRET_KEY);

export const login = async (req, res, next) => {
  const { params, body, query } = req;
  const { email, password } = body;

  if (!email) throw new AppError("The 'email' field is required", 422);
  if (!password) throw new AppError("The 'password' field is required", 422);

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new AppError("Invalid credentials", 401);

  const isCorrectPassword = await user.comparePasswords(password);
  if (!isCorrectPassword) throw new AppError("Invalid credentials", 401);

  const token = signAuthToken({ sub: user._id });

  res.status(200).json({ data: { token } });
};

export const register = async (req, res, next) => {
  const { params, body, query } = req;
  const { provider } = params;
  const { username, password, email } = body;

  const user = await User.create({ username, password, email, provider });

  const token = signAuthToken({ sub: user._id });

  res.status(201).json({ data: { token } });
};
