import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const dbPath = process.env.MongoDB_ROUTE;

const conn = mongoose.connect(dbPath);
if (conn) {
  console.log("connected to db");
}

export default conn;
