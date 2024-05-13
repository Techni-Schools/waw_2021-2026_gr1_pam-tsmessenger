import User from "../../../models/User/index.js";
import pusher from "../../../pusher.js";
import { AppError } from "../../../utils.js";

export const listParticipants = async (req, res, next) => {
  const { query } = req;
  const { populate } = query;
  const { locals } = res;
  const { conversation } = locals;
  const { participants } = conversation;

  populate && (await conversation.populate(populate));

  return res.status(200).json({ data: participants });
};

export const createParticipant = async (req, res, next) => {
  const { body } = req;
  const { user: userId, role } = body;

  const { locals } = res;
  const { conversation } = locals;

  const user = await User.findById(userId);
  if (!user) throw new AppError(`User by id '${userId}' not found`, 404);

  if (conversation.includesUser(userId))
    throw new AppError(`User by id '${userId}' is already participant`, 409);

  const { participants } = conversation;
  const newParticipant = { user: userId, role };
  conversation.participants = [...participants, newParticipant];
  await conversation.save();

  return res.status(201).json({ data: conversation.participants.at(-1) });
};

export const deleteParticipant = async (req, res, next) => {
  const { params } = req;
  const { id } = params;

  const { locals } = res;
  const { conversation } = locals;
  const { participants } = conversation;

  const user = participants.find((participant) =>
    participant._id.equals(id)
  )?.user;

  if (!conversation.includesUser(user?._id))
    throw new AppError(`The participant by id: '${id}' not found`, 404);

  conversation.participants = participants.filter(
    (participant) => !participant._id.equals(id)
  );
  await conversation.save();

  return res.status(204).json({});
};
