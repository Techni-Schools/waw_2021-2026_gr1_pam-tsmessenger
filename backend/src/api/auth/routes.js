import express from "express";

const auth = express.Router();

auth.post("/login");

auth.post("/register");

export default auth;
