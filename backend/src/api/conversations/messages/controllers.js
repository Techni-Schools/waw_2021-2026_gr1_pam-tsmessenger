import Message from "../../../models/Message/index.js";

export const listMessages = async (req, res, next) => {
  const { query } = req;
  const { limit = 50, skip = 0, populate } = query;

  const { locals } = res;
  const { conversation } = locals;

  let dbQuery = Message.find({ conversation: conversation._id })
    .sort({ createdAt: "desc" })
    .limit(Number(limit))
    .skip(Number(skip));

  if (populate) {
    dbQuery = dbQuery.populate(populate);
  }

  const messages = (await dbQuery.exec()).reverse();

  return res.status(200).json({ data: messages });
};

export const createMessage = async (req, res, next) => {
  const { user, body } = req;
  const { locals } = res;
  const { conversation } = locals;

  const message = await Message.create({
    ...body,
    conversation: conversation._id,
    user: user._id,
  });
  return res.status(201).json({ data: message });
};
