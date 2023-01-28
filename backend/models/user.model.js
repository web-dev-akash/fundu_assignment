const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
