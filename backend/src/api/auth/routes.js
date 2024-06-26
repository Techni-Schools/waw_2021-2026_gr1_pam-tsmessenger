import express from "express";
import { login, register } from "./controllers.js";

const auth = express.Router();

auth.post("/login", login);
auth.post("/register", register);

export default auth;
