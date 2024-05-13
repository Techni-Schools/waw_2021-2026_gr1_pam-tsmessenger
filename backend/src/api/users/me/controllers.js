export const retrieveMe = async (req, res, next) => {
  const { user } = req;

  return res.status(200).json({ data: user });
};

export const updateMe = async (req, res, next) => {
  const { user, body } = req;
  const { photo } = body;

  user.photo = photo || user.photo;
  await user.save();

  return res.status(200).json({ data: user });
};
