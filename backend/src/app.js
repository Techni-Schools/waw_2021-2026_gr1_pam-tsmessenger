import "dotenv/config";
import "express-async-errors";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import logger from "./middlewares/logger/index.js";
import api from "./api/index.js";
import authenticate from "./middlewares/authenticate/index.js";
import errorHandler from "./middlewares/errorHandler/index.js";
import notFound from "./middlewares/notFound/index.js";
import interceptError from "./middlewares/interceptError/index.js";
import mongoose from "mongoose";

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB connected"))
  .catch((error) => console.error(error));

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(authenticate);

app.get("/healthcheck", (req, res) => {
  res.status(200).json({ status: "success", timestamp: Date.now() });
});

app.use("/api", api);

app.use(interceptError);
app.use("*", notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 8080, function () {
  const { port } = this.address();
  console.log(`Server listening on port: ${port}`);
});
