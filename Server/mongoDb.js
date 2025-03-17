import mongoose from "mongoose";

const conn = mongoose.connect("mongodb://localhost:27017/Todo");
if (conn) {
  console.log("connected to db");
}

export default conn;
