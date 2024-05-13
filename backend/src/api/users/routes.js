import express from "express";
import { listUsers } from "./controllers.js";
import me from "./me/index.js";
import requireAuth from "../../middlewares/requireAuth/index.js";

const users = express.Router();

users.use("/me", requireAuth, me);

users.get("/", requireAuth, listUsers);

export default users;
