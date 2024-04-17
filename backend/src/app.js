import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import logger from "./middlewares/logger/index.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.get("/healthcheck", (req, res) => {
  res.status(200).json({ status: "success", timestamp: Date.now() });
});

app.listen(process.env.PORT || 8080, function () {
  const { port } = this.address();
  console.log(`Server listening on port: ${port}`);
});
