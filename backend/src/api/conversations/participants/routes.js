import express from "express";
import {
  createParticipant,
  deleteParticipant,
  listParticipants,
} from "./controllers.js";
import requireMembership from "../../../middlewares/requireMembership/index.js";

const participants = express.Router();

participants.get("/", listParticipants);

participants.post("/", createParticipant);

participants.delete("/:id", requireMembership(["owner"]), deleteParticipant);

export default participants;
