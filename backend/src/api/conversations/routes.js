import express from "express";
import {
  createConversation,
  listConversations,
  retrieveConversation,
  updateConversation,
} from "./controllers.js";
import messages from "./messages/index.js";
import participants from "./participants/index.js";
import withDocument from "../../middlewares/withDocument/index.js";
import Conversation from "../../models/Conversation/index.js";
import requireMembership from "../../middlewares/requireMembership/index.js";

const conversations = express.Router();

conversations.use(
  "/:id/messages",
  withDocument(Conversation, "conversation"),
  requireMembership(),
  messages
);

conversations.use(
  "/:id/participants",
  withDocument(Conversation, "conversation"),
  requireMembership(),
  participants
);

conversations.get("/", listConversations);

conversations.get(
  "/:id",
  withDocument(Conversation, "conversation"),
  requireMembership(),
  retrieveConversation
);

conversations.post("/", createConversation);

conversations.patch(
  "/:id",
  withDocument(Conversation, "conversation"),
  requireMembership(["owner"]),
  updateConversation
);

export default conversations;
