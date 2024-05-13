import User from "../../models/User/index.js";

export const listUsers = async (req, res) => {
  const users = await User.find().select(["username", "photo"]);
  res.status(200).json({ data: users });
};
