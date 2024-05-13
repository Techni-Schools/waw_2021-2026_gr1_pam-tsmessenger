import express from "express";
import { retrieveMe, updateMe } from "./controllers.js";

const me = express.Router();

me.get("/", retrieveMe);
me.patch("/", updateMe);

export default me;
