import express from "express";
import auth from "./auth/index.js";
import conversations from "./conversations/index.js";
import users from "./users/index.js";
import requireAuth from "../middlewares/requireAuth/index.js";

const api = express.Router();

api.use("/auth", auth);
api.use("/conversations", requireAuth, conversations);
api.use("/users", users);

export default api;
