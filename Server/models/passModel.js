import mongoose from "mongoose";

const passSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  notetitle: { type: String, min: 3 },
  notedesc: { type: String, min: 3 },
  date: { type: Date, default: Date.now },
});

const Pass = mongoose.model("Pass", passSchema);
export default Pass;
