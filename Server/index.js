import express from "express";
import cors from "cors";

import authRouter from "./routes/authRouter.js";
import passRouter from "./routes/passRouter.js";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/password", passRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
