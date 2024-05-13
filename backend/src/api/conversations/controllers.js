import Conversation from "../../models/Conversation/index.js";
import { AppError } from "../../utils.js";

export const listConversations = async (req, res, next) => {
  const { user } = req;

  const conversations = await Conversation.find({
    "participants.user": user._id,
  });

  return res.status(200).json({ data: conversations });
};

export const retrieveConversation = async (req, res, next) => {
  const { locals } = res;
  const { conversation } = locals;

  return res.status(200).json({ data: conversation });
};

export const createConversation = async (req, res, next) => {
  const { body, user } = req;

  const conversation = await Conversation.create({
    ...body,
    participants: [{ role: "owner", user: user._id }],
  });

  return res.status(201).json({ data: conversation });
};

export const updateConversation = async (req, res, next) => {
  const { body } = req;
  const { locals } = res;
  const { conversation } = locals;

  conversation.set(body);
  await conversation.save();

  return res.status(200).json({ data: conversation });
};
