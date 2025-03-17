import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, min: 3 },
  email: { type: String },
  username: { type: String, min: 3 },
  password: { type: String, min: 3 },
});

const User = mongoose.model("User", userSchema);

export default User;
