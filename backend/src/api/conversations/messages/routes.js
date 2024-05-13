import express from "express";
import { createMessage, listMessages } from "./controllers.js";

const messages = express.Router();

messages.get("/", listMessages);
messages.post("/", createMessage);

export default messages;
